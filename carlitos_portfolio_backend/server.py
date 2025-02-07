from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from gpt_demo.prebuilt_cv_letter import gpt_cover_letter_writer
from gpt_demo.custom_gpt import customGPT


load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    response = {
        "status": 200,
        "message": "Successful connection to backend"
    }
    return jsonify(response)

@app.route('/cover-letter', methods=['POST'])
def cover_letter_route():
    # Parse JSON from the request body
    data = request.get_json()
    
    if not data:
        # No JSON payload
        return jsonify({
            "status": 400,
            "message": "No JSON data found in request."
        }), 400
    
    transcript = data.get('transcript')
    user = data.get('user', {})
    prompts = data.get('prompts', {})
    print(f'''
        Transcript: {transcript}
        user = {user}
        
    ''')
    new_transcript = gpt_cover_letter_writer(transcript, user)
    response = {
        "status": 200,
        "message": "GPT Cover Letter Writer Function",
        "sent_transcript": transcript,
        "sent_user": user,
        "returned_transcript": new_transcript
    }
    
    return jsonify(response)


@app.route("/custom-gpt", methods=['POST'])
def custom_gpt_route():
     # Parse JSON from the request body
    data = request.get_json()
    
    if not data:
        # No JSON payload
        return jsonify({
            "status": 400,
            "message": "No JSON data found in request."
        }), 400
    
    transcript = data.get('transcript')
    user = data.get('user', {})
    user_prompts = data.get('user_prompts', {})
    print(f'''
        Transcript: {transcript}
        user = {user}
        prompts = {user_prompts['main']}
        
    ''')
    new_transcript = customGPT(user_prompts, user, transcript)
    response = {
        "status": 200,
        "message": "GPT Cover Letter Writer Function",
        "sent_transcript": transcript,
        "sent_user": user,
        "returned_transcript": new_transcript
    }
    
    return jsonify(response)
if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)