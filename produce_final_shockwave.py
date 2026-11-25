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
# Exclude German guy's red shirt strictly (on the right side x > 2100, y in 800..1680)
is_red[(x_coords > 2100) & (y_coords >= 800) & (y_coords <= 1680)] = False

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(is_red.astype(np.uint8), connectivity=8)
ring_label = None
max_area = 0
for lbl in range(1, num_labels):
    area = stats[lbl, cv2.CC_STAT_AREA]
    left = stats[lbl, cv2.CC_STAT_LEFT]
    if area > max_area and left < 1600:
        max_area = area
        ring_label = lbl

true_ring_mask = (labels == ring_label)
dashed_mask = (alpha_f39 > 0) & (alpha_f39 < 240) & ~true_ring_mask & (x_coords < 1700)

red_channel = f39[:, :, 2].astype(float)
norm_lum = red_channel / 125.0

blue_overlay = np.zeros((h, w, 4), dtype=np.uint8)
blue_overlay[true_ring_mask, 0] = np.clip(181.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8)
blue_overlay[true_ring_mask, 1] = np.clip(127.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8)
blue_overlay[true_ring_mask, 2] = np.clip(54.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8)
blue_overlay[true_ring_mask, 3] = f39[true_ring_mask, 3]

blue_overlay[dashed_mask, 0] = 181
blue_overlay[dashed_mask, 1] = 127
blue_overlay[dashed_mask, 2] = 54
blue_overlay[dashed_mask, 3] = f39[dashed_mask, 3]

# 2. Upscale and sharpen photo to fill 100% of the circle (x: 1280..2880, y: 0..2048)
# Circle inner boundary starts around x = 1380 at mid, 1450..1650 top/bottom.
# To cover x = 1280..2880 completely, tw must be >= 1600!
# Let's use tw = 1620 (scale = 1620 / 531 = 3.0508), th = int(1024 * 3.0508) = 3124
tw = 1620
th = int(1024 * (tw / 531.0)) # 3124

# Stepwise upscale + detail enhancement for crispness
img_bgr = cv2.imread(uploaded_path)

# Gentle denoise of JPEG compression artifacts first
img_clean = cv2.fastNlMeansDenoisingColored(img_bgr, None, 3, 3, 7, 21)

# 2x upscale first with Lanczos
up_mid = cv2.resize(img_clean, (531 * 2, 1024 * 2), interpolation=cv2.INTER_LANCZOS4)
# Detail enhance on mid-res
gaussian_mid = cv2.GaussianBlur(up_mid, (0, 0), 1.2)
up_mid_sharp = cv2.addWeighted(up_mid, 1.45, gaussian_mid, -0.45, 0)

# Final resize to (tw, th)
scaled_bgr = cv2.resize(up_mid_sharp, (tw, th), interpolation=cv2.INTER_LANCZOS4)

# Subtle local contrast (CLAHE on L channel) + crisp unsharp mask
lab = cv2.cvtColor(scaled_bgr, cv2.COLOR_BGR2LAB)
l, a, b = cv2.split(lab)
clahe = cv2.createCLAHE(clipLimit=1.3, tileGridSize=(8, 8))
l = clahe.apply(l)
scaled_bgr = cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2BGR)

gaussian_final = cv2.GaussianBlur(scaled_bgr, (0, 0), 1.0)
scaled_bgr = cv2.addWeighted(scaled_bgr, 1.35, gaussian_final, -0.35, 0)

# Align right edge flush to w (2880) so there is ZERO grey bar on the right!
x_offset = w - tw # 2880 - 1620 = 1260 (covers 1260..2880, which is 100% of circle!)
# Vertical alignment:
# Probe touches arm around y = 0.56 * th = 1750.
# We want probe around y = 1020 in canvas -> y_offset = 1020 - 1750 = -730
y_offset = -730

canvas = np.zeros((h, w, 3), dtype=np.uint8)
# Copy scaled_bgr into canvas
y1_src = max(0, -y_offset)
y2_src = y1_src + h
canvas[:, x_offset:w] = scaled_bgr[y1_src:y2_src, :]

# Composite with f39 alpha & blue overlay
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

cv2.imwrite('public/images/hero-crescent-final.png', full_comp)

pil_canvas = Image.fromarray(cv2.cvtColor(full_comp, cv2.COLOR_BGRA2RGBA))
bleed_im = pil_canvas.resize((2160, 1536), Image.LANCZOS)
bleed_im.save('public/images/hero-crescent-bleed.png', optimize=True)

coords = np.argwhere(full_comp[:, :, 3] > 0)
y_min, x_min = coords.min(axis=0)
y_max, x_max = coords.max(axis=0)
cropped = pil_canvas.crop((max(0, x_min - 20), max(0, y_min - 10), min(w, x_max + 1), min(h, y_max + 1)))
cropped_web = cropped.resize((1400, int(cropped.height * (1400.0 / cropped.width))), Image.LANCZOS)
cropped_web.save('public/images/hero-crescent-web.png', optimize=True)

print('Generated full-circle sharp hero images.')
