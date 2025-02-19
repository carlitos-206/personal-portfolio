# This file implements the logic for generating a GPT-powered cover letter for job applications.

# Standard library imports
import os

# Third-party library imports
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Initialize the OpenAI client using the API key stored in environment variables
client = OpenAI( 
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def gpt_cover_letter_writer(transcript, user):
    # Define the initial prompt that instructs GPT on how to generate a cover letter.
    # The prompt includes directions to ask for a resume and job description,
    # validate the resume against the job description, and ensure that the user is qualified.
    # It also sets a friendly, career-coach tone for the conversation.
    init_prompt = f'''
            Your task is to write a cover letter for a job application. 
            Prompt the user to add their resume and a job description, 
            Also validate the resume to ensure a match.
            The user name is {user['firstName']}.
            finally, only accept the job if the user is qualified.
            and avoid asking the user to upload a file only paste the content.
            Start by greeting the user, and say you are ready to help them with the task, 
            your tone is of a friendly career coach. 
        '''
    # Start a new conversation if there is no previous transcript.
    if len(transcript) == 0:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "developer", 
                    "content": init_prompt
                }
            ]
        )
        # Log the initial response from GPT and return it as a list.
        return [response.choices[0].message.content]
    # Continue an existing conversation if a transcript already exists.
    else:
        # Initialize the conversation history with the internal system prompt.
        script = [
            {
                "role": "developer", 
                "content": init_prompt
            }
        ]
        
        # Reconstruct the conversation history by alternating roles:
        # even-indexed messages are from the user and odd-indexed messages are from the assistant.
        for i in range(len(transcript)):
            if i % 2 == 0:    
                script.append({
                    "role": "user",
                    "content": transcript[i]
                })
            else:
                script.append({
                    "role": "assistant",
                    "content": transcript[i]
                })
                

        
        # Send the complete conversation history to GPT for generating the next response.
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=script
        )
                
        # Append the latest assistant response to the conversation history.
        script.append({
            "role": "assistant",
            "content": response.choices[0].message.content
        })
        
        # Remove the initial developer prompt from the history to prevent internal instructions from being exposed.
        script.pop(0)
        return script
