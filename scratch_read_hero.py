with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

s_idx = text.find('<!-- ================= HERO SECTION')
e_idx = text.find('<!-- ================= EMERGENCY TRIAGE STRIP')
print(text[s_idx:e_idx])
