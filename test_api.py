import requests

url = "http://127.0.0.1:5001/predict"



image_path = r"C:\Users\harsh bhaskar\OneDrive\Desktop\tomato-early-blight-lesions.png"
print("Sending image...")

try:
    with open(image_path, "rb") as image:
        files = {"image": image}

        response = requests.post(
            url,
            files=files,
            timeout=60
        )

    print("Status Code:", response.status_code)
    print("Response:", response.text)

except Exception as e:
    print("Error:", e)











