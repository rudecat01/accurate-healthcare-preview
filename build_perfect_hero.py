import cv2
import numpy as np
from PIL import Image, ImageFilter

uploaded_path = r'C:/Users/dhruv/.gemini/antigravity/brain/d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2/.user_uploaded/media_1795535561983_b3001ff8.jpg'
f39 = cv2.imread('public/images/frame39_raw.png', cv2.IMREAD_UNCHANGED)
h, w = f39.shape[:2] # 2048, 2880
alpha_f39 = f39[:, :, 3]
y_coords, x_coords = np.ogrid[:h, :w]

# 1. Isolate the TRUE crescent arc
# In f39, the crescent arc is a circular ring with:
# center cx ~ 1978, cy ~ 888
# outer radius ~ 1010 px, inner radius ~ 900 px
# Any red pixel that belongs to the crescent ring has:
# dist_from_center between ~ 895 and ~ 1015 px!
cx, cy = 1978, 888
dist_from_center = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2)

# Red pixels
is_red = (f39[:, :, 2] > 80) & (f39[:, :, 1] < 65) & (f39[:, :, 0] < 65) & (alpha_f39 > 80)

# True ring pixels: must be in the ring band (dist between 890 and 1025) OR on the crescent curve
# AND must NOT be inside the inner photo region (dist < 890)
true_ring_mask = is_red & (dist_from_center >= 890) & (dist_from_center <= 1030)

# Also include the dashed orbit line (dist between 1030 and 1100, on the left side x < 1800)
dashed_mask = (alpha_f39 > 0) & (alpha_f39 < 240) & (x_coords < 1700) & (dist_from_center >= 1010)

# Recolor to Brand Blue (#367fb5)
red_channel = f39[:, :, 2].astype(float)
norm_lum = red_channel / 125.0

blue_overlay = np.zeros((h, w, 4), dtype=np.uint8)

# Ring:
blue_overlay[true_ring_mask, 0] = np.clip(181.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8) # B
blue_overlay[true_ring_mask, 1] = np.clip(127.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8) # G
blue_overlay[true_ring_mask, 2] = np.clip(54.0 * norm_lum[true_ring_mask], 0, 255).astype(np.uint8)  # R
blue_overlay[true_ring_mask, 3] = f39[true_ring_mask, 3]

# Dashed line:
blue_overlay[dashed_mask, 0] = 181
blue_overlay[dashed_mask, 1] = 127
blue_overlay[dashed_mask, 2] = 54
blue_overlay[dashed_mask, 3] = f39[dashed_mask, 3]

# 2. Prepare Photo Canvas
# Load uploaded image and scale
scale = 3.3
target_w = int(690 * scale) # 2277
target_h = int(387 * scale) # 1277

pil_up = Image.open(uploaded_path).resize((target_w, target_h), Image.LANCZOS)
pil_up = pil_up.filter(ImageFilter.UnsharpMask(radius=2, percent=125, threshold=2))
scaled_bgr = cv2.cvtColor(np.array(pil_up), cv2.COLOR_RGB2BGR)

# Position:
x_offset = 790
y_offset = 420

canvas_photo = np.zeros((h, w, 3), dtype=np.uint8)

# Sample neutral curtain color from top right of scaled photo
curtain_color = scaled_bgr[5:40, int(target_w * 0.70):].mean(axis=(0, 1)).astype(np.uint8)
canvas_photo[:, :] = curtain_color

# Paste scaled photo with smooth vertical blending
x_end_canvas = min(w, x_offset + target_w)
crop_w_paste = x_end_canvas - x_offset

canvas_photo[y_offset:y_offset+target_h, x_offset:x_end_canvas] = scaled_bgr[:, :crop_w_paste]

# Smooth top blend across 80 pixels
blend_top_h = 80
for r in range(blend_top_h):
    t = r / float(blend_top_h)
    smooth_t = t * t * (3 - 2 * t)
    # Blend canvas curtain with photo top
    photo_row = scaled_bgr[r, :crop_w_paste].astype(float)
    blended_row = curtain_color.astype(float) * (1.0 - smooth_t) + photo_row * smooth_t
    canvas_photo[y_offset + r, x_offset:x_end_canvas] = blended_row.astype(np.uint8)

# Extend bottom cardigan / lab coat downwards
bottom_row = scaled_bgr[-1, :crop_w_paste]
for y_down in range(y_offset + target_h, h):
    canvas_photo[y_down, x_offset:x_end_canvas] = bottom_row

# 3. Apply circular alpha mask
full_canvas = np.zeros((h, w, 4), dtype=np.uint8)
full_canvas[:, :, :3] = canvas_photo
full_canvas[:, :, 3] = alpha_f39

# 4. Composite blue ring & dashed orbit on top
overlay_alpha = blue_overlay[:, :, 3].astype(float) / 255.0
for c in range(3):
    full_canvas[:, :, c] = np.clip(
        full_canvas[:, :, c].astype(float) * (1.0 - overlay_alpha) +
        blue_overlay[:, :, c].astype(float) * overlay_alpha,
        0, 255
    ).astype(np.uint8)

full_canvas[:, :, 3] = np.maximum(full_canvas[:, :, 3], blue_overlay[:, :, 3])

# Save master files
cv2.imwrite('public/images/hero-crescent-final.png', full_canvas)

pil_canvas = Image.fromarray(cv2.cvtColor(full_canvas, cv2.COLOR_BGRA2RGBA))

# hero-crescent-bleed.png (2160x1536)
bleed_im = pil_canvas.resize((2160, 1536), Image.LANCZOS)
bleed_im.save('public/images/hero-crescent-bleed.png', optimize=True)

# hero-crescent-web.png (tight crop for mobile)
coords = np.argwhere(full_canvas[:, :, 3] > 0)
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
comp_alpha = full_canvas[:, :, 3].astype(float) / 255.0
for c in range(3):
    bg[:, :, c] = np.clip(full_canvas[:, :, c].astype(float) * comp_alpha + bg[:, :, c].astype(float) * (1.0 - comp_alpha), 0, 255).astype(np.uint8)

cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\hero_perfect_preview.jpg', cv2.resize(bg, (960, 683)))
print('Saved hero_perfect_preview.jpg and master images successfully.')
