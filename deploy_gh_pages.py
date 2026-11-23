import subprocess
import os

def run(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    if res.stdout.strip():
        print("STDOUT:", res.stdout.strip())
    if res.stderr.strip():
        print("STDERR:", res.stderr.strip())
    return res.returncode

# 1. Update vite.config.js with base: './'
vite_config = '''import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        notFound: resolve(import.meta.dirname, '404.html')
      }
    }
  }
});
'''
with open('vite.config.js', 'w', encoding='utf-8') as f:
    f.write(vite_config)

# 2. Build production bundle
run("npm run build")

# 3. Create .nojekyll in dist
with open(os.path.join('dist', '.nojekyll'), 'w', encoding='utf-8') as f:
    f.write('')

# 4. Commit and push main branch
run("git add vite.config.js")
run('git commit -m "Configure base path for universal deployment"')
run("git push origin main")

# 5. Push dist to gh-pages branch
# Using a clean orphan branch for gh-pages
run("git branch -D gh-pages")
run("git checkout --orphan gh-pages")
# Remove all from git index in gh-pages
run("git rm -rf .")
# Add dist contents to root of gh-pages
import shutil
for item in os.listdir('dist'):
    s = os.path.join('dist', item)
    d = os.path.join('.', item)
    if os.path.isdir(s):
        if os.path.exists(d):
            shutil.rmtree(d)
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

run("git add .")
run('git commit -m "Deploy production bundle to GitHub Pages"')
run("git push -f origin gh-pages")

# Switch back to main
run("git checkout -f main")

# 6. Enable GitHub Pages via gh API
ret = run("gh api --method POST repos/rudecat01/accurate-healthcare-preview/pages -f source[branch]=gh-pages -f source[path]=/")
print("GitHub Pages API return code:", ret)
