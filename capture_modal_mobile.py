import subprocess
import os
import cv2

# Create a temporary test page with modal open for visual QA
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make modal open
html_modal_open = html.replace(
    'id="bookingModal" class="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm opacity-0 pointer-events-none',
    'id="bookingModal" class="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm opacity-100 pointer-events-auto'
).replace(
    'id="modalContent" class="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border-2 border-navy-900 transform scale-95',
    'id="modalContent" class="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border-2 border-navy-900 transform scale-100'
)

temp_path = 'modal_preview_test.html'
with open(temp_path, 'w', encoding='utf-8') as f:
    f.write(html_modal_open)

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'
shot_modal = os.path.join(art_dir, 'mobile-modal-open.png')

subprocess.run([
    chrome, '--headless=new', '--disable-gpu', '--window-size=390,844',
    f'--screenshot={shot_modal}', 'http://localhost:5173/modal_preview_test.html'
], check=True)

# Clean up
if os.path.exists(temp_path):
    os.remove(temp_path)

print('Captured mobile-modal-open.png successfully.')
