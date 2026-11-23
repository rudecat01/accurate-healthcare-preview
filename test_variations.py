import subprocess
import os
import cv2

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'

svg_path_d = 'M296.007 98.7137C341.382 91.1447 365.062 81.0558 372.975 65.8636C374.566 62.7271 376.351 60.9034 379.796 58.7267C400.473 45.6053 398.503 29.2041 374.857 17.2597C349.939 4.71344 277.454 -2.05456 198.952 0.851507C187.709 1.25545 169.535 1.68851 158.627 1.75054C22.7257 2.62542 -25.3567 34.902 13.4035 63.2519C37.0008 80.5624 73.1732 90.1748 134.358 95.6136C192.615 100.742 271.251 92.6625 328.705 77.2299C343.72 73.1956 345.263 75.4252 340.785 77.7612C325.001 86.0511 283.58 95.0666 240.753 99.0249C202.547 102.573 184.913 103.854 156.677 101.581C145.644 100.707 138.881 104.762 155.83 106.756C173.796 108.775 246.705 106.937 296.007 98.7137ZM28.6736 29.7958C47.7347 17.7101 89.8689 11.1006 157.338 9.72737C382.813 5.15751 360.889 54.5915 360.889 54.5915C360.681 54.6356 286.797 90.7719 147.532 89.2627C79.0153 88.5719 -28.4031 66.0004 28.6736 29.7958ZM299.057 11.1362C276.152 7.27906 303.296 9.21209 337.345 13.8296C400.81 22.4248 380.51 43.1088 374.33 46.288C356.72 28.0659 331.106 16.51 299.057 11.1362Z'

with open('index.html', 'r', encoding='utf-8') as f:
    orig_html = f.read()

import re

# Variation 1: Exactly "Every Move" circled together
h1_var1 = f'''<h1 class="text-3xl sm:text-5xl lg:text-[68px] font-black italic tracking-tight text-slate-900 uppercase leading-[1.08] reveal-blur-up stagger-2">
            <span class="relative inline-block text-[#367fb5] px-2 sm:px-3">
              Every Move
              <svg aria-hidden="true" fill="none" class="absolute -inset-x-4 -inset-y-2.5 sm:-inset-x-6 sm:-inset-y-3.5 w-[110%] h-[138%] text-[#367fb5] pointer-events-none" viewBox="0 0 395 108" preserveAspectRatio="none">
                <path clip-rule="evenodd" d="{svg_path_d}" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </span> <br/>
            Matters.
          </h1>'''

# Variation 2: "Move" alone circled (Every <circle>Move</circle> Matters)
h1_var2 = f'''<h1 class="text-4xl sm:text-6xl lg:text-[72px] font-black italic tracking-tight text-slate-900 uppercase leading-[1.0] reveal-blur-up stagger-2">
            Every <br/>
            <span class="relative inline-block text-[#367fb5] px-2 sm:px-3">
              Move
              <svg aria-hidden="true" fill="none" class="absolute -inset-x-5 -inset-y-2.5 sm:-inset-x-7 sm:-inset-y-3.5 w-[130%] h-[142%] text-[#367fb5] pointer-events-none" viewBox="0 0 395 108" preserveAspectRatio="none">
                <path clip-rule="evenodd" d="{svg_path_d}" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </span> <br/>
            Matters.
          </h1>'''

# Test Variation 1 on mobile
target_h1 = re.search(r'<h1 class="text-.*?</h1>', orig_html, re.DOTALL).group(0)
html_v1 = orig_html.replace(target_h1, h1_var1)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_v1)

shot_v1_mob = os.path.join(art_dir, 'v1-mob.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_v1_mob}', 'http://localhost:5173/'
], check=True)

img_v1_mob = cv2.imread(shot_v1_mob)[100:450, :]
cv2.imwrite(os.path.join(art_dir, 'crop-v1-everymove-mob.png'), img_v1_mob)

shot_v1_desk = os.path.join(art_dir, 'v1-desk.png')
subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=1440,900',
    f'--screenshot={shot_v1_desk}', 'http://localhost:5173/'
], check=True)
img_v1_desk = cv2.imread(shot_v1_desk)[110:550, :720]
cv2.imwrite(os.path.join(art_dir, 'crop-v1-everymove-desk.png'), img_v1_desk)

print('Variation 1 (Every Move circled) captured on mobile and desktop.')
