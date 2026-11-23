import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Let's write a Python script that produces:
# 1. public/images/logo-ah.svg (Clean vector SVG)
# 2. public/images/logo-ah-slate.png (High-res on Slate Blue #5892B5)
# 3. public/images/logo-ah-navy.png (High-res on Deep Navy #0e1d3e)
# 4. public/images/logo-ah-transparent.png (High-res transparent PNG)
# 5. public/images/favicon-ah.png (Icon badge for favicon)

def generate_svg_and_pngs():
    # Canonical coordinate space: 1000 x 750
    # Center of canvas is x=500
    # Monogram height: y=80 to y=480 (height = 400)
    
    # Let's define the precise SVG path for the spine cutout:
    # Top y = 80, Bottom y = 480
    # Center x = 500
    
    # 6 vertebrae segments from y=100 to y=460 (span 360px, ~60px per vertebra)
    # Left bumps (into A, towards x < 500)
    # Right ribs (into H, towards x > 500)
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" width="100%" height="100%">
  <defs>
    <style>
      .bg-slate { fill: #5892B5; }
      .letter-white { fill: #FFFFFF; }
      .text-navy { fill: #1B4566; font-family: 'Montserrat', 'Segoe UI', 'Arial', sans-serif; font-weight: 900; letter-spacing: 0.18em; }
      .text-gold { fill: #E5C158; font-family: 'Montserrat', 'Segoe UI', 'Arial', sans-serif; font-weight: 800; letter-spacing: 0.12em; }
    </style>
  </defs>
  
  <!-- Background (Optional / Slate) -->
  <rect width="1000" height="750" class="bg-slate" rx="0"/>
  
  <g id="monogram-ah">
    <!-- Letter A with Spine Carve on Right -->
    <!-- Letter H with Spine Carve on Left -->
  </g>
</svg>
"""
    print("Vector generator script ready.")

if __name__ == '__main__':
    generate_svg_and_pngs()
