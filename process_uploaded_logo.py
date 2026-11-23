import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import os

def process_logo():
    src_path = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\.user_uploaded\media_1795433399734_5787f51c.jpg'
    img = cv2.imread(src_path)
    
    # Target brand colors from image
    brand_bgr = [185, 138, 71] # #478ab9
    brand_rgb = (71, 138, 185) # #478ab9
    brand_hex = "#478ab9"
    
    # 1. Clean background to perfect solid color while preserving letter anti-aliasing
    # Calculate difference from brand background color
    diff = np.abs(img.astype(np.float32) - np.array(brand_bgr, dtype=np.float32))
    dist = np.sqrt(np.sum(diff**2, axis=2))
    
    # Mask of letters: where color deviates significantly from background towards white
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Create smooth alpha channel for letters
    # Background brightness ~ 132, White letters ~ 255
    bg_lum = 132.0
    alpha = np.clip((gray.astype(np.float32) - bg_lum) / (255.0 - bg_lum) * 255.0, 0, 255).astype(np.uint8)
    
    # Threshold to clean up background noise
    _, clean_letter_mask = cv2.threshold(alpha, 15, 255, cv2.THRESH_TOZERO)
    
    # Create super clean 1024x1024 master
    master_rgba = np.zeros((1024, 1024, 4), dtype=np.uint8)
    master_rgba[:, :, :3] = (71, 138, 185) # BGR in cv2 is [185, 138, 71], but in PIL RGB is (71, 138, 185)
    master_rgba[:, :, 3] = 255
    
    # Paste white letters with subpixel antialiasing
    pil_bg = Image.new('RGBA', (1024, 1024), (71, 138, 185, 255))
    pil_letters = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
    pil_mask = Image.fromarray(alpha)
    
    master_img = Image.composite(pil_letters, pil_bg, pil_mask)
    
    # Save master high-clarity logo
    out_dir = 'public/images'
    os.makedirs(out_dir, exist_ok=True)
    
    master_img.save(os.path.join(out_dir, 'logo-ah.png'), quality=100)
    master_img.convert('RGB').save(os.path.join(out_dir, 'logo-ah.jpg'), quality=100)
    print("Saved logo-ah.png and logo-ah.jpg")
    
    # 2. Transparent background version (White letters on transparent)
    trans_white = Image.new('RGBA', (1024, 1024), (255, 255, 255, 0))
    trans_white.paste(Image.new('RGBA', (1024, 1024), (255, 255, 255, 255)), (0, 0), pil_mask)
    trans_white.save(os.path.join(out_dir, 'logo-ah-white-transparent.png'))
    
    # Transparent background with brand blue letters
    trans_blue = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    trans_blue.paste(Image.new('RGBA', (1024, 1024), (71, 138, 185, 255)), (0, 0), pil_mask)
    trans_blue.save(os.path.join(out_dir, 'logo-ah-blue-transparent.png'))
    print("Saved transparent variants")
    
    # 3. Create Navbar Rounded Badge (tightly framed with balanced padding and rounded corners)
    # Letter bounds: Y: 313 to 717 (height 404), X: 66 to 943 (width 877)
    # We want a squircle / rounded tile for the navbar and mobile header
    badge_size = 960
    cx, cy = 505, 515
    b_x1 = cx - badge_size // 2
    b_y1 = cy - badge_size // 2
    
    # Create high-res 512x512 rounded tile
    tile = master_img.crop((b_x1, b_y1, b_x1 + badge_size, b_y1 + badge_size))
    tile_512 = tile.resize((512, 512), Image.Resampling.LANCZOS)
    
    # Apply modern smooth squircle rounded corner mask
    mask_tile = Image.new('L', (512, 512), 0)
    dt = ImageDraw.Draw(mask_tile)
    dt.rounded_rectangle([(0, 0), (512, 512)], radius=110, fill=255)
    
    badge_final = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    badge_final.paste(tile_512, (0, 0), mask_tile)
    
    badge_final.save(os.path.join(out_dir, 'logo-ah-badge.png'))
    badge_final.save(os.path.join(out_dir, 'logo-transparent.png'))
    badge_final.save(os.path.join(out_dir, 'logo.png'))
    print("Saved logo-ah-badge.png and replaced logo-transparent.png & logo.png")
    
    # 4. Favicon icons
    badge_final.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon.ico')
    badge_final.resize((32, 32), Image.Resampling.LANCZOS).save('public/images/favicon.png')
    badge_final.resize((192, 192), Image.Resampling.LANCZOS).save('public/images/icon-192.png')
    badge_final.resize((512, 512), Image.Resampling.LANCZOS).save('public/images/icon-512.png')
    print("Saved favicons (32, 192, 512)")
    
    # 5. Copy to artifact directory for easy inspection
    art_dir = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2'
    badge_final.save(os.path.join(art_dir, 'logo-ah-badge.png'))
    master_img.save(os.path.join(art_dir, 'logo-ah-master.png'))
    print("Copied to artifact directory")

if __name__ == '__main__':
    process_logo()
