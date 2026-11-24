import cv2
import numpy as np

# Load hero-crescent-final.png
img = cv2.imread('public/images/hero-crescent-final.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

# Bounding box of non-transparent pixels
alpha = img[:, :, 3]
coords = np.argwhere(alpha > 0)
y_min, x_min = coords.min(axis=0)
y_max, x_max = coords.max(axis=0)
print(f'Active pixels: x: {x_min}..{x_max}, y: {y_min}..{y_max}')

# Crop tightly to the graphic with 15px padding on left and top/bottom
crop_x1 = max(0, x_min - 20)
crop_x2 = min(w, x_max + 1)
crop_y1 = max(0, y_min - 10)
crop_y2 = min(h, y_max + 1)

cropped = img[crop_y1:crop_y2, crop_x1:crop_x2]
print('Cropped shape:', cropped.shape)

# Save tight cropped version:
cv2.imwrite('public/images/hero-crescent-cropped.png', cropped)

# Also save an optimized web-ready version (e.g. 1400px width for fast loading)
web_w = 1400
web_h = int(cropped.shape[0] * (web_w / float(cropped.shape[1])))
web_optimized = cv2.resize(cropped, (web_w, web_h), interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('public/images/hero-crescent-web.png', web_optimized)

# Save preview on light background
bg = np.full((web_h, web_w, 3), (248, 248, 250), dtype=np.uint8)
alpha_norm = web_optimized[:, :, 3].astype(float) / 255.0
for c in range(3):
    bg[:, :, c] = np.clip(web_optimized[:, :, c].astype(float) * alpha_norm + bg[:, :, c].astype(float) * (1.0 - alpha_norm), 0, 255).astype(np.uint8)

cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\hero_crescent_web_preview.jpg', bg)
print('Saved hero-crescent-web.png and hero_crescent_web_preview.jpg')
