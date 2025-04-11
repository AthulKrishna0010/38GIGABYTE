import requests

# Your OCR.Space API key
api_key = 'your_api_key_here'  # Replace with your actual key

# Path to your image file (put your receipt image in the same folder)
image_path = 'receipt.jpg'  # Replace with your file name if different

# API endpoint
url = 'https://api.ocr.space/parse/image'

with open(image_path, 'rb') as image_file:
    response = requests.post(
        url,
        files={'filename': image_file},
        data={
            'apikey': api_key,
            'language': 'eng',
            'OCREngine': '2'
        }
    )

result = response.json()

try:
    parsed_text = result['ParsedResults'][0]['ParsedText']
    print("✅ Extracted Text:\n")
    print(parsed_text)
except (KeyError, IndexError):
    print("❌ Failed to extract text. Response:")
    print(result)
