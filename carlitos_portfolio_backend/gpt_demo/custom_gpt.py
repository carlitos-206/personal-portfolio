# This file implements the logic for building a custom ChatGPT conversation.

# Standard library imports
import os

# Third-party library imports
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from the .env file (e.g., API keys)
load_dotenv()

# Initialize the OpenAI client with credentials from environment variables
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def customGPT(user_prompts, user, transcript):
    # Debug: Print current transcript, its length, and the user prompts
    print(f'''
        transcript: {transcript}
        transcript_length: {len(transcript)}
        prompts: {user_prompts}
    ''')

    # Validate that the required keys exist in the user_prompts dictionary.
    # The keys 'main', 'support', and 'guardrail' are necessary to build the prompt.
    if not ('main' in user_prompts and 'support' in user_prompts and 'guardrail' in user_prompts):
        raise ValueError("Missing required user_prompts keys: 'main', 'support', and 'guardrail'.")

    # Construct the main prompt for GPT:
    # - It specifies that the assistant should help the user (by first name) with a given task.
    # - It incorporates the task description, supporting details, and guardrails.
    # - It also instructs the assistant to use a professional, corporate tone unless otherwise directed.
    # - Finally, it prompts the assistant to initiate the conversation with a greeting and a relevant question.
    main_prompt = f'''
        Your task is to be an assistant for {user['firstName']}.
        They have tasked you with: {user_prompts['main']}...
        These are provided details: {user_prompts['support']}...
        These are some guardrails: {user_prompts['guardrail']}...
        Maintain your tone professional and lean more towards a corporate tone,
        unless {user['firstName']} has said otherwise.
        When responding, you will be interacting with {user['firstName']}, unless they say otherwise.
        Initiate the conversation with a greeting and prompt: {user['firstName']} with a question regarding the task.
    '''

    # If there is no existing conversation (transcript is empty), start a new conversation.
    if len(transcript) == 0:
        # Send the main prompt to GPT to initiate the conversation.
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "developer",
                    "content": main_prompt
                }
            ]
        )
        # Debug: Print the initial GPT response.
        print(f'\nCHAT_INIT_RESPONSE: {response.choices[0].message.content}\n')
        # Return the initial response as a list.
        return [response.choices[0].message.content]
    else:
        # Build the conversation history starting with the main prompt.
        script = [
            {
                "role": "developer",
                "content": main_prompt
            }
        ]
        
        # Append each message from the transcript.
        # Even-indexed messages are from the user, and odd-indexed messages are from the assistant.
        for i, message in enumerate(transcript):
            role = "user" if i % 2 == 0 else "assistant"
            script.append({
                "role": role,
                "content": message
            })
                
        # Debug: Print the assembled message history that will be sent to GPT.
        print(f'\nSend of messages script: {script}\n')
        
        # Send the complete conversation history to GPT to get the next response.
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=script
        )
        
        # Debug: Print the raw GPT response.
        print(response)
        
        # Append the new GPT-generated assistant message to the conversation history.
        script.append({
            "role": "assistant",
            "content": response.choices[0].message.content
        })
        # Remove the initial developer prompt from the history before returning,
        # to prevent internal instructions from being exposed to the front end.
        script.pop(0)
        return script
