import os
from openai import OpenAI

os.environ['openai_client'] = OpenAI( 
    api_key=os.environ.get("OPENAI_API_KEY"),
)
