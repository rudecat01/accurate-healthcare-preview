import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

uploaded_path = r'C:/Users/dhruv/.gemini/antigravity/brain/d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2/.user_uploaded/media_1795536346789_43b17ef1.jpg'
f39 = cv2.imread('public/images/frame39_raw.png', cv2.IMREAD_UNCHANGED)
h, w = f39.shape[:2] # 2048, 2880
alpha_f39 = f39[:, :, 3]
y_coords, x_coords = np.ogrid[:h, :w]

# 1. Clean Blue Ring & Dashed Orbit
cx, cy = 1978, 888
dist_from_center = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2)

is_red = (f39[:, :, 2] > 80) & (f39[:, :, 1] < 65) & (f39[:, :, 0] < 65) & (alpha_f39 > 80)
true_ring_mask = is_red & (dist_from_center >= 890) & (dist_from_center <= 1030)
dashed_mask = (alpha_f39 > 0) & (alpha_f39 < 240) & (x_coords < 1700) & (dist_from_center >= 1010)

red_channel = f39[:, :, 2].astype(float)
norm_lum = red_channel / 125.0

blue_overlay = np.zeros((h, w, 4), dtype=np.uint8)

blue_overlay[true_ring_mask, 0] = np.clip(181.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8) # B
blue_overlay[true_ring_mask, 1] = np.clip(127.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8) # G
blue_overlay[true_ring_mask, 2] = np.clip(54.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8)  # R
blue_overlay[true_ring_mask, 3] = f39[true_ring_mask, 3]

blue_overlay[dashed_mask, 0] = 181
blue_overlay[dashed_mask, 1] = 127
blue_overlay[dashed_mask, 2] = 54
blue_overlay[dashed_mask, 3] = f39[dashed_mask, 3]

# 2. Process uploaded shockwave therapy image for crystal clarity
pil_up = Image.open(uploaded_path)

enhancer = ImageEnhance.Sharpness(pil_up)
pil_enhanced = enhancer.enhance(1.45)
enhancer_con = ImageEnhance.Contrast(pil_enhanced)
pil_enhanced = enhancer_con.enhance(1.06)

scale = 3.0
tw = int(531 * scale) # 1593
th = int(1024 * scale) # 3072

scaled = pil_enhanced.resize((tw, th), Image.LANCZOS)
scaled = scaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=140, threshold=2))
scaled_bgr = cv2.cvtColor(np.array(scaled), cv2.COLOR_RGB2BGR)

# Position:
# We want the probe and hands centered right at the crescent opening
# The probe is at x ~ 0.58 * tw in scaled_bgr (~920 px)
# We want it at x ~ 1800 in canvas -> x_offset = 1800 - 920 = 880 px!
x_offset = 860
# Vertical: probe at y ~ 0.56 * th (~1720 px)
# Place at y ~ 980 in canvas -> y_offset = 980 - 1720 = -740 px!
y_offset = -740

canvas = np.zeros((h, w, 3), dtype=np.uint8)
wall_color = scaled_bgr[:30, :30].mean(axis=(0, 1)).astype(np.uint8)
canvas[:, :] = wall_color

x1_src = max(0, -x_offset)
y1_src = max(0, -y_offset)
x1_dst = max(0, x_offset)
y1_dst = max(0, y_offset)

x2_src = min(tw, w - x_offset)
y2_src = min(th, h - y_offset)
x2_dst = min(w, x_offset + tw)
y2_dst = min(h, y_offset + th)

canvas[y1_dst:y2_dst, x1_dst:x2_dst] = scaled_bgr[y1_src:y2_src, x1_src:x2_src]

# 3. Composite with f39 alpha & blue overlay
full_comp = np.zeros((h, w, 4), dtype=np.uint8)
full_comp[:, :, :3] = canvas
full_comp[:, :, 3] = alpha_f39

overlay_alpha = blue_overlay[:, :, 3].astype(float) / 255.0
for c in range(3):
    full_comp[:, :, c] = np.clip(
        full_comp[:, :, c].astype(float) * (1.0 - overlay_alpha) +
        blue_overlay[:, :, c].astype(float) * overlay_alpha,
        0, 255
    ).astype(np.uint8)
full_comp[:, :, 3] = np.maximum(full_comp[:, :, 3], blue_overlay[:, :, 3])

# Save master PNG
cv2.imwrite('public/images/hero-crescent-final.png', full_comp)

# Web versions
pil_canvas = Image.fromarray(cv2.cvtColor(full_comp, cv2.COLOR_BGRA2RGBA))

# hero-crescent-bleed.png
bleed_im = pil_canvas.resize((2160, 1536), Image.LANCZOS)
bleed_im.save('public/images/hero-crescent-bleed.png', optimize=True)

# hero-crescent-web.png (tight crop for mobile)
coords = np.argwhere(full_comp[:, :, 3] > 0)
y_min, x_min = coords.min(axis=0)
y_max, x_max = coords.max(axis=0)
crop_x1 = max(0, x_min - 20)
crop_x2 = min(w, x_max + 1)
crop_y1 = max(0, y_min - 10)
crop_y2 = min(h, y_max + 1)
cropped = pil_canvas.crop((crop_x1, crop_y1, crop_x2, crop_y2))
cropped_web = cropped.resize((1400, int(cropped.height * (1400.0 / cropped.width))), Image.LANCZOS)
cropped_web.save('public/images/hero-crescent-web.png', optimize=True)

# Preview
bg = np.full((h, w, 3), (248, 248, 250), dtype=np.uint8)
comp_a = full_comp[:, :, 3].astype(float) / 255.0
for c in range(3):
    bg[:, :, c] = np.clip(full_comp[:, :, c].astype(float) * comp_a + bg[:, :, c].astype(float) * (1.0 - comp_a), 0, 255).astype(np.uint8)

cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\hero_shockwave_final.jpg', cv2.resize(bg, (960, 683)))
print('Saved hero_shockwave_final.jpg and master images.')
