import subprocess
import os
import cv2

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

# 1. 1440px desktop
shot_1440 = os.path.join(art_dir, 'navbar-1440.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,900',
    f'--screenshot={shot_1440}', 'http://localhost:5173/'
], check=True)

# 2. 1280px laptop
shot_1280 = os.path.join(art_dir, 'navbar-1280.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1280,900',
    f'--screenshot={shot_1280}', 'http://localhost:5173/'
], check=True)

# 3. 390px mobile
shot_390 = os.path.join(art_dir, 'navbar-390.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_390}', 'http://localhost:5173/'
], check=True)

# Crop navbars
img1440 = cv2.imread(shot_1440)
crop1440 = img1440[0:125, :]
cv2.imwrite(os.path.join(art_dir, 'crop-navbar-1440.png'), crop1440)

img1280 = cv2.imread(shot_1280)
crop1280 = img1280[0:125, :]
cv2.imwrite(os.path.join(art_dir, 'crop-navbar-1280.png'), crop1280)

img390 = cv2.imread(shot_390)
crop390 = img390[0:125, :]
cv2.imwrite(os.path.join(art_dir, 'crop-navbar-390.png'), crop390)

print('Captured and cropped all viewports successfully.')
