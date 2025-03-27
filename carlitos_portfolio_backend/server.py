# This is the main entry point for the Flask backend application.

# Standard library imports
import json
# Flask framework imports for building the web server and handling HTTP requests/responses
from flask import Flask, request, jsonify
from flask_cors import CORS

# Third-party module to load environment variables from a .env file (e.g., API keys and other settings)
from dotenv import load_dotenv

# Custom module imports:
# - gpt_demo.prebuilt_cv_letter: Handles GPT-generated cover letters.
# - gpt_demo.custom_gpt: Handles custom GPT interactions with user-defined prompts.
# - voice.audio_process: Manages voice input processing.
from gpt_demo.prebuilt_cv_letter import gpt_cover_letter_writer  # GPT Cover Letter functionality
from gpt_demo.custom_gpt import customGPT                        # Custom GPT functionality
from voice.audio_process import process_audio                     # Voice processing functionality
from voice.trained_chat import trainedChat
from global_functions.get_time import get_today_pst
from security.main import request_auth
# Load environment variables from the .env file.
load_dotenv()

# Initialize the Flask application.
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
CORS(app)

# Basic route to verify that the backend server is running.
@app.route('/')
def index():
    check = request_auth(request, '/')
    if check['status'] != 200:
        response = {
            'status': check['status'], 
            'message': check['message']}
        return jsonify(response)
    print('\nNEW_VISIT\n') # Needs firebase counter
    response = {
        "status": 200,
        "message": "Successful connection to backend"
    }
    return jsonify(response)

# Route to handle GPT Cover Letter generation requests.
@app.route('/cover-letter', methods=['POST'])
def cover_letter_route():
    # Parse the JSON payload from the POST request.
    data = request.get_json()

    if not data:
        print(f'\n### ALERT: NO DATA - CV GPT - {get_today_pst()} ###\n')
        # Return an error response if no JSON payload is provided.
        return jsonify({
            "status": 400,
            "message": "No JSON data found in request."
        }), 400
    
    # Extract the transcript, user details, and prompts (if any) from the request data.
    transcript = data.get('transcript')
    user = data.get('user', {})
    print(f'''
            GPT_TYPE: Prebuilt - Cover Letter
            User: {user}
        ''')
    # Generate the updated conversation transcript using the GPT Cover Letter Writer function.
    new_transcript = gpt_cover_letter_writer(transcript, user)
    
    # Prepare the response with status, messages, and both sent and returned transcript data.
    response = {
        "status": 200,
        "message": "GPT Cover Letter Writer Function",
        "sent_transcript": transcript,
        "sent_user": user,
        "returned_transcript": new_transcript
    }
    # print('\n Cover Letter Results: \n', '\n', response, '\n', '\n', get_today_pst(), '\n')
    return jsonify(response)

# Route to handle custom GPT interactions using user-defined prompts.
@app.route("/custom-gpt", methods=['POST'])
def custom_gpt_route():
    # Parse the JSON payload from the POST request.
    data = request.get_json()
    
    if not data:
        print(f'\n### ALERT: NO DATA - Custom GPT - {get_today_pst()} ###\n')

        # Return an error response if the JSON payload is missing.
        return jsonify({
            "status": 400,
            "message": "No JSON data found in request."
        }), 400
    
    # Extract the conversation transcript, user details, and custom prompts from the request data.
    transcript = data.get('transcript')
    user = data.get('user', {})
    user_prompts = data.get('user_prompts', {})
    
    # Process the custom GPT conversation using the provided data.
    new_transcript = customGPT(user_prompts, user, transcript)
    
    # Prepare the response containing status and both sent and updated transcript data.
    response = {
        "status": 200,
        "message": "GPT Cover Letter Writer Function",
        "sent_transcript": transcript,
        "sent_user": user,
        "returned_transcript": new_transcript
    }
    # print('\n Custom GPT Results: \n', '\n', response, '\n', '\n', get_today_pst(), '\n')
    return jsonify(response)

# Route to handle voice demonstration functionality.
@app.route("/voice-demo-init", methods=['POST'])
def voice_demo():
    # Check if the audio processing function is available before handling the request.
    if process_audio is None:
        print (jsonify({
            "status": 500,
            "message": "Audio processing function is not available.",
            "time": {get_today_pst()}
        }), 500)
        return jsonify({
            "status": 500,
            "message": "Audio processing function is not available."
        }), 500
    # Process the voice input using the process_audio function and return the result.
    print('\nALERT - PROCESS AUDIO: TRUE\n', get_today_pst() )
    return process_audio(request)

# Trained chat function to chat with the AI
@app.route('/trained-chat', methods=['POST'])
def chat_with_ai():
    # Check if the chat processing function is available before handling the request.
    if trainedChat is None:
        print (jsonify({
            "status": 500,
            "message": "Trained Chat function is not available.",
            "time": {get_today_pst()}
        }), 500)
        return jsonify({
            "status": 500,
            "message": "Trained Chat function is not available."
        }), 500
    # Process the chat input using the trainedChat function and return the result.
    print('\nALERT - PROCESS TRAINED CHAT: TRUE\n', get_today_pst() )
    return trainedChat(request)

# Error handling route for non existant routes
@app.errorhandler(404)
def page_not_found(e):
    print(f'''
            ALERT - USER TRY TO ACCESS: FALSE ROUTE 
            
            {e}
            
            {request}
        ''')
    return jsonify({
            "status": 404,
            "message": "The page you are trying to access does not exist"
        }), 404
    

if __name__ == '__main__':
    # Run the Flask application in debug mode (suitable only for development environments).
    app.run(debug=True)
