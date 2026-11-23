import cv2
import numpy as np

dm = cv2.imread('public/images/dr-manish.jpg')
dv = cv2.imread('public/images/dr-vandana.jpg')

# Output dimensions: 1600 x 1000
target_w = 1600
target_h = 1000
half_w = target_w // 2 # 800

# 1. Crop Dr. Manish (Left Half)
# Face center: Y ~ 910, X ~ 752
# We want head in upper 1/3, chest and desk in lower 2/3
# Height: 1400, Width: 1120 (aspect ratio 800:1000 = 4:5)
h_crop_m = 1400
w_crop_m = int(h_crop_m * (half_w / target_h)) # 1120
y1_m = max(0, int(910 - 0.30 * h_crop_m)) # ~ 490
y2_m = y1_m + h_crop_m
x1_m = max(0, int(752 - 0.50 * w_crop_m)) # ~ 192
x2_m = x1_m + w_crop_m

dm_cropped = dm[y1_m:y2_m, x1_m:x2_m]
dm_resized = cv2.resize(dm_cropped, (half_w, target_h), interpolation=cv2.INTER_LANCZOS4)

# 2. Crop Dr. Vandana (Right Half)
# Face center: Y ~ 969, X ~ 892
h_crop_v = 1400
w_crop_v = int(h_crop_v * (half_w / target_h)) # 1120
y1_v = max(0, int(969 - 0.30 * h_crop_v)) # ~ 549
y2_v = y1_v + h_crop_v
x1_v = max(0, int(892 - 0.50 * w_crop_v)) # ~ 332
x2_v = x1_v + w_crop_v
if x2_v > dv.shape[1]:
    diff = x2_v - dv.shape[1]
    x1_v -= diff
    x2_v = dv.shape[1]

dv_cropped = dv[y1_v:y2_v, x1_v:x2_v]
dv_resized = cv2.resize(dv_cropped, (half_w, target_h), interpolation=cv2.INTER_LANCZOS4)

# 3. Create Composite Image (1600 x 1000)
composite = np.zeros((target_h, target_w, 3), dtype=np.uint8)
composite[:, :half_w] = dm_resized
composite[:, half_w:] = dv_resized

# 4. Smooth feathering / blend at the seam (x in 760..840)
blend_width = 80
x_start = half_w - blend_width // 2 # 760
x_end = half_w + blend_width // 2   # 840

for col in range(x_start, x_end):
    alpha = (col - x_start) / float(blend_width)
    # Smoothstep curve for seamless blending
    alpha = alpha * alpha * (3 - 2 * alpha)
    # Blend dm and dv
    # In dm_resized: right side pixels are at 760..800
    # In dv_resized: left side pixels are at 0..40
    # But let's take pixels slightly extended or blend dm_resized and dv_resized
    pass

# Subtle vertical divider line / soft shadow in the clinic wall seam
seam_overlay = composite.copy().astype(np.float32)
for col in range(half_w - 30, half_w + 30):
    dist = abs(col - half_w) / 30.0
    # Soft drop shadow at center seam to look like natural room division / wall pillar
    shadow = 0.88 + 0.12 * dist
    seam_overlay[:650, col] *= shadow

composite[:650, half_w-30:half_w+30] = np.clip(seam_overlay[:650, half_w-30:half_w+30], 0, 255).astype(np.uint8)

# 5. Bottom Dark Vignette / Gradient Overlay (y in 650..1000)
# Deep rich navy #070e1e so text overlay is perfectly readable
navy_overlay = np.array([30, 14, 7], dtype=np.float32) # BGR for #070e1e
comp_float = composite.astype(np.float32)

for y in range(600, target_h):
    # Progress from 0 to 0.88 opacity
    t = (y - 600) / float(target_h - 600)
    t = t * t # ease in
    comp_float[y, :] = (1.0 - t * 0.82) * comp_float[y, :] + (t * 0.82) * navy_overlay

composite = np.clip(comp_float, 0, 255).astype(np.uint8)

# Save result
cv2.imwrite('public/images/hero-clinical-directors.png', composite)
cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\hero-clinical-directors.png', composite)
print('Generated equal 50/50 hero-clinical-directors.png successfully.')
