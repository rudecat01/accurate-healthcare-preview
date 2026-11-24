import cv2
import numpy as np

# Load images
f39 = cv2.imread('public/images/frame39_raw.png', cv2.IMREAD_UNCHANGED)
h, w = f39.shape[:2] # 2048, 2880
alpha_f39 = f39[:, :, 3]

dm = cv2.imread('public/images/dr-manish.jpg')
dv = cv2.imread('public/images/dr-vandana.jpg')

# 1. Isolate the Red Ring + Dashed Orbit from f39
is_red = (f39[:, :, 2] > 90) & (f39[:, :, 1] < 60) & (f39[:, :, 0] < 60) & (alpha_f39 > 80)
y_coords, x_coords = np.ogrid[:h, :w]
is_red[(x_coords > 2300) & (y_coords >= 850) & (y_coords <= 1550)] = False

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(is_red.astype(np.uint8), connectivity=8)
ring_label = None
max_area = 0
for lbl in range(1, num_labels):
    area = stats[lbl, cv2.CC_STAT_AREA]
    left = stats[lbl, cv2.CC_STAT_LEFT]
    if area > max_area and left < 1600:
        max_area = area
        ring_label = lbl

red_ring_mask = (labels == ring_label)
dashed_mask = (alpha_f39 > 0) & (alpha_f39 < 240) & ~red_ring_mask & (x_coords < 1600)

# 2. Recolor the Red Ring to Brand Blue (#367fb5 / #1B365D)
# Target Brand Blue: #367fb5 -> B=181, G=127, R=54 in BGR
# In the original red ring, red channel is f39[:, :, 2]
red_channel = f39[:, :, 2].astype(float)
# Normalize luminance by 125.0
norm_lum = red_channel / 125.0

blue_ring = f39.copy()
# Recolor red ring:
blue_ring[red_ring_mask, 0] = np.clip(181.0 * norm_lum[red_ring_mask], 0, 255).astype(np.uint8) # B
blue_ring[red_ring_mask, 1] = np.clip(127.0 * norm_lum[red_ring_mask], 0, 255).astype(np.uint8) # G
blue_ring[red_ring_mask, 2] = np.clip(54.0 * norm_lum[red_ring_mask], 0, 255).astype(np.uint8)  # R

# Recolor dashed line to #367fb5 (B=181, G=127, R=54)
blue_ring[dashed_mask, 0] = 181
blue_ring[dashed_mask, 1] = 127
blue_ring[dashed_mask, 2] = 54

graphic_overlay_mask = red_ring_mask | dashed_mask
graphic_overlay_blue = np.zeros((h, w, 4), dtype=np.uint8)
graphic_overlay_blue[graphic_overlay_mask] = blue_ring[graphic_overlay_mask]

# 3. Doctors Framing
target_h = 2048
w_m_target = 760
w_v_target = 760

crop_h_m = 1700
crop_w_m = int(crop_h_m * (w_m_target / float(target_h)))
y1_m = max(0, int(910 - 0.28 * crop_h_m))
y2_m = y1_m + crop_h_m
x1_m = max(0, int(752 - 0.50 * crop_w_m))
x2_m = x1_m + crop_w_m
dm_crop = cv2.resize(dm[y1_m:y2_m, x1_m:x2_m], (w_m_target, target_h), interpolation=cv2.INTER_LANCZOS4)

crop_h_v = 1700
crop_w_v = int(crop_h_v * (w_v_target / float(target_h)))
y1_v = max(0, int(969 - 0.28 * crop_h_v))
y2_v = y1_v + crop_h_v
x1_v = max(0, int(892 - 0.50 * crop_w_v))
x2_v = x1_v + crop_w_v
if x2_v > dv.shape[1]:
    diff = x2_v - dv.shape[1]
    x1_v -= diff
    x2_v = dv.shape[1]
dv_crop = cv2.resize(dv[y1_v:y2_v, x1_v:x2_v], (w_v_target, target_h), interpolation=cv2.INTER_LANCZOS4)

doctors_canvas = np.zeros((target_h, w_m_target + w_v_target, 3), dtype=np.uint8)
doctors_canvas[:, :w_m_target] = dm_crop
doctors_canvas[:, w_m_target:] = dv_crop

seam_x = w_m_target
blend_w = 40
for c in range(seam_x - blend_w, seam_x + blend_w):
    t = (c - (seam_x - blend_w)) / float(2 * blend_w)
    smooth_t = t * t * (3 - 2 * t)
    shadow = 0.94 + 0.06 * abs(c - seam_x) / float(blend_w)
    doctors_canvas[:, c] = np.clip(
        ((1.0 - smooth_t) * dm_crop[:, min(w_m_target - 1, c)] + smooth_t * dv_crop[:, max(0, c - seam_x)]) * shadow,
        0, 255
    ).astype(np.uint8)

# 4. Composite into Full Canvas
full_canvas = np.zeros((h, w, 4), dtype=np.uint8)
x_start = w - doctors_canvas.shape[1]
full_canvas[:, x_start:w, :3] = doctors_canvas
full_canvas[:, x_start:w, 3] = 255

full_canvas[:, :, 3] = np.minimum(full_canvas[:, :, 3], alpha_f39)

overlay_alpha = graphic_overlay_blue[:, :, 3].astype(float) / 255.0
for c in range(3):
    full_canvas[:, :, c] = np.clip(
        full_canvas[:, :, c].astype(float) * (1.0 - overlay_alpha) +
        graphic_overlay_blue[:, :, c].astype(float) * overlay_alpha,
        0, 255
    ).astype(np.uint8)

full_canvas[:, :, 3] = np.maximum(full_canvas[:, :, 3], graphic_overlay_blue[:, :, 3])

# 5. Crop tightly to active pixels
coords = np.argwhere(full_canvas[:, :, 3] > 0)
y_min, x_min = coords.min(axis=0)
y_max, x_max = coords.max(axis=0)

crop_x1 = max(0, x_min - 20)
crop_x2 = min(w, x_max + 1)
crop_y1 = max(0, y_min - 10)
crop_y2 = min(h, y_max + 1)

cropped = full_canvas[crop_y1:crop_y2, crop_x1:crop_x2]

# Save high-res PNG and web-optimized PNG
cv2.imwrite('public/images/hero-crescent-final.png', full_canvas)
cv2.imwrite('public/images/hero-crescent-cropped.png', cropped)

web_w = 1400
web_h = int(cropped.shape[0] * (web_w / float(cropped.shape[1])))
web_optimized = cv2.resize(cropped, (web_w, web_h), interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('public/images/hero-crescent-web.png', web_optimized)

# Save preview on light background for inspection
bg = np.full((web_h, web_w, 3), (248, 248, 250), dtype=np.uint8)
alpha_norm = web_optimized[:, :, 3].astype(float) / 255.0
for c in range(3):
    bg[:, :, c] = np.clip(web_optimized[:, :, c].astype(float) * alpha_norm + bg[:, :, c].astype(float) * (1.0 - alpha_norm), 0, 255).astype(np.uint8)

cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\hero_crescent_blue_preview.jpg', bg)
print('Blue crescent generated successfully.')
