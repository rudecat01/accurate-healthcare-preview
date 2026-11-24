import subprocess
import os
import shutil
import tempfile

def run(cmd, cwd=None):
    print(f"Running: {cmd} (cwd={cwd})")
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True, cwd=cwd)
    if res.stdout.strip():
        print("STDOUT:", res.stdout.strip())
    if res.stderr.strip():
        print("STDERR:", res.stderr.strip())
    return res.returncode

# 1. Build dist first
run("npm run build")

# Ensure .nojekyll in dist
with open(os.path.join('dist', '.nojekyll'), 'w', encoding='utf-8') as f:
    f.write('')

# 2. Commit main branch
run("git add -A")
run('git commit -m "Add Supabase backend integration, appointment booking service, and Admin Portal"')
run("git push origin main")

# 3. Safely push dist to gh-pages using a temporary git repo clone
temp_dir = tempfile.mkdtemp()
print(f"Temporary clone dir: {temp_dir}")

repo_url = "https://github.com/rudecat01/accurate-healthcare-preview.git"
run(f'git clone --branch gh-pages --single-branch "{repo_url}" "{temp_dir}"')

# Clear old files in temp_dir (except .git)
for item in os.listdir(temp_dir):
    if item == '.git':
        continue
    p = os.path.join(temp_dir, item)
    if os.path.isdir(p):
        shutil.rmtree(p, ignore_errors=True)
    else:
        try:
            os.remove(p)
        except:
            pass

# Copy from dist to temp_dir
for item in os.listdir('dist'):
    s = os.path.join('dist', item)
    d = os.path.join(temp_dir, item)
    if os.path.isdir(s):
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

with open(os.path.join(temp_dir, '.nojekyll'), 'w', encoding='utf-8') as f:
    f.write('')

run("git add -A", cwd=temp_dir)
run('git commit -m "Deploy definitive mobile modal and hamburger fixes"', cwd=temp_dir)
ret = run("git push origin gh-pages", cwd=temp_dir)

# Clean up temp dir
shutil.rmtree(temp_dir, ignore_errors=True)

print("Safe gh-pages deployment complete. Return code:", ret)
