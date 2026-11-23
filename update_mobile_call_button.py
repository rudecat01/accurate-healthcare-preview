import re
import subprocess
import os
import cv2

# 1. Update index.html and site.html
for fpath in ['index.html', 'site.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<span>Call Doctor</span>', '<span>Call</span>')
    content = content.replace('<span>CALL DOCTOR</span>', '<span>CALL</span>')
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {fpath}')

# 2. Capture mobile screenshot to verify bottom bar
chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'
shot_mobile = os.path.join(art_dir, 'mobile-sticky-bar-call.png')

subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_mobile}', 'http://localhost:5173/'
], check=True)

# Crop bottom sticky bar: y from 760 to 844
img_mobile = cv2.imread(shot_mobile)
bottom_bar = img_mobile[750:844, :]
cv2.imwrite(os.path.join(art_dir, 'crop-mobile-sticky-bar.png'), bottom_bar)
print('Captured and cropped mobile sticky bar successfully.')
