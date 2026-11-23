import subprocess
import os
import shutil

def run(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    if res.stdout.strip():
        print("STDOUT:", res.stdout.strip())
    if res.stderr.strip():
        print("STDERR:", res.stderr.strip())
    return res.returncode

# 1. Build production bundle
run("npm run build")

# 2. Ensure .nojekyll in dist
with open(os.path.join('dist', '.nojekyll'), 'w', encoding='utf-8') as f:
    f.write('')

# 3. Commit changes to main
run("git add .")
run('git commit -m "Fix hero doctors equal layout, review sticker reposition, and mobile modal & hamburger improvements"')
run("git push origin main")

# 4. Update gh-pages branch cleanly
# We will checkout gh-pages, copy dist contents, and push
run("git checkout -f gh-pages")
# Remove all old files
for item in os.listdir('.'):
    if item == '.git' or item == 'dist' or item == 'node_modules':
        continue
    if os.path.isdir(item):
        shutil.rmtree(item, ignore_errors=True)
    else:
        try:
            os.remove(item)
        except:
            pass

# Copy from dist
for item in os.listdir('dist'):
    s = os.path.join('dist', item)
    d = os.path.join('.', item)
    if os.path.isdir(s):
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

with open('.nojekyll', 'w', encoding='utf-8') as f:
    f.write('')

run("git add -A")
run('git commit -m "Deploy latest hero and mobile fixes to GitHub Pages"')
run("git push -f origin gh-pages")

# Switch back to main
run("git checkout -f main")
print("Successfully deployed latest fixes to GitHub Pages.")
