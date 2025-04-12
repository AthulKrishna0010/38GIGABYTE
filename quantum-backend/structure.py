from flask import Flask, request, jsonify
from PIL import Image
import json
import os
import re
from datetime import datetime
import tempfile
import subprocess
import google.generativeai as genai
from dotenv import load_dotenv


from flask_cors import CORS
app = Flask(__name__)
CORS(app)
load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))
class PDFExporter:
    @staticmethod
    def export_to_pdf(data, output_dir="exports"):
        """Generate PDF from data using Node.js converter"""
        try:
            if not data or not isinstance(data, dict):
                print("❌ Invalid data for PDF generation")
                return None

            os.makedirs(output_dir, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"receipt_export_{timestamp}.pdf"
            filepath = os.path.join(output_dir, filename)

            # Use temporary file for Node.js communication
            with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False) as tmp_json:
                json.dump(data, tmp_json)
                tmp_json_path = tmp_json.name

            # Generate PDF using Node.js
            result = subprocess.run(
                [
                    "node", 
                    "utils/pdf-generator/converter.js",
                    tmp_json_path,
                    filepath
                ],
                capture_output=True,
                text=True
            )

            # Clean up temporary file
            try:
                os.unlink(tmp_json_path)
            except:
                pass

            if result.returncode != 0:
                print(f"❌ PDF generation failed: {result.stderr}")
                return None

            if not os.path.exists(filepath):
                print("❌ PDF file was not created")
                return None

            print(f"✅ PDF successfully created at: {filepath}")
            return filepath

        except Exception as e:
            print(f"❌ PDF Export Error: {str(e)}")
            return None

def clean_json_string(json_str):
    """Extract and clean JSON from Gemini response"""
    try:
        # Remove markdown code blocks
        json_str = re.sub(r'```json|```', '', json_str)
        # Extract JSON portion
        start = json_str.find('{')
        end = json_str.rfind('}') + 1
        if start == -1 or end == 0:
            return None
        return json_str[start:end].strip()
    except Exception:
        return None

@app.route('/process-receipt', methods=['POST'])
def process_receipt_endpoint():
    try:
        file = request.files['image']  # Check that the 'image' key exists
        file_path = os.path.join(tempfile.gettempdir(), file.filename)
        file.save(file_path)
        print(f"✅ Image file saved at: {file_path}")

        # Process the file...
        image = Image.open(file_path)

        
        print(f"Processing file saved at: {file_path}");

        prompt = """Extract receipt data as JSON with these exact keys:
        {
        "total_amount": number,
        "due_date": "DD/MM/YY",
        "units_used": number,
        "reading_date": "DD/MM/YY",
        "Tariff": "text",
        "Bill No": "text"
        }"""

        # Use Gemini model to process image
        model = genai.GenerativeModel("models/gemini-1.5-pro")
        response = model.generate_content([prompt, image])
        raw_result = response.text

        cleaned_json = clean_json_string(raw_result)
        if not cleaned_json:
            print("❌ Failed to extract valid JSON")
            return jsonify({"error": "Failed to extract valid JSON"}), 500

        data = json.loads(cleaned_json)

        # Generate PDF
        pdf_path = PDFExporter.export_to_pdf(data)
        if pdf_path:
            print(f"✅ PDF generated successfully: {pdf_path}")
            return jsonify({"success": True, "pdf_path": pdf_path})
        else:
            return jsonify({"error": "PDF generation failed"}), 500

    
    except Exception as e:
        print(f"❌ Error during processing: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Starting receipt processing service...")
    app.run(host="0.0.0.0", port=5001)
