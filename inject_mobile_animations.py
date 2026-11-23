import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Hero section
# Add wave float animation to bg-lines in hero
html = html.replace(
    'src="/images/bg-lines.svg" alt="" class="w-[1700px] max-w-none transform scale-110 translate-y-8"',
    'src="/images/bg-lines.svg" alt="" class="w-[1700px] max-w-none transform scale-110 translate-y-8 animate-wave-float"'
)

# Hero Left Content Reveal classes
html = html.replace(
    '<div class="hero-stoerer">',
    '<div class="hero-stoerer reveal-blur-up">'
)

html = html.replace(
    '<p class="text-xs sm:text-sm font-black italic uppercase tracking-widest text-[#478ab9] block">',
    '<p class="text-xs sm:text-sm font-black italic uppercase tracking-widest text-[#478ab9] block reveal-blur-up stagger-1">'
)

html = html.replace(
    '<h1 class="text-4xl sm:text-6xl lg:text-[68px] font-black italic tracking-tight text-slate-900 uppercase leading-[0.98]">',
    '<h1 class="text-4xl sm:text-6xl lg:text-[68px] font-black italic tracking-tight text-slate-900 uppercase leading-[0.98] reveal-blur-up stagger-2">'
)

html = html.replace(
    '<p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">',
    '<p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal reveal-blur-up stagger-3">'
)

html = html.replace(
    '<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">',
    '<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 reveal-blur-up stagger-4">'
)

html = html.replace(
    '<div class="pt-8 border-t border-slate-200/80">',
    '<div class="pt-8 border-t border-slate-200/80 reveal-blur-up stagger-5">'
)

# Counter targets in Hero Trust strip
html = html.replace(
    '<i data-lucide="award" class="w-4 h-4 text-gold-600"></i> 17+ Yrs Practice',
    '<i data-lucide="award" class="w-4 h-4 text-[#478ab9]"></i> <span data-counter-target="17" data-counter-suffix="+">17+</span> Yrs Practice'
)

html = html.replace(
    '<i data-lucide="users" class="w-4 h-4 text-navy-900"></i> 10,000+ Recovered Patients',
    '<i data-lucide="users" class="w-4 h-4 text-navy-900"></i> <span data-counter-target="10000" data-counter-suffix="+">10,000+</span> Recovered Patients'
)

html = html.replace(
    '<i data-lucide="home" class="w-4 h-4 text-gold-600"></i> Home Care Across NCR',
    '<i data-lucide="home" class="w-4 h-4 text-[#478ab9]"></i> Home Care Across NCR'
)

# Hero Right card reveal
html = html.replace(
    '<div class="lg:col-span-6 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">',
    '<div class="lg:col-span-6 relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0 reveal-blur-right stagger-2">'
)

# Floating rating badge
html = html.replace(
    'class="absolute -top-5 left-2 sm:-left-4 bg-white p-3 sm:p-3.5 rounded-2xl shadow-[4px_4px_0px_#0e1d3e] border-2 border-navy-900 flex items-center gap-3 animate-float z-20"',
    'class="absolute -top-5 left-2 sm:-left-4 bg-white p-3 sm:p-3.5 rounded-2xl shadow-[4px_4px_0px_#0e1d3e] border-2 border-navy-900 flex items-center gap-3 animate-soft-float z-20"'
)

# 2. Add Continuous Sliding Marquee Ribbon immediately after Hero section
marquee_html = '''
  <!-- ================= CONTINUOUS CLINICAL RUNNING TICKER (WEBFLOW SIGNATURE) ================= -->
  <div class="relative py-3.5 bg-navy-900 border-y-2 border-navy-950 overflow-hidden shadow-inner select-none">
    <div class="animate-marquee items-center gap-8 whitespace-nowrap text-xs font-black italic uppercase tracking-wider text-white">
      <span class="flex items-center gap-2.5"><span class="text-[#478ab9]">★ 4.8 / 5</span> GOOGLE VERIFIED CLINIC</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="brain" class="w-3.5 h-3.5 text-[#478ab9]"></i> STROKE &amp; PARALYSIS NEURO REHAB</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> DR. MANISH GUPTA (MPT NEURO)</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="activity" class="w-3.5 h-3.5 text-[#478ab9]"></i> SCIATICA &amp; SLIP DISC DECOMPRESSION</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="home" class="w-3.5 h-3.5 text-[#478ab9]"></i> PHYSIO AT HOME ACROSS NCR</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="award" class="w-3.5 h-3.5 text-[#478ab9]"></i> 17+ YEARS CLINICAL MASTERY</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="users" class="w-3.5 h-3.5 text-emerald-400"></i> 10,000+ PATIENTS RECOVERED</span>
      <span class="text-[#478ab9]">•</span>
      <!-- Loop duplicate for seamless infinite flow -->
      <span class="flex items-center gap-2.5"><span class="text-[#478ab9]">★ 4.8 / 5</span> GOOGLE VERIFIED CLINIC</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="brain" class="w-3.5 h-3.5 text-[#478ab9]"></i> STROKE &amp; PARALYSIS NEURO REHAB</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> DR. MANISH GUPTA (MPT NEURO)</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="activity" class="w-3.5 h-3.5 text-[#478ab9]"></i> SCIATICA &amp; SLIP DISC DECOMPRESSION</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="home" class="w-3.5 h-3.5 text-[#478ab9]"></i> PHYSIO AT HOME ACROSS NCR</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="award" class="w-3.5 h-3.5 text-[#478ab9]"></i> 17+ YEARS CLINICAL MASTERY</span>
      <span class="text-[#478ab9]">•</span>
      <span class="flex items-center gap-2"><i data-lucide="users" class="w-3.5 h-3.5 text-emerald-400"></i> 10,000+ PATIENTS RECOVERED</span>
      <span class="text-[#478ab9]">•</span>
    </div>
  </div>
'''

if '<!-- ================= CONTINUOUS CLINICAL RUNNING TICKER' not in html:
    # Insert right after hero section </section>
    hero_end = html.find('</section>', html.find('id="services"') if False else html.find('<!-- ================= HERO SECTION'))
    hero_close = html.find('</section>', hero_end) + len('</section>')
    html = html[:hero_close] + '\n' + marquee_html + html[hero_close:]

# 3. Section 2: "YOUR HEALTH IN BEST HANDS"
html = html.replace(
    '<div class="lg:col-span-5">',
    '<div class="lg:col-span-5 reveal-blur-left">'
)

html = html.replace(
    '<div class="lg:col-span-7 space-y-6">',
    '<div class="lg:col-span-7 space-y-6 reveal-blur-right">'
)

# Animated counters in Section 2
html = html.replace(
    '<span class="text-3xl sm:text-4xl font-black italic text-gold-600 block">17+</span>',
    '<span data-counter-target="17" data-counter-suffix="+" class="text-3xl sm:text-4xl font-black italic text-[#478ab9] block">17+</span>'
)
html = html.replace(
    '<span class="text-3xl sm:text-4xl font-black italic text-navy-900 block">10k+</span>',
    '<span data-counter-target="10000" data-counter-suffix="+" class="text-3xl sm:text-4xl font-black italic text-navy-900 block">10,000+</span>'
)
html = html.replace(
    '<span class="text-3xl sm:text-4xl font-black italic text-gold-600 block">4.8 ★</span>',
    '<span data-counter-target="4.8" data-counter-decimals="1" data-counter-suffix=" ★" class="text-3xl sm:text-4xl font-black italic text-[#478ab9] block">4.8 ★</span>'
)

# 4. Section 3: Locations
html = html.replace(
    '<!-- Location 1: Main Clinic (Landcraft Golflinks / NH-24) -->\n        <div class="bg-white rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] flex flex-col justify-between group">',
    '<!-- Location 1: Main Clinic (Landcraft Golflinks / NH-24) -->\n        <div class="bg-white rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] flex flex-col justify-between group reveal-blur-left">'
)

html = html.replace(
    '<!-- Location 2: Dedicated Home Care Network -->\n        <div class="bg-white rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] flex flex-col justify-between group">',
    '<!-- Location 2: Dedicated Home Care Network -->\n        <div class="bg-white rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] flex flex-col justify-between group reveal-blur-right">'
)

# 5. Section 4: Treatments (stagger-1 to stagger-6)
for i in range(1, 7):
    old_card = f'<!-- Treatment {i}:'
    # Find next occurrence of treatment-card-interactive
    idx = html.find(old_card)
    if idx != -1:
        card_class_idx = html.find('class="treatment-card-interactive', idx)
        if card_class_idx != -1 and card_class_idx < idx + 300:
            html = html[:card_class_idx] + f'class="treatment-card-interactive reveal-blur-up stagger-{i} ' + html[card_class_idx + len('class="treatment-card-interactive '):]

# 6. Section 5: Doctors
html = html.replace(
    '<!-- Doctor 1: Dr. Manish Gupta (Centered Desk Photo) -->\n          <div class="bg-white rounded-3xl p-6 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between">',
    '<!-- Doctor 1: Dr. Manish Gupta (Centered Desk Photo) -->\n          <div class="bg-white rounded-3xl p-6 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between reveal-blur-left">'
)

html = html.replace(
    '<!-- Doctor 2: Dr. Vandana Choudhary (Centered Consultation Desk Photo) -->\n          <div class="bg-white rounded-3xl p-6 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between">',
    '<!-- Doctor 2: Dr. Vandana Choudhary (Centered Consultation Desk Photo) -->\n          <div class="bg-white rounded-3xl p-6 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between reveal-blur-right">'
)

# 7. Mobile Bottom Action Bar tactile feedback
html = html.replace(
    '<a href="tel:+919999871475" class="flex-1 py-3 px-2 rounded-xl bg-slate-100 text-slate-900 font-black italic uppercase text-xs flex items-center justify-center gap-1.5 border border-slate-300 whitespace-nowrap">',
    '<a href="tel:+919999871475" class="flex-1 py-3 px-2 rounded-xl bg-slate-100 text-slate-900 font-black italic uppercase text-xs flex items-center justify-center gap-1.5 border border-slate-300 whitespace-nowrap active:scale-95 transition-transform">'
)

html = html.replace(
    '<i data-lucide="phone-call" class="w-3.5 h-3.5 text-gold-600 shrink-0"></i>',
    '<i data-lucide="phone-call" class="w-3.5 h-3.5 text-[#478ab9] shrink-0"></i>'
)

html = html.replace(
    '<a href="https://wa.me/919999871475?text=Hello%20Accurate%20Healthcare,%20I%20would%20like%20to%20book%20a%20physiotherapy%20consultation" target="_blank" class="flex-1 py-3 px-2 rounded-xl bg-emerald-600 text-white font-black italic uppercase text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#0e1d3e] whitespace-nowrap">',
    '<a href="https://wa.me/919999871475?text=Hello%20Accurate%20Healthcare,%20I%20would%20like%20to%20book%20a%20physiotherapy%20consultation" target="_blank" class="flex-1 py-3 px-2 rounded-xl bg-emerald-600 text-white font-black italic uppercase text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#0e1d3e] whitespace-nowrap active:scale-95 transition-transform">'
)

html = html.replace(
    '<button data-type="clinic" class="open-booking-modal flex-1 py-3 px-2 rounded-xl bg-gold-500 text-navy-950 font-black italic uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-navy-900 shadow-[2px_2px_0px_#0e1d3e] whitespace-nowrap">',
    '<button data-type="clinic" class="open-booking-modal flex-1 py-3 px-2 rounded-xl bg-[#478ab9] text-white font-black italic uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-navy-900 shadow-[2px_2px_0px_#0e1d3e] whitespace-nowrap active:scale-95 transition-transform">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Injected mobile-first animations and marquee successfully into index.html")
