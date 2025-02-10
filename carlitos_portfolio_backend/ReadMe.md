# Flask Server Setup

This project includes a Flask-based backend API.

## Getting Started

### Set Up Virtual Environment

It is recommended to use a virtual environment to manage dependencies. To create and activate a virtual environment, run:

```bash
# Create virtual environment CMD
python -m venv venv

# Create virtual enviroment macOS/Linux
python3 -m venv venv

# Activate on Windows
call venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate
```

### Install Dependencies

Ensure you have Python installed, then install the required dependencies:

```bash
pip install -r requirements.txt
```

### Run the Flask Server

To start the development server, run:

```bash
python server.py
```

The server will start on `http://127.0.0.1:5000/` by default.

## Project Structure

```
root/
│── server.py           # Main Flask application
│── requirements.txt    # Python dependencies
│── .env                # Environment variables
│── /gpt_demo           # Directory with GPT demo logic
│── /voice_demo         # Directory with Voice demo logic *This is private and not on repo*

```

## Features

- **CORS Support** using `Flask-CORS`.
- **Environment Variable Management** using `python-dotenv`.
- **RESTful API Endpoints** for handling various operations.
- **OpenAI Integration** for AI-powered functionalities.

## Environment Variables

Create a `.env` file in the root directory to store environment variables:

```
OPENAI_API_KEY=your_openai_key
```

## Learn More

For more details on Flask, check out the following resources:

- [Flask Documentation](https://flask.palletsprojects.com/) - Official Flask guide.
- [Flask GitHub Repository](https://github.com/pallets/flask) - Contribute to Flask development.
- [Flask Extensions](https://flask.palletsprojects.com/extensions/) - Enhance Flask with additional features.

---

### 🚀 Built with ❤️ using Flask

