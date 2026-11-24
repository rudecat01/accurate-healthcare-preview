import cv2
from PIL import Image

# Optimize hero-crescent-final.png for web (e.g. 2160x1536) to ensure instant loading while keeping ultra-crisp retina resolution
im = Image.open('public/images/hero-crescent-final.png')
opt_w = 2160
opt_h = int(im.size[1] * (opt_w / float(im.size[0]))) # 1536
im_opt = im.resize((opt_w, opt_h), Image.LANCZOS)
im_opt.save('public/images/hero-crescent-bleed.png', optimize=True)
print('Saved hero-crescent-bleed.png:', im_opt.size)
