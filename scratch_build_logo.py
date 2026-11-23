import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def render_ah_spine_logo(bg_color=(88, 146, 181, 255), letter_color=(255, 255, 255, 255), text_color=(27, 69, 102, 255), sub_color=(212, 175, 55, 255)):
    W, H = 1600, 1200
    
    if bg_color is None:
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    else:
        canvas = Image.new('RGBA', (W, H), bg_color)
        
    draw = ImageDraw.Draw(canvas)
    
    top_y = 180
    bottom_y = 700
    mono_h = bottom_y - top_y  # 520px
    center_x = 800
    
    # Spine center at x=800
    spine_half_w = 45  # central gap is 90px
    a_right = center_x - spine_half_w   # 755
    h_left = center_x + spine_half_w    # 845
    
    # Load and scale spine mask
    spine_raw = Image.open('public/images/spine_binary.png').convert('L')
    spine_w = int(spine_raw.width * (mono_h / spine_raw.height))
    spine_h = mono_h
    spine_scaled = spine_raw.resize((spine_w, spine_h), Image.Resampling.LANCZOS)
    spine_arr = np.array(spine_scaled)
    is_letter = spine_arr > 140
    
    # Monogram base mask
    mono_mask = Image.new('L', (W, H), 0)
    m_draw = ImageDraw.Draw(mono_mask)
    
    # --- DRAW "A" ---
    # Width of A = 430px (from x=325 to 755)
    # Right stem of A is 135px wide: from x=620 to x=755
    # Outer polygon for A:
    a_poly = [
        (325, bottom_y),        # bottom left outer foot
        (540, top_y),           # top left apex
        (a_right, top_y),       # top right apex
        (a_right, bottom_y),    # bottom right outer foot
        (620, bottom_y),        # bottom right inner foot
        (620, 530),             # bottom crossbar right
        (470, 530),             # bottom crossbar left
        (420, bottom_y),        # bottom left inner foot
        (325, bottom_y)
    ]
    m_draw.polygon(a_poly, fill=255)
    
    # Inner triangle for A:
    a_inner = [
        (495, 450),             # inner triangle bottom left
        (560, 270),             # inner triangle top apex
        (620, 450),             # inner triangle bottom right
        (495, 450)
    ]
    m_draw.polygon(a_inner, fill=0)
    
    # --- DRAW "H" ---
    # Width of H = 430px (from x=845 to 1275)
    # Left stem of H: from 845 to 980 (135px wide)
    # Right stem of H: from 1140 to 1275 (135px wide)
    # Crossbar: from 980 to 1140, from y=450 to y=530 (80px tall, exact match with A!)
    
    h_poly = [
        (h_left, top_y),        # top left
        (980, top_y),           # top inner left
        (980, 450),             # crossbar top left
        (1140, 450),            # crossbar top right
        (1140, top_y),          # top inner right
        (1275, top_y),          # top right
        (1275, bottom_y),       # bottom right
        (1140, bottom_y),       # bottom inner right
        (1140, 530),            # crossbar bottom right
        (980, 530),             # crossbar bottom left
        (980, bottom_y),        # bottom inner left
        (h_left, bottom_y),     # bottom left
        (h_left, top_y)
    ]
    m_draw.polygon(h_poly, fill=255)
    
    # --- APPLY SPINE CARVE ---
    paste_x = center_x - spine_w // 2
    mono_arr = np.array(mono_mask)
    
    # Region where spine sits:
    sub = mono_arr[top_y:top_y+spine_h, paste_x:paste_x+spine_w]
    # Carve out where spine is (where is_letter is False):
    sub[~is_letter] = 0
    mono_arr[top_y:top_y+spine_h, paste_x:paste_x+spine_w] = sub
    
    # Anti-alias mask:
    smooth_mask = Image.fromarray(mono_arr).filter(ImageFilter.GaussianBlur(0.7))
    
    # Paste letters onto canvas:
    letter_layer = Image.new('RGBA', (W, H), letter_color)
    canvas.paste(letter_layer, (0, 0), smooth_mask)
    
    # --- DRAW TYPOGRAPHY: ACCURATE HEALTHCARE ---
    font_paths = [
        "C:\\Windows\\Fonts\\arialbd.ttf",
        "C:\\Windows\\Fonts\\segoeuib.ttf",
        "C:\\Windows\\Fonts\\Montserrat-Bold.ttf"
    ]
    font_main = None
    font_sub = None
    for p in font_paths:
        if os.path.exists(p):
            font_main = ImageFont.truetype(p, 68)
            font_sub = ImageFont.truetype(p, 30)
            break
            
    if font_main is None:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    text_main = "ACCURATE HEALTHCARE"
    text_sub = "PHYSIOTHERAPY & NEURO REHAB CENTRE"
    
    y_main = bottom_y + 65
    y_sub = y_main + 85
    
    def draw_spaced_text(d, text, font, y, color, tracking=18):
        total_w = sum(d.textbbox((0,0), char, font=font)[2] - d.textbbox((0,0), char, font=font)[0] for char in text) + tracking * (len(text) - 1)
        cur_x = center_x - total_w / 2
        for char in text:
            d.text((cur_x, y), char, font=font, fill=color)
            char_w = d.textbbox((0,0), char, font=font)[2] - d.textbbox((0,0), char, font=font)[0]
            cur_x += char_w + tracking
            
    draw_spaced_text(draw, text_main, font_main, y_main, text_color, tracking=16)
    draw_spaced_text(draw, text_sub, font_sub, y_sub, sub_color, tracking=10)
    
    return canvas

# 1. Slate Blue version (Exact match to uploaded reference)
slate = render_ah_spine_logo(
    bg_color=(88, 146, 181, 255),
    letter_color=(255, 255, 255, 255),
    text_color=(20, 52, 78, 255),
    sub_color=(235, 243, 250, 255)
)
slate.save('public/images/logo-ah-slate.png')

# 2. Deep Navy version
navy = render_ah_spine_logo(
    bg_color=(14, 29, 62, 255),
    letter_color=(255, 255, 255, 255),
    text_color=(255, 255, 255, 255),
    sub_color=(212, 175, 55, 255)
)
navy.save('public/images/logo-ah-navy.png')

# 3. Transparent version with Navy letters + Slate spine on light backgrounds
trans = render_ah_spine_logo(
    bg_color=None,
    letter_color=(14, 29, 62, 255),
    text_color=(14, 29, 62, 255),
    sub_color=(88, 146, 181, 255)
)
trans.save('public/images/logo-ah-transparent.png')

# 4. Icon only version (monogram square for favicon and navbar icon)
# Crop around the monogram
print("Generated all 3 variants!")
