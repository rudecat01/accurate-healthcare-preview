import os

files = ['about.html', 'services.html', 'contact.html']
old_conf = "gold: { 400: '#e5c158', 500: '#d4af37', 600: '#c59b27', 700: '#aa7c11' }"
new_conf = "gold: { 300: '#94c7e7', 400: '#6ba6cd', 500: '#478ab9', 600: '#356f98', 700: '#265272' }, brand: { 500: '#478ab9', 600: '#356f98' }"

for fn in files:
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(old_conf, new_conf)
        content = content.replace('/images/logo-transparent.png', '/images/logo-ah-badge.png')
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {fn}")
