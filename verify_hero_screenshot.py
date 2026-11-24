import subprocess
import os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

dist_html = 'file:///' + os.path.abspath('dist/index.html').replace('\\', '/')

# 1. 1920x1080 (Exact User Monitor Resolution from Screenshot)
shot_1920 = os.path.join(art_dir, 'hero_bleed_1920.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1920,1080',
    f'--screenshot={shot_1920}', dist_html
], check=True)

# 2. 1440x900 (Laptop)
shot_1440 = os.path.join(art_dir, 'hero_bleed_1440.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,900',
    f'--screenshot={shot_1440}', dist_html
], check=True)

# 3. 390x844 (Mobile)
shot_mobile = os.path.join(art_dir, 'hero_bleed_mobile.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_mobile}', dist_html
], check=True)

print('Screenshots captured successfully.')
