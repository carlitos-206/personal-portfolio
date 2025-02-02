from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello, Flask!"

if __name__ == '__main__':
    # Use `debug=True` only in development
    app.run(debug=True)