import subprocess

def run(cmd):
    print(f"Executing: {cmd}")
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    if res.stdout.strip():
        print("STDOUT:", res.stdout.strip())
    if res.stderr.strip():
        print("STDERR:", res.stderr.strip())
    return res.returncode

run("git init")
run("git branch -M main")
run("git add .")
run('git commit -m "Accurate Healthcare Physiotherapy & Neuro Rehab Centre landing website"')
ret = run("gh repo create accurate-healthcare-preview --public --source=. --remote=origin --push")
print("Repo creation return code:", ret)
