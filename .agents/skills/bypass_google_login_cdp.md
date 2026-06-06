# Skill: Bypassing Google Login Secure Browser Blocks (CDP Bypass)

**Description**: Bypasses Google's secure browser checks (*"This browser or app may not be secure"*) during automation tasks by launching the user's official Google Chrome browser and connecting Playwright/Puppeteer via Chrome DevTools Protocol (CDP).

---

## Bypassing Google Login via CDP

### 1. Launching Chrome with CDP enabled
Standard automated browser drivers (Chromium, Firefox, WebKit) launched directly by Playwright/Puppeteer are detected by Google's anti-bot system. To bypass this, launch the official Chrome binary as a standalone operating system process with remote debugging enabled:

```python
import subprocess
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
user_data_dir = r"c:\MASTER_WORKSPACE\HebeWellness\hebewellness-replit\scratch\chrome_profile"
port = 9222

cmd = f'"{chrome_path}" --remote-debugging-port={port} --user-data-dir="{user_data_dir}" --no-first-run'
subprocess.Popen(cmd, shell=True)
```

### 2. Connecting Playwright over CDP
Instead of launching a new browser instance via Playwright, connect directly to the debugging port:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp(f"http://localhost:{port}")
    context = browser.contexts[0] if browser.contexts else browser.new_context()
    page = context.pages[0] if context.pages else context.new_page()
    
    # page is now connected to the official Google Chrome session
    page.goto("https://search.google.com/search-console/welcome")
```

### 3. Human-in-the-Loop Login Detection
Wait for the user to complete Google Sign-In or 2FA. This is robust and prevents bot detection:

```python
while "accounts.google.com" in page.url or "about" in page.url:
    page.wait_for_timeout(1000)
```

### 4. Self-Healing Modal & Code Scanners
Instead of hardcoding brittle selectors that break on Google layout changes, use real-time regex scanning of page source to extract verification details dynamically:

```python
html_file_name = None
for attempt in range(300):
    content = page.content()
    matches = re.findall(r"google[a-f0-9]+\.html", content)
    if matches:
        html_file_name = matches[0]
        break
    page.wait_for_timeout(2000)
```
