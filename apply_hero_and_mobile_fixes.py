import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 1: Floating Review Badge position
# Change from:
# class="absolute -top-5 left-2 sm:-left-4 bg-white p-3 sm:p-3.5 ...
# To:
# class="absolute -top-6 right-3 sm:right-6 bg-white p-2.5 sm:p-3.5 rounded-2xl shadow-[4px_4px_0px_#0e1d3e] border-2 border-navy-900 flex items-center gap-2.5 sm:gap-3 animate-soft-float z-20"
# This moves it completely away from Dr. Manish Gupta (who is on the left half)
badge_pattern = r'class="absolute -top-5 left-2 sm:-left-4 bg-white p-3 sm:p-3\.5[^"]*"'
badge_replacement = 'class="absolute -top-5 sm:-top-6 right-2 sm:right-6 bg-white p-2.5 sm:p-3.5 rounded-2xl shadow-[4px_4px_0px_#0e1d3e] border-2 border-navy-900 flex items-center gap-2 sm:gap-3 animate-soft-float z-20"'
html = re.sub(badge_pattern, badge_replacement, html, count=1)

# Fix 2: Mobile Navbar Brand Link & Hamburger Menu
# Ensure subtitle is hidden on mobile (<sm) so the hamburger button has plenty of room!
old_brand_markup = re.search(r'<!-- Brand Logo & Name -->.*?</a>', html, re.DOTALL).group(0)

new_brand_markup = '''<!-- Brand Logo & Name -->
      <a href="#" class="flex items-center gap-2 sm:gap-3.5 group shrink-0" aria-label="Accurate Healthcare Home">
        <img src="/images/logo-ah-full.png" alt="Accurate Healthcare" class="h-9 sm:h-12 w-auto max-w-[100px] sm:max-w-[150px] rounded-xl object-contain shadow-md border border-slate-200/80 group-hover:scale-105 transition duration-200 shrink-0" />
        <div class="border-l-2 border-slate-200/90 pl-2.5 sm:pl-3.5 flex flex-col justify-center">
          <span class="text-xs sm:text-base lg:text-[19px] font-black uppercase tracking-wider sm:tracking-[0.16em] text-navy-900 leading-none">
            ACCURATE <span class="text-[#367fb5]">HEALTHCARE</span>
          </span>
          <div class="hidden sm:flex items-center gap-2 mt-1 sm:mt-1.5">
            <span class="h-[1.5px] w-5 sm:w-7 bg-[#367fb5]/40"></span>
            <span class="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.22em] text-slate-500 whitespace-nowrap flex items-center gap-1.5">
              <span>PHYSIOTHERAPY</span>
              <span class="text-[#367fb5] font-black text-xs leading-none">+</span>
              <span>NEURO REHAB</span>
            </span>
            <span class="h-[1.5px] w-5 sm:w-7 bg-[#367fb5]/40"></span>
          </div>
        </div>
      </a>'''
html = html.replace(old_brand_markup, new_brand_markup, 1)

# Fix 3: Mobile Hamburger Button - Add visible pill styling with clean margin
old_hamburger = re.search(r'<!-- Mobile Hamburger -->.*?<button id="mobileMenuBtn"[^>]*>.*?</button>', html, re.DOTALL).group(0)

new_hamburger = '''<!-- Mobile Hamburger -->
      <button id="mobileMenuBtn" class="xl:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 border border-slate-200/80 shadow-sm shrink-0 flex items-center justify-center transition active:scale-95 ml-2" aria-label="Toggle Menu">
        <i data-lucide="menu" class="w-5 h-5 sm:w-6 sm:h-6 text-navy-900"></i>
      </button>'''
html = html.replace(old_hamburger, new_hamburger, 1)

# Fix 4: Booking Modal z-index and mobile layout
# Change #bookingModal from z-50 to z-[100]
html = html.replace(
    'id="bookingModal" class="fixed inset-0 z-50 bg-slate-950/70',
    'id="bookingModal" class="fixed inset-0 z-[100] bg-slate-950/75'
)

# Change #modalContent to have safe mobile height, generous bottom padding, and scroll
old_modal_content = re.search(r'id="modalContent" class="[^"]*"', html).group(0)
new_modal_content = 'id="modalContent" class="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border-2 border-navy-900 transform scale-95 transition-transform duration-300 relative max-h-[88vh] sm:max-h-[85vh] overflow-y-auto pb-10 sm:pb-8 my-auto overscroll-contain"'
html = html.replace(old_modal_content, new_modal_content, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('site.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Applied all fixes to index.html and site.html successfully.')
