import sys
from playwright.sync_api import sync_playwright

def main():
    if len(sys.argv) < 2:
        print("Usage: python deploy_vercel.py <auth_url>")
        sys.exit(1)
        
    auth_url = sys.argv[1]
    print(f"Opening headful browser for URL: {auth_url}")
    print("Please log in/authorize the Vercel session in the opened browser window.")
    
    with sync_playwright() as p:
        # Launch browser in headful mode (headless=False) so the user can interact
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto(auth_url)
        
        # Wait until the page URL changes to success or the user closes the browser
        print("Waiting for you to complete authorization...")
        try:
            while True:
                page.wait_for_timeout(1000)
                # If authorization is successful, Vercel redirects or displays success.
                # We can also detect if the browser is closed.
                if page.is_closed():
                    print("Browser window closed.")
                    break
                if "success" in page.url.lower():
                    print("Authorization successful page detected!")
                    page.wait_for_timeout(5000) # Let user see success message
                    break
        except Exception as e:
            print("Finished or browser closed:", e)
        finally:
            browser.close()

if __name__ == "__main__":
    main()
