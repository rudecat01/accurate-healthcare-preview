import urllib.request
from bs4 import BeautifulSoup
import re

url = 'https://www.google.com/search?kgmid=/g/11sj7r2l2l&q=Accurate+Healthcare+%26+Physiotherapy+Centre&hl=en'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
})

try:
    resp = urllib.request.urlopen(req)
    html = resp.read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    # print text snippets around rating
    found = set()
    for el in soup.find_all(text=re.compile(r'4\.[789]|Accurate|Review')):
        p = el.parent.get_text().strip()
        if len(p) < 250 and p not in found:
            found.add(p)
            print('Snippet:', p)
            
    for el in soup.find_all(text=re.compile(r'Shop|Pandav|NH-24|Mehrauli|Ghaziabad')):
        p = el.parent.get_text().strip()
        if len(p) < 250 and p not in found:
            found.add(p)
            print('Address snippet:', p)
except Exception as e:
    print('Error:', e)
