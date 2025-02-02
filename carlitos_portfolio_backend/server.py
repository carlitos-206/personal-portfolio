from flask import Flask, request, jsonify
from user_agent import generate_user_agent, generate_navigator
from user_agents import parse
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
    # Generate a user agent string, then parse it
    ua_item = parse(generate_user_agent())
    
    # Convert `ua_item` into a serializable dictionary
    ua_data = {
        'browser_family': ua_item.browser.family,
        'browser_version': ua_item.browser.version_string,
        'os_family': ua_item.os.family,
        'os_version': ua_item.os.version_string,
        'device_family': ua_item.device.family,
        'device_brand': ua_item.device.brand,
        'device_model': ua_item.device.model,
    }
    
    return jsonify(ua_data)


if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)