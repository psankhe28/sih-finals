from flask import Flask,request
from flask_cors import CORS, cross_origin
from paddleocr import PaddleOCR
import re
import PyPDF2
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io
import os
import requests

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ocr = PaddleOCR(use_angle_cls=True, lang='en',show_log = False)

def getOCRList(path):
    result = ocr.ocr(path, cls=True)
    return result

def rotate_image(input_pdf, output_pdf, page_number, image_path, rotation_angle):
    with open(input_pdf, 'rb') as file:
        pdf_reader = PyPDF2.PdfFileReader(file)
        total_pages = pdf_reader.numPages

        if page_number < 1 or page_number > total_pages:
            print(f"Invalid page number. The PDF has {total_pages} pages.")
            return

        pdf_writer = PyPDF2.PdfFileWriter()

        for current_page_number in range(total_pages):
            page = pdf_reader.getPage(current_page_number)

            if current_page_number + 1 == page_number:
                packet = io.BytesIO()
                can = canvas.Canvas(packet, pagesize=letter)
                can.rotate(rotation_angle)
                can.drawInlineImage(image_path, x=100, y=100)
                can.save()
                packet.seek(0)
                rotated_image_page = PyPDF2.PdfFileReader(packet)
                page.mergePage(rotated_image_page.getPage(0))

            pdf_writer.addPage(page)

        with open(output_pdf, 'wb') as output_file:
            pdf_writer.write(output_file)

def extract_text(data):
    text_parts = []
    for item in data:
        if isinstance(item, list):
            text_parts.extend(extract_text(item))
        elif isinstance(item, tuple) and len(item) == 2 and isinstance(item[0], str):
            text_parts.append(item[0])

    return text_parts

def extract_state(ext_text):
    state_pattern1 = re.compile(r'State of (\w+)')
    state_pattern2 = re.compile(r'Government of (\w+)')
    # Extract the state using the pattern
    matched_states1 = [state_pattern1.search(part).group(1) for part in ext_text if state_pattern1.search(part)]
    matched_states2 = [state_pattern2.search(part).group(1) for part in ext_text if state_pattern2.search(part)]
    
    if matched_states1:
      return matched_states1[0]
    else:
      return matched_states2[0]

def match_data(my_state):

    indian_states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Lakshadweep', 'Puducherry', 'Jammu'
        ]

    my_state_lower = my_state.lower()
    if my_state_lower in map(str.lower, indian_states):
        return my_state_lower

    return "Match Not Found"

def verify_domicile(ext_text):
    if any("Domicile" in line for line in ext_text) or any("DOMICILE" in line for line in ext_text):
      return "Correct"
    else:
      return "Incorrect"

def verify_id(ext_text):
    if any("ID" in line for line in ext_text):
      return "Correct"
    else:
      return "Incorrect"

def verify_caste(ext_text):
    if any("Caste" in line for line in ext_text):
      return "Correct"
    else:
      return "Incorrect"
    
def verify_aadhar(ext_text):
    if any("AADHAAR" in line for line in ext_text) or any("VID" in line for line in ext_text):
      return "Correct"
    else:
      return "Incorrect"


# @app.route('/domicile_state', methods=['POST'])
# def domicile_state():

#     if 'file' not in request.files:
#         return "No file part"

#     uploaded_file = request.files['file']

#     if uploaded_file.filename == '':
#         return 'No selected file'
    
#     data_ext = getOCRList(uploaded_file)
#     extracted_text = extract_text(data_ext)
#     extracted_state = extract_state(extracted_text)
#     match_res = match_data(extracted_state)
#     return match_res
    
@app.route('/domicile_state', methods=['POST'])
def domicile_state():
    if 'file' not in request.files:
        return "No file part"

    uploaded_file = request.files['file']

    if uploaded_file.filename == '':
        return "No selected file"

    _, file_extension = os.path.splitext(uploaded_file.filename)
    file_extension = file_extension.lower()

    print(file_extension)

    if file_extension == ".pdf":
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded.pdf')
        uploaded_file.save(pdf_path)
        data_ext = getOCRList(pdf_path)

    elif file_extension == ".jpg" or file_extension == ".jpeg":
        image_path = 'temp_image.jpg'
        uploaded_file.save(image_path)
        data_ext = getOCRList(image_path)
 
    extracted_text = extract_text(data_ext)
    extracted_state = extract_state(extracted_text)
    match_res = match_data(extracted_state)

    # Remove the temporary image file
    try:
       if file_extension == ".pdf":
          os.remove(pdf_path)
       elif file_extension == ".jpg" or file_extension == ".jpeg":
          os.remove(image_path)
    except OSError as e:
        print(f"Error deleting temporary image file: {e}")

    return match_res

@app.route('/domicile_detect/<path>')
def domicile_detect(path):
    data_ext = getOCRList(path)
    extracted_text = extract_text(data_ext)
    ver_res = verify_domicile(extracted_text)
    return ver_res

@app.route('/id_detect/<path>')
def id_detect(path):
    data_ext = getOCRList(path)
    extracted_text = extract_text(data_ext)
    ver_res = verify_id(extracted_text)
    return ver_res

@app.route('/caste_detect/<path>')
def caste_detect(path):
    data_ext = getOCRList(path)
    extracted_text = extract_text(data_ext)
    ver_res = verify_caste(extracted_text)
    return ver_res

@app.route('/aadhar_detect/<path>')
def aadhar_detect(path):
    data_ext = getOCRList(path)
    extracted_text = extract_text(data_ext)
    ver_res = verify_aadhar(extracted_text)
    return ver_res