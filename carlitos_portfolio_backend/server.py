from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from gpt_demo.prebuilt_cv_letter import gpt_cover_letter_writer
from gpt_demo.custom_gpt import customGPT

from voice.audio_process import process_audio

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
        prompts = {user_prompts}
        
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

@app.route("/voice-demo", methods=['POST'])
def voice_demo():
    # First, check that the process_audio function is available.
    if process_audio is None:
        return jsonify({
            "status": 500,
            "message": "Audio processing function is not available."
        }), 500

    # Check if an audio file is provided in the request
    if 'audio_file' not in request.files:
        return jsonify({
            "status": 400,
            "message": "No audio file provided in request."
        }), 400

    audio_file = request.files['audio_file']
    
    # Check if a file was selected
    if audio_file.filename == '':
        return jsonify({
            "status": 400,
            "message": "No file selected."
        }), 400

    # Check for the new parameter "audio_param" in the form data.
    # This parameter can be used to pass additional processing options.
    audio_param = request.form.get('audio_param')
    if not audio_param:
        return jsonify({
            "status": 400,
            "message": "Missing required parameter: audio_param."
        }), 400

    try:
        # Process the audio file using the provided parameter.
        # (Assumes your process_audio function accepts a second parameter.)
        transcript = process_audio(audio_file, audio_param)
        return jsonify({
            "status": 200,
            "message": "Audio processed successfully.",
            "transcript": transcript
        })
    except Exception as e:
        return jsonify({
            "status": 500,
            "message": f"Error processing audio: {str(e)}"
        }), 500
if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)