import subprocess
import time
import sys
import os
import re
import urllib.request
from playwright.sync_api import sync_playwright

def is_chrome_running_on_port(port=9222):
    try:
        req = urllib.request.Request(f"http://localhost:{port}/json/version")
        with urllib.request.urlopen(req, timeout=2) as response:
            return response.status == 200
    except Exception:
        return False

def launch_chrome_with_cdp(port=9222):
    if is_chrome_running_on_port(port):
        print(f"\n[INFO] Chrome is already running on port {port}. Connecting to existing session...")
        return
        
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    user_data_dir = r"c:\MASTER_WORKSPACE\HebeWellness\hebewellness-replit\scratch\chrome_profile"
    
    # Ensure directory exists
    os.makedirs(user_data_dir, exist_ok=True)
    
    print(f"\n[INFO] Launching official Google Chrome via CDP on port {port}...")
    cmd = f'"{chrome_path}" --remote-debugging-port={port} --user-data-dir="{user_data_dir}" --no-first-run'
    subprocess.Popen(cmd, shell=True)
    
    # Wait for Chrome port to become active
    for i in range(12):
        print(f"Waiting for Chrome to open (attempt {i+1}/12)...")
        if is_chrome_running_on_port(port):
            print("[SUCCESS] Chrome is running and listening on debugging port.")
            return
        time.sleep(1)
        
    raise RuntimeError(f"Failed to launch Chrome on remote debugging port {port}. Please make sure Chrome is installed at '{chrome_path}' and not running elsewhere.")

def run_cmd(cmd, cwd=None, env=None):
    print(f"\nRunning command: {cmd}")
    res = subprocess.run(cmd, shell=True, cwd=cwd, text=True, capture_output=True, env=env, encoding="utf-8", errors="replace")
    if res.returncode != 0:
        print(f"Command failed! Stderr: {res.stderr}")
    else:
        print("Command completed successfully.")
        print(res.stdout)
    return res

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
    target_domain = "hebe-wellness.surge.sh"
    target_url = f"https://{target_domain}/"
    project_dir = r"c:\MASTER_WORKSPACE\HebeWellness\hebewellness-replit\artifacts\hebe-wellness"
    
    print("==================================================")
    print("      HEBE WELLNESS TECHNICAL SEO AUTOMATOR      ")
    print("==================================================")
    print(f"Target URL: {target_url}")
    print(f"Project Folder: {project_dir}")
    
    # Step 1: Launch Chrome with remote debugging
    launch_chrome_with_cdp(9222)
    
    # Step 2: Run Playwright and attach to the running Chrome instance
    with sync_playwright() as p:
        print("\nConnecting Playwright to Chrome over CDP...")
        browser = p.chromium.connect_over_cdp("http://localhost:9222")
        
        context = browser.contexts[0] if browser.contexts else browser.new_context()
        page = context.pages[0] if context.pages else context.new_page()
        
        page.bring_to_front()
        
        # --------------------------------------------------
        # Phase 1: Google Search Console
        # --------------------------------------------------
        print("\n--- PHASE 1: Google Search Console Setup ---")
        page.goto("https://search.google.com/search-console/welcome")
        
        # Check if the user is already logged in or if they need to log in
        print("Checking authentication state...")
        time.sleep(2)
        
        if "accounts.google.com" in page.url or "about" in page.url:
            print("\n[ACTION REQUIRED] Google Sign-In is required.")
            print("Please log in to your Google Account (lall.sbi58@gmail.com) in the opened Chrome window.")
            
            while "accounts.google.com" in page.url or "about" in page.url:
                page.wait_for_timeout(1000)
                
            print("[SUCCESS] Logged in successfully!")
            page.wait_for_timeout(3000)
        else:
            print("[INFO] Already logged in to Google.")
            
        print("\n[INSTRUCTION] Preparing to verify Google Search Console property.")
        print(f"URL target: {target_url}")
        
        # Let's check if the URL redirected directly to the dashboard, indicating it is already verified
        if "resource_id" in page.url:
            print("[SUCCESS] Domain is already verified in Google Search Console! Skipping verification steps.")
            html_file_name = None
        else:
            # Try to programmatically fill the URL prefix input on the welcome screen
            print("\nAttempting to enter the URL prefix programmatically...")
            try:
                # Use the exact aria-label selector we discovered
                url_input = page.query_selector('input[aria-label="https://www.example.com"]')
                if url_input and url_input.is_visible():
                    print("URL prefix input found and is visible. Filling...")
                    url_input.fill(target_url)
                    page.wait_for_timeout(500)
                    url_input.press("Enter")
                    print("URL prefix submitted programmatically.")
                    page.wait_for_timeout(3000)
                else:
                    print("URL prefix input is not visible or not found. Skipping auto-fill.")
            except Exception as fill_err:
                print(f"Could not auto-fill URL prefix input: {fill_err}")

            print("\n[ACTION REQUIRED] If the property is not yet verified:")
            print("1. If you see the 'Verify ownership' modal on screen, stay there.")
            print("2. If you are on the GSC Welcome page, type 'https://hebe-wellness.surge.sh/' into the 'URL prefix' input and click Continue.")
            print("3. If you are on the main GSC dashboard, click the property dropdown (top left), click 'Add property', enter 'https://hebe-wellness.surge.sh/' in the 'URL prefix' card, and click Continue.")
            print("\nThe scanner will automatically detect the Google verification file details from your screen, write the file to your workspace, build/redeploy to Surge, and complete verification.")
            
            # Self-healing scanning loop
            html_file_name = None
            print("\nScanning screen for Google verification tag...")
            
            for attempt in range(600):
                # If during the scanning loop, the page gets redirected to a verified dashboard, break out
                if "resource_id" in page.url:
                    print("[INFO] Redirected to dashboard. Property verified!")
                    break
                    
                try:
                    content = page.content()
                    matches = re.findall(r"google[a-f0-9]+\.html", content)
                    if matches:
                        html_file_name = matches[0]
                        print(f"\n[FOUND] Google verification file name detected on screen: {html_file_name}")
                        break
                except Exception:
                    pass
                
                if attempt % 10 == 0 and attempt > 0:
                    print(f"Still scanning... (attempt {attempt}/600). Make sure the 'Verify ownership' modal (HTML file verification method) is open in Chrome.")
                    
                page.wait_for_timeout(2000)
                
            if html_file_name:
                public_dir = os.path.join(project_dir, "public")
                verification_file_path = os.path.join(public_dir, html_file_name)
                
                print(f"\n[INFO] Writing verification token to: {verification_file_path}")
                with open(verification_file_path, "w") as f:
                    f.write(f"google-site-verification: {html_file_name}")
                    
                print("\n[ACTION] Rebuilding React application with verification file...")
                run_cmd("npm run build", cwd=project_dir)
                
                print("\n[ACTION] Deploying built application to Surge...")
                env = os.environ.copy()
                env["SURGE_LOGIN"] = "lall.sbi58@gmail.com"
                env["SURGE_TOKEN"] = "b703db2f1f1fc66e614a5eef77dd454e"
                run_cmd(f"npx surge --project ./dist --domain {target_domain}", cwd=project_dir, env=env)
                
                print("\nRedeploy complete. Triggering Google verification...")
                page.wait_for_timeout(5000)
                
                # Click the "Verify" button on screen
                verify_clicked = False
                try:
                    verify_buttons = page.query_selector_all("button")
                    for btn in verify_buttons:
                        text = btn.inner_text() or ""
                        if "verify" in text.lower() or "done" in text.lower():
                            btn.click()
                            verify_clicked = True
                            print("[SUCCESS] Clicked 'Verify' button on screen.")
                            break
                except Exception as click_err:
                    print(f"Could not click verify automatically: {click_err}")
                
                if not verify_clicked:
                    print("[ACTION REQUIRED] Please click the 'Verify' button on your screen under the HTML file method.")
            else:
                print("\n[INFO] Verification file scanning finished.")
                print("[ACTION REQUIRED] If you see a 'Go to property' or 'Done' button, please click it to proceed.")
            
        page.wait_for_timeout(5000)
        
        # Navigate to Sitemaps section
        escaped_resource = target_url.replace(":", "%3A").replace("/", "%2F")
        sitemaps_url = f"https://search.google.com/search-console/sitemaps?resource_id={escaped_resource}"
        print(f"\nNavigating to Google Sitemaps section: {sitemaps_url}")
        page.goto(sitemaps_url)
        page.wait_for_timeout(4000)
        
        # Submit sitemap.xml
        print("Attempting to submit sitemap.xml automatically...")
        try:
            page.wait_for_selector("input", timeout=6000)
            sitemap_inputs = page.query_selector_all("input")
            for inp in sitemap_inputs:
                aria_label = inp.get_attribute("aria-label") or ""
                placeholder = inp.get_attribute("placeholder") or ""
                if "sitemap" in aria_label.lower() or "sitemap" in placeholder.lower() or "add a new sitemap" in aria_label.lower():
                    inp.fill("sitemap.xml")
                    page.wait_for_timeout(500)
                    inp.press("Enter")
                    print("[SUCCESS] Submitted sitemap.xml to Google Search Console!")
                    break
        except Exception:
            print("[ACTION REQUIRED] Could not automatically submit sitemap.xml. Please enter 'sitemap.xml' in the 'Add a new sitemap' field on your screen and click Submit.")
            
        # --------------------------------------------------
        # Phase 2: Bing Webmaster Tools
        # --------------------------------------------------
        print("\n--- PHASE 2: Bing Webmaster Tools Setup ---")
        page.goto("https://www.bing.com/webmasters")
        
        print("\n[ACTION REQUIRED] If you are not signed in, please log in to Bing Webmaster Tools in the Chrome window.")
        print("Waiting for dashboard to load...")
        
        # Wait until user completes login and lands on dashboard (home/dashboard page)
        while "/home" not in page.url and "/dashboard" not in page.url:
            page.wait_for_timeout(1000)
                
        print("[SUCCESS] Logged in to Bing Webmaster Tools!")
        page.wait_for_timeout(4000)
        
        print("\n[INFO] Bing Webmaster Tools supports one-click import from Google Search Console.")
        print("[ACTION REQUIRED] Please click the 'Import' button under 'Import your sites from Google Search Console' on the Bing dashboard.")
        print("This will instantly import the verified domain and submit the sitemaps automatically without needing separate verification steps.")
        
        print("\nWaiting for you to finish importing/adding the site in Bing. Close the Chrome window when you are completely finished.")
        
        try:
            while not page.is_closed():
                page.wait_for_timeout(1000)
        except Exception:
            pass
            
        print("\nBrowser closed. Technical SEO automated setup completed!")

if __name__ == "__main__":
    main()
