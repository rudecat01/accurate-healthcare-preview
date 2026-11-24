import subprocess
import os

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

dist_html = 'file:///' + os.path.abspath('dist/index.html').replace('\\', '/')

# 1. Desktop 1440x950
shot_desktop = os.path.join(art_dir, 'hero_desktop_crescent.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,950',
    f'--screenshot={shot_desktop}', dist_html
], check=True)

# 2. Mobile 390x844
shot_mobile = os.path.join(art_dir, 'hero_mobile_crescent.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_mobile}', dist_html
], check=True)

print('Screenshots captured with Chrome headless.')
