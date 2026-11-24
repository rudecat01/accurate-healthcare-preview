import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text)
print('Source index.html images:')
for img in imgs[:8]:
    print('  ', img)

try:
    with open('dist/index.html', 'r', encoding='utf-8') as f:
        dist_text = f.read()
    dist_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', dist_text)
    print('\nDist index.html images:')
    for img in dist_imgs[:8]:
        print('  ', img)
except Exception as e:
    print('Dist error:', e)
