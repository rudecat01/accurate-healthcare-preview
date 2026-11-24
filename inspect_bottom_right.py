import cv2
import numpy as np

f39 = cv2.imread('public/images/frame39_raw.png', cv2.IMREAD_UNCHANGED)
h, w = f39.shape[:2]
alpha_f39 = f39[:, :, 3]

# Inspect the bottom right of f39:
# Look at y in [1400..1800], x in [2200..2800]
crop_br = f39[1400:1900, 2100:2800]
print('f39 crop shape:', crop_br.shape)

# Let's save a view of f39 in that region
cv2.imwrite(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\f39_bottom_right.jpg', crop_br[:, :, :3])
print('Saved f39_bottom_right.jpg')
