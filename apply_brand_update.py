import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Favicons
html = html.replace('href="/images/logo-ah-badge.png"', 'href="/images/logo-ah-icon.png"')

# 2. OpenGraph
html = html.replace('"https://accuratehealthcare.co.in/images/logo-ah.png"', '"https://accuratehealthcare.co.in/images/logo-ah-full.png"')

# 3. Colors #478ab9 and #356f98
html = html.replace('#478ab9', '#367fb5')
html = html.replace('#356f98', '#286491')
html = html.replace('#6ba6cd', '#5398cb')
html = html.replace('#eef6fb', '#ebf4fa')

# 4. Brand logo in navbar:
# Search for navbar brand block
nav_match = re.search(r'<!-- Brand Logo & Name -->\s*<a href="#" class="flex items-center[^>]*>.*?</a>', html, re.DOTALL)
if nav_match:
    old_nav = nav_match.group(0)
    new_nav = '''<!-- Brand Logo & Name -->
      <a href="#" class="flex items-center group shrink-0" aria-label="Accurate Healthcare Home">
        <img src="/images/logo-ah-full.png" alt="Accurate Healthcare - Physiotherapy &amp; Neuro Rehab Centre" class="h-11 sm:h-12 md:h-13 w-auto max-w-[170px] sm:max-w-[210px] rounded-xl object-contain shadow-md border border-slate-200/80 group-hover:scale-105 transition duration-200 shrink-0" />
      </a>'''
    html = html.replace(old_nav, new_nav, 1)
    print('Navbar brand logo replaced successfully.')
else:
    print('Navbar brand block not found!')

# 5. Mobile Drawer Logo
drawer_match = re.search(r'<div class="flex items-center gap-2\.5">\s*<img src="/images/logo-ah-badge\.png"[^>]*>.*?</div>', html, re.DOTALL)
if drawer_match:
    old_drawer = drawer_match.group(0)
    new_drawer = '''<a href="#" class="flex items-center">
            <img src="/images/logo-ah-full.png" alt="Accurate Healthcare" class="h-10 w-auto rounded-lg shadow-sm border border-slate-100">
          </a>'''
    html = html.replace(old_drawer, new_drawer, 1)
    print('Drawer logo replaced successfully.')
else:
    print('Drawer logo block not found!')

# 6. Footer logo
footer_match = re.search(r'<div class="flex items-center gap-3">\s*<img src="/images/logo-ah-badge\.png"[^>]*>.*?</div>', html, re.DOTALL)
if footer_match:
    old_footer = footer_match.group(0)
    new_footer = '''<div class="flex items-center gap-3">
            <img src="/images/logo-ah-full.png" alt="Accurate Healthcare" class="h-12 w-auto rounded-xl shadow-md border border-white/10">
          </div>'''
    html = html.replace(old_footer, new_footer, 1)
    print('Footer logo replaced successfully.')
else:
    print('Footer logo block not found!')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated index.html successfully.')

# Sync to site.html
with open('site.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Synced to site.html.')
