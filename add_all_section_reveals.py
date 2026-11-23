with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Section 6: Clinic Gallery
html = html.replace(
    '<div class="grid md:grid-cols-3 gap-8">\n        \n        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative">',
    '<div class="grid md:grid-cols-3 gap-8">\n        \n        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative reveal-blur-zoom stagger-1">'
)

html = html.replace(
    '        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative">\n          <img src="/images/clinic-awards.jpg"',
    '        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative reveal-blur-zoom stagger-2">\n          <img src="/images/clinic-awards.jpg"'
)

html = html.replace(
    '        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative">\n          <img src="/images/clinic-waiting.jpg"',
    '        <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[5px_5px_0px_#0e1d3e] bg-slate-900 group h-[420px] relative reveal-blur-zoom stagger-3">\n          <img src="/images/clinic-waiting.jpg"'
)

# Section 7: "DO YOU WANT TO LIVE PAIN-FREE"
html = html.replace(
    '<div class="lg:col-span-6 space-y-6">\n          <h2 class="text-3xl sm:text-5xl font-black italic uppercase tracking-tight text-slate-900 leading-tight">',
    '<div class="lg:col-span-6 space-y-6 reveal-blur-left">\n          <h2 class="text-3xl sm:text-5xl font-black italic uppercase tracking-tight text-slate-900 leading-tight">'
)

html = html.replace(
    '<div class="lg:col-span-6">\n          <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] bg-slate-900 h-80 sm:h-96 relative group">',
    '<div class="lg:col-span-6 reveal-blur-right">\n          <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] bg-slate-900 h-80 sm:h-96 relative group">'
)

# Section 8: Patient Reviews (3 reviews)
html = html.replace(
    '<!-- Review 1: Pooja Verma (Cervical & Spine) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between">',
    '<!-- Review 1: Pooja Verma (Cervical & Spine) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between reveal-blur-up stagger-1">'
)

html = html.replace(
    '<!-- Review 2: Rajesh Sharma (Stroke Rehabilitation) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between">',
    '<!-- Review 2: Rajesh Sharma (Stroke Rehabilitation) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between reveal-blur-up stagger-2">'
)

html = html.replace(
    '<!-- Review 3: Anita Chaudhary (Post-TKR Rehabilitation) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between">',
    '<!-- Review 3: Anita Chaudhary (Post-TKR Rehabilitation) -->\n        <div class="bg-[#f8f8fa] rounded-3xl p-8 border-2 border-navy-900 shadow-[4px_4px_0px_#0e1d3e] flex flex-col justify-between reveal-blur-up stagger-3">'
)

# Section 9: Quick Booking Form & Map
html = html.replace(
    '<div class="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] relative">',
    '<div class="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] relative reveal-blur-left">'
)

html = html.replace(
    '<div class="lg:col-span-7">\n          <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] bg-white h-[420px] relative">',
    '<div class="lg:col-span-7 reveal-blur-right">\n          <div class="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-[6px_6px_0px_#0e1d3e] bg-white h-[420px] relative">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Added all section reveal animations across index.html")
