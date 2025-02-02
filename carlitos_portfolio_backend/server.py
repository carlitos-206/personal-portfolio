from flask import Flask, request, jsonify
from user_agent import generate_user_agent, generate_navigator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    response = {
        "status": 200,
        "message": "Successful connection to backend"
    }
    return jsonify(response)

@app.route('/simple-ua')
def simpleUA():
    user_agent = request.headers.get('User-Agent', 'Unknown')
    return jsonify(user_agent)

if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)