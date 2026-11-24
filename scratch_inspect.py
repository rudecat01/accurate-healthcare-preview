from PIL import Image
import numpy as np

f39 = Image.open('public/images/frame39_raw.png')
print('f39 size:', f39.size, 'mode:', f39.mode)

# Let's inspect where pixels are non-transparent in f39
arr = np.array(f39)
alpha = arr[:, :, 3]
print('Non-transparent pixels count:', np.count_nonzero(alpha > 0))
print('Total pixels:', alpha.size)
print('Non-transparent fraction:', np.count_nonzero(alpha > 0) / alpha.size)

# Bounding box of non-transparent pixels
coords = np.argwhere(alpha > 0)
y_min, x_min = coords.min(axis=0)
y_max, x_max = coords.max(axis=0)
print(f'Bounding box of non-transparent pixels: x: {x_min}..{x_max}, y: {y_min}..{y_max}')

# Let's see what is inside frame39_raw.png
# Save a thumbnail as RGB with white background
bg = Image.new('RGB', f39.size, (255, 255, 255))
bg.paste(f39, mask=f39.split()[3])
bg.resize((600, 426)).save(r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\f39_white_bg.jpg', quality=85)
print('Saved f39_white_bg.jpg')
