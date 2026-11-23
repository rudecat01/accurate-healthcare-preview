import subprocess
import os
import cv2

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

# 1. Desktop screenshot
shot_desk = os.path.join(art_dir, 'headline-desk.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,900',
    f'--screenshot={shot_desk}', 'http://localhost:5173/'
], check=True)

# 2. Mobile screenshot
shot_mob = os.path.join(art_dir, 'headline-mob.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_mob}', 'http://localhost:5173/'
], check=True)

img_desk = cv2.imread(shot_desk)
crop_desk = img_desk[100:650, :750]
cv2.imwrite(os.path.join(art_dir, 'crop-every-move-desk.png'), crop_desk)

img_mob = cv2.imread(shot_mob)
crop_mob = img_mob[100:650, :]
cv2.imwrite(os.path.join(art_dir, 'crop-every-move-mob.png'), crop_mob)

print('Captured and cropped Every Move Matters headline on desktop and mobile.')
