import subprocess
import time
import sys

def main():
    email = "lall.sbi58@gmail.com"
    password = "HebeWellnessMaster2026!"
    
    print(f"Running surge login with email: {email}")
    
    # Start the process in a shell
    proc = subprocess.Popen(
        ["npx", "surge", "login"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        shell=True
    )
    
    # We will read the output line by line and send input when requested
    time.sleep(3)
    proc.stdin.write(email + "\n")
    proc.stdin.flush()
    print("Sent email...")
    
    time.sleep(3)
    proc.stdin.write(password + "\n")
    proc.stdin.flush()
    print("Sent password...")
    
    time.sleep(5)
    proc.stdin.close()
    
    stdout_data = proc.stdout.read()
    print("SURGE OUTPUT:")
    print(stdout_data)
    
    print("Running surge token to retrieve deploy token...")
    proc_token = subprocess.Popen(
        ["npx", "surge", "token"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        shell=True
    )
    time.sleep(3)
    proc_token.stdin.write(email + "\n")
    proc_token.stdin.flush()
    time.sleep(3)
    proc_token.stdin.write(password + "\n")
    proc_token.stdin.flush()
    proc_token.stdin.close()
    
    token_output = proc_token.stdout.read()
    print("TOKEN OUTPUT:")
    print(token_output)

if __name__ == "__main__":
    main()
