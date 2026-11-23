import re
from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=== ALL IMAGE SLOTS IN index.html ===")
for i, img in enumerate(soup.find_all('img')):
    src = img.get('src', '')
    alt = img.get('alt', '')
    parent_section = img.find_parent('section')
    sec_id = parent_section.get('id', 'no-id') if parent_section else 'header/footer/modal'
    print(f"[{i+1:02d}] Section: {sec_id:15} | Src: {src:35} | Alt: {alt}")
