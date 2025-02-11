# This is the root file of the Flask App

#System imports
import json

# Flask Imports
from flask import Flask, request, jsonify
from flask_cors import CORS

# Third party imports
from dotenv import load_dotenv

# Custom Modules
from gpt_demo.prebuilt_cv_letter import gpt_cover_letter_writer # handles cover letter pretained GPT
from gpt_demo.custom_gpt import customGPT # handles custom trained gpt
from voice.audio_process import process_audio # handles voice functionality

load_dotenv() # loads .env 

app = Flask(__name__)
CORS(app)

# to verify the server is awake before making request
@app.route('/')
def index():
    response = {
        "status": 200,
        "message": "Successful connection to backend"
    }
    return jsonify(response)

# GPT Cover Letter route
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
    
    # Parsing data from request
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

# Custom GPT training route
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
    
    # Parsing data from request
    transcript = data.get('transcript')
    user = data.get('user', {})
    user_prompts = data.get('user_prompts', {})
    
    print(f'''
        Transcript: {transcript}
        user = {user}
        prompts = {user_prompts}
        
    ''')
    
    # Send off
    new_transcript = customGPT(user_prompts, user, transcript)
    response = {
        "status": 200,
        "message": "GPT Cover Letter Writer Function",
        "sent_transcript": transcript,
        "sent_user": user,
        "returned_transcript": new_transcript
    }
    
    return jsonify(response)

# Voice demo route
@app.route("/voice-demo", methods=['POST'])
def voice_demo():
    # First, ensure the process_audio function is available.
    if process_audio is None:
        return jsonify({
            "status": 500,
            "message": "Audio processing function is not available."
        }), 500
    return process_audio(request)

if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)