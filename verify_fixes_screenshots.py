import subprocess
import os
import cv2
import time

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

# 1. Desktop Hero view (1440x900)
shot_desk = os.path.join(art_dir, 'hero-fixed-desk.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,900',
    f'--screenshot={shot_desk}', 'http://localhost:5173/'
], check=True)

img_desk = cv2.imread(shot_desk)
crop_hero = img_desk[80:680, 680:] # Right column hero card
cv2.imwrite(os.path.join(art_dir, 'crop-hero-doctors-fixed.png'), crop_hero)

# 2. Mobile Navbar view (390x844)
shot_mob = os.path.join(art_dir, 'mobile-fixed-nav.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_mob}', 'http://localhost:5173/'
], check=True)

img_mob = cv2.imread(shot_mob)
crop_mob_nav = img_mob[0:120, :] # Mobile navbar
cv2.imwrite(os.path.join(art_dir, 'crop-mobile-navbar-fixed.png'), crop_mob_nav)

crop_mob_hero = img_mob[350:750, :] # Mobile hero card
cv2.imwrite(os.path.join(art_dir, 'crop-mobile-hero-fixed.png'), crop_mob_hero)

print('Captured and cropped hero and mobile navbar successfully.')
