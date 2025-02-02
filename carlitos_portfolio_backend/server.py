from flask import Flask, request, jsonify
from user_agent import generate_user_agent, generate_navigator
import json
app = Flask(__name__)

@app.route('/')
def index():
    return {
        'status': 200,
        'message': 'Server is online',
        'active': True
    }

@app.route('/simple-ua')
def simpleUA():
    user_agent = request.headers.get('User-Agent', 'Unknown')
    return jsonify(user_agent)

if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)