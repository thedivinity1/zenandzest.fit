import urllib.request
import json
import sys

def main():
    host = "hebe-wellness.surge.sh"
    key = "8382747190adcebd746726190ab7cda4"
    key_location = f"https://{host}/{key}.txt"
    
    urls = [
        f"https://{host}/",
        f"https://{host}/circadian-planner",
        f"https://{host}/dermal-crocin",
        f"https://{host}/hpa-burnout",
        f"https://{host}/prakriti-test",
        f"https://{host}/geroscience-map",
        f"https://{host}/mitochondria-tool",
        f"https://{host}/dht-block",
        f"https://{host}/gut-restoration",
        f"https://{host}/zone2-cardio",
        f"https://{host}/clinical-trials",
        f"https://{host}/medical-board",
        f"https://{host}/sourcing-index",
        f"https://{host}/rasayana-geroscience",
        f"https://{host}/stacking-protocols",
        f"https://{host}/botanical-dosage",
        f"https://{host}/epigenetic-clock",
        f"https://{host}/sleep-debt",
        f"https://{host}/wellness-builder",
        f"https://{host}/lab-intake",
        f"https://{host}/clinical-cases",
        f"https://{host}/tools",
        f"https://{host}/blog",
        f"https://{host}/about",
        f"https://{host}/consult",
        f"https://{host}/shop",
        f"https://{host}/case-studies"
    ]
    
    payload = {
        "host": host,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls
    }
    
    print(f"Triggering IndexNow API for host: {host}")
    print(f"Submitting {len(urls)} URLs...")
    
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as res:
            status = res.status
            print(f"IndexNow submission response status: {status}")
            if status == 200:
                print("SUCCESS: URLs submitted successfully to IndexNow! Search engines will index them immediately.")
            else:
                print(f"IndexNow API returned non-200 status code: {status}")
    except Exception as e:
        print(f"Error calling IndexNow API: {e}")

if __name__ == "__main__":
    main()
