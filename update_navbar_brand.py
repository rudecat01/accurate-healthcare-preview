import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<!-- Brand Logo & Name -->\s*<a href="#" class="flex items-center[^>]*>.*?</a>'

new_brand_block = '''<!-- Brand Logo & Name -->
      <a href="#" class="flex items-center gap-3 sm:gap-3.5 group shrink-0" aria-label="Accurate Healthcare Home">
        <img src="/images/logo-ah-full.png" alt="Accurate Healthcare" class="h-10 sm:h-12 w-auto max-w-[130px] sm:max-w-[150px] rounded-xl object-contain shadow-md border border-slate-200/80 group-hover:scale-105 transition duration-200 shrink-0" />
        <div class="border-l-2 border-slate-200/90 pl-3 sm:pl-3.5 flex flex-col justify-center">
          <span class="text-base sm:text-lg lg:text-[19px] font-black uppercase tracking-[0.16em] text-navy-900 leading-none">
            ACCURATE <span class="text-[#367fb5]">HEALTHCARE</span>
          </span>
          <div class="flex items-center gap-2 mt-1 sm:mt-1.5">
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

html_updated = re.sub(pattern, new_brand_block, html, count=1, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_updated)

with open('site.html', 'w', encoding='utf-8') as f:
    f.write(html_updated)

print('Updated index.html and site.html with refined brand typography.')
