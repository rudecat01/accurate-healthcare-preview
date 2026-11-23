import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

def build_all_assets():
    ref_path = r'C:\Users\dhruv\.gemini\antigravity\brain\d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2\.user_uploaded\media_1795431339239_1c430bdd.png'
    ref = cv2.imread(ref_path)
    gray = cv2.cvtColor(ref, cv2.COLOR_BGR2GRAY)
    _, letter_mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
    
    y_start, y_end = 81, 184
    ref_h = y_end - y_start
    m_edges = []
    p_edges = []
    spine_center = 219.0
    
    for y in range(y_start, y_end):
        row_m = np.where(letter_mask[y, 103:220] == 255)[0]
        row_p = np.where(letter_mask[y, 220:308] == 255)[0]
        m_r = (103 + row_m[-1]) if len(row_m) > 0 else 188
        p_l = (220 + row_p[0]) if len(row_p) > 0 else 240
        m_edges.append(m_r - spine_center)
        p_edges.append(p_l - spine_center)
        
    m_edges = np.array(m_edges, dtype=np.float32)
    p_edges = np.array(p_edges, dtype=np.float32)
    
    def smooth(arr, w=3):
        return np.convolve(arr, np.ones(w)/w, mode='same')
    m_edges = smooth(m_edges, 3)
    p_edges = smooth(p_edges, 3)
    
    CW, CH = 2400, 1800
    cx = 1200
    target_h = 600
    top_y = 260
    bot_y = top_y + target_h
    
    scale_y = target_h / float(ref_h)
    scale_x = scale_y * 1.05
    
    a_spine_curve = []
    h_spine_curve = []
    for i in range(target_h):
        idx = min(int(i / scale_y), ref_h - 1)
        a_spine_curve.append(int(cx + m_edges[idx] * scale_x))
        h_spine_curve.append(int(cx + p_edges[idx] * scale_x))
        
    stem_w = 220
    crossbar_y1 = top_y + int(target_h * 0.49)
    crossbar_y2 = top_y + int(target_h * 0.65)
    
    canvas_mask = np.zeros((CH, CW), dtype=np.uint8)
    
    a_stem_left = cx - stem_w
    a_outer_foot = cx - stem_w - 460
    a_inner_foot = cx - stem_w - 240
    a_apex_left = cx - stem_w - 40
    a_apex_right = a_spine_curve[0]
    
    # Outer A
    a_outer_pts = []
    a_outer_pts.append([a_outer_foot, bot_y])
    a_outer_pts.append([a_apex_left, top_y])
    a_outer_pts.append([a_apex_right, top_y])
    for i in range(target_h):
        a_outer_pts.append([a_spine_curve[i], top_y + i])
    a_outer_pts.append([a_stem_left, bot_y])
    cv2.fillPoly(canvas_mask, [np.array(a_outer_pts, np.int32)], 255)
    
    # Triangular eye of A
    def left_inner_x(y):
        t = (y - top_y) / float(target_h)
        return int((a_apex_left + 90) * (1 - t) + a_inner_foot * t)
        
    eye_pts = np.array([
        [left_inner_x(crossbar_y1), crossbar_y1],
        [left_inner_x(top_y + 100), top_y + 100],
        [a_stem_left, top_y + 100],
        [a_stem_left, crossbar_y1]
    ], np.int32)
    cv2.fillPoly(canvas_mask, [eye_pts], 0)
    
    # Bottom arch of A
    arch_pts = np.array([
        [a_inner_foot, bot_y + 2],
        [left_inner_x(crossbar_y2), crossbar_y2],
        [a_stem_left, crossbar_y2],
        [a_stem_left, bot_y + 2]
    ], np.int32)
    cv2.fillPoly(canvas_mask, [arch_pts], 0)
    
    # H left stem
    h_stem_left = cx
    h_stem_right = cx + stem_w + 460
    
    h_left_pts = []
    h_left_pts.append([h_stem_left + stem_w, top_y])
    h_left_pts.append([h_stem_left + stem_w, bot_y])
    for i in range(target_h - 1, -1, -1):
        h_left_pts.append([h_spine_curve[i], top_y + i])
    cv2.fillPoly(canvas_mask, [np.array(h_left_pts, np.int32)], 255)
    
    # H right stem
    h_right_pts = np.array([
        [h_stem_right - stem_w, top_y],
        [h_stem_right, top_y],
        [h_stem_right, bot_y],
        [h_stem_right - stem_w, bot_y]
    ], np.int32)
    cv2.fillPoly(canvas_mask, [h_right_pts], 255)
    
    # H crossbar
    h_crossbar_pts = np.array([
        [h_stem_left + stem_w - 5, crossbar_y1],
        [h_stem_right - stem_w + 5, crossbar_y1],
        [h_stem_right - stem_w + 5, crossbar_y2],
        [h_stem_left + stem_w - 5, crossbar_y2]
    ], np.int32)
    cv2.fillPoly(canvas_mask, [h_crossbar_pts], 255)
    
    canvas_mask = cv2.GaussianBlur(canvas_mask, (3, 3), 0)
    pil_mask = Image.fromarray(canvas_mask)
    
    font_main = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 98)
    font_sub = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 44)
    
    def draw_centered_tracked(d, text, font, y, color, tracking):
        total_w = sum(d.textbbox((0,0), c, font=font)[2] - d.textbbox((0,0), c, font=font)[0] for c in text) + tracking * (len(text) - 1)
        cur_x = cx - total_w / 2
        for c in text:
            d.text((cur_x, y), c, font=font, fill=color)
            w = d.textbbox((0,0), c, font=font)[2] - d.textbbox((0,0), c, font=font)[0]
            cur_x += w + tracking

    y_main = bot_y + 120
    y_sub = y_main + 135

    def save_full_variant(bg_color, letter_color, main_color, sub_color, out_path, is_transparent=False):
        if is_transparent:
            img = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
        else:
            img = Image.new('RGBA', (CW, CH), bg_color)
            
        letter_layer = Image.new('RGBA', (CW, CH), letter_color)
        img.paste(letter_layer, (0, 0), pil_mask)
        
        d = ImageDraw.Draw(img)
        draw_centered_tracked(d, "ACCURATE HEALTHCARE", font_main, y_main, main_color, tracking=28)
        draw_centered_tracked(d, "PHYSIOTHERAPY & NEURO REHAB CENTRE", font_sub, y_sub, sub_color, tracking=18)
        
        res = img.resize((1200, 900), Image.Resampling.LANCZOS)
        res.save(out_path)
        print(f"Saved: {out_path}")
        return res

    # 1. Full Badges
    save_full_variant((88, 146, 181, 255), (255, 255, 255, 255), (20, 64, 99, 255), (240, 246, 252, 255), 'public/images/logo-ah-slate.png')
    save_full_variant((14, 29, 62, 255), (255, 255, 255, 255), (255, 255, 255, 255), (212, 175, 55, 255), 'public/images/logo-ah-navy.png')
    save_full_variant((255, 255, 255, 255), (14, 29, 62, 255), (14, 29, 62, 255), (88, 146, 181, 255), 'public/images/logo-ah-white.png')
    save_full_variant(None, (14, 29, 62, 255), (14, 29, 62, 255), (88, 146, 181, 255), 'public/images/logo-ah-transparent.png', is_transparent=True)

    # 2. Tight Square Mark (Icon Only)
    # Bounding box of AH letters: x from a_outer_foot (cx - 680) to h_stem_right (cx + 680) = 1360w, target_h=600h
    # Pad to square
    mark_w = h_stem_right - a_outer_foot
    mark_cx = (a_outer_foot + h_stem_right) // 2
    mark_cy = (top_y + bot_y) // 2
    box_size = int(max(mark_w, target_h) * 1.15)
    bx1 = mark_cx - box_size // 2
    by1 = mark_cy - box_size // 2
    
    def save_mark_icon(bg_color, letter_color, out_path, is_transparent=False, corner_radius=0):
        if is_transparent:
            base = Image.new('RGBA', (CW, CH), (0, 0, 0, 0))
        else:
            base = Image.new('RGBA', (CW, CH), bg_color)
            
        letter_layer = Image.new('RGBA', (CW, CH), letter_color)
        base.paste(letter_layer, (0, 0), pil_mask)
        
        cropped = base.crop((bx1, by1, bx1 + box_size, by1 + box_size))
        
        if corner_radius > 0 and not is_transparent:
            # Rounded rect mask
            r_mask = Image.new('L', (box_size, box_size), 0)
            rd = ImageDraw.Draw(r_mask)
            rd.rounded_rectangle([(0, 0), (box_size, box_size)], radius=corner_radius, fill=255)
            output = Image.new('RGBA', (box_size, box_size), (0, 0, 0, 0))
            output.paste(cropped, (0, 0), r_mask)
            cropped = output
            
        final_512 = cropped.resize((512, 512), Image.Resampling.LANCZOS)
        final_512.save(out_path)
        print(f"Saved Mark: {out_path}")
        return final_512

    # A) Slate Blue Badge Mark (with smooth rounded corners for luxury look)
    save_mark_icon((88, 146, 181, 255), (255, 255, 255, 255), 'public/images/logo-ah-mark-slate.png', corner_radius=180)
    
    # B) Royal Navy Badge Mark
    save_mark_icon((14, 29, 62, 255), (255, 255, 255, 255), 'public/images/logo-ah-mark-navy.png', corner_radius=180)
    
    # C) Transparent Mark (Navy Letters, Crisp Transparent)
    save_mark_icon(None, (14, 29, 62, 255), 'public/images/logo-ah-mark-transparent.png', is_transparent=True)
    
    # D) Primary Navbar Logo (Replacing /images/logo-transparent.png)
    # The Slate Blue Badge Mark with white AH spine monogram inside:
    # This gives an immaculate, high-contrast, prestigious badge in the navbar!
    save_mark_icon((88, 146, 181, 255), (255, 255, 255, 255), 'public/images/logo-transparent.png', corner_radius=180)
    save_mark_icon((88, 146, 181, 255), (255, 255, 255, 255), 'public/images/logo.png', corner_radius=180)
    
    # E) Favicons
    fav_32 = Image.open('public/images/logo-ah-mark-slate.png').resize((32, 32), Image.Resampling.LANCZOS)
    fav_32.save('public/favicon.ico')
    fav_32.save('public/images/favicon.png')
    
    print("All master brand assets generated with 100% precision.")

if __name__ == '__main__':
    build_all_assets()
