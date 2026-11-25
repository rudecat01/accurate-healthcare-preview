import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

marker = '<!-- ================= CONTINUOUS CLINICAL RUNNING TICKER'
idx = html.find(marker)
assert idx != -1, 'Marker not found'

above = html[:idx]
below = html[idx:]

def add_lazy(match):
    tag = match.group(0)
    if 'loading=' not in tag:
        tag = tag.replace('<img ', '<img loading="lazy" decoding="async" ', 1)
    return tag

below_updated = re.sub(r'<img\s+[^>]*>', add_lazy, below)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(above + below_updated)

count_added = len(re.findall(r'loading="lazy"', below_updated))
print(f'Added lazy loading to {count_added} below-the-fold images.')
