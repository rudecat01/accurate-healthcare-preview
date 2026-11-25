import os
import re
from PIL import Image

# 1. Audit <img> tags in index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'<img[^>]+>', html)
print(f'Total <img> tags in index.html: {len(imgs)}')
used_paths = set()
for im in imgs:
    m = re.search(r'src=["\']([^"\']+)["\']', im)
    if m:
        used_paths.add(m.group(1))
        print(f'  lazy={"loading=" in im} | {m.group(1)}')

# 2. Convert hero crescent PNGs to crisp WebP
for src_name, dst_name in [
    ('public/images/hero-crescent-bleed.png', 'public/images/hero-crescent-bleed.webp'),
    ('public/images/hero-crescent-web.png', 'public/images/hero-crescent-web.webp'),
]:
    if os.path.exists(src_name):
        im = Image.open(src_name)
        im.save(dst_name, 'WEBP', quality=88, method=6)
        old_kb = os.path.getsize(src_name) / 1024
        new_kb = os.path.getsize(dst_name) / 1024
        print(f'WebP: {src_name} ({old_kb:.1f} KB) -> {dst_name} ({new_kb:.1f} KB)')

# 3. Compress oversized JPGs used in index.html (> 180 KB)
jpg_candidates = [
    'public/images/clinic-rehab-1.jpg',
    'public/images/clinic-awards.jpg',
    'public/images/clinic-exterior.jpg',
    'public/images/clinic-hero.jpg',
    'public/images/treatment-neuro.jpg',
    'public/images/treatment-elderly.jpg',
    'public/images/treatment-spine.jpg',
    'public/images/treatment-joint.jpg',
    'public/images/treatment-shoulder.jpg',
    'public/images/treatment-gait.jpg',
    'public/images/dr-manish-portrait.jpg',
    'public/images/dr-vandana-portrait.jpg',
]
for path in jpg_candidates:
    if os.path.exists(path):
        old_kb = os.path.getsize(path) / 1024
        if old_kb > 160:
            im = Image.open(path).convert('RGB')
            im.thumbnail((1200, 1200), Image.LANCZOS)
            im.save(path, 'JPEG', quality=82, optimize=True, progressive=True)
            new_kb = os.path.getsize(path) / 1024
            print(f'Compressed JPG: {path} ({old_kb:.1f} KB -> {new_kb:.1f} KB)')

# 4. Generate Google Search compliant favicons (48x48 .ico + 96x96 .png)
icon_src = 'public/images/icon-512.png' if os.path.exists('public/images/icon-512.png') else 'public/images/logo-ah-icon.png'
im_icon = Image.open(icon_src).convert('RGBA')
im_icon.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
im_96 = im_icon.resize((96, 96), Image.LANCZOS)
im_96.save('public/images/favicon-96.png', optimize=True)
print('Generated public/favicon.ico (16,32,48) and public/images/favicon-96.png')
