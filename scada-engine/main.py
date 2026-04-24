import requests
import time
import random

API_URL = "http://localhost:5000/api/scada/reading"
METER_SERIAL = "MTR-001" # Example serial

def send_reading(consumption):
    payload = {
        "serialNumber": METER_SERIAL,
        "consumption": consumption
    }
    try:
        response = requests.post(API_URL, json=payload)
        if response.status_code == 201:
            print(f"✅ Success: Recorded {consumption} units")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"⚠️ Error connecting to backend: {e}")

if __name__ == "__main__":
    print(f"🚀 SCADA Engine simulation started for meter {METER_SERIAL}")
    while True:
        simulated_usage = round(random.uniform(0.1, 2.5), 2)
        send_reading(simulated_usage)
        time.sleep(5) # Send reading every 5 seconds
