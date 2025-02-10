import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def customGPT(user_prompts, user, transcript):
    print(f'''
        transcript: {transcript}
        transcript_length: {len(transcript)}
        prompts: {user_prompts}
    ''')

    # Ensure all required keys exist, regardless of whether their values are empty.
    if not ('main' in user_prompts and 'support' in user_prompts and 'guardrail' in user_prompts):
        raise ValueError("Missing required user_prompts keys: 'main', 'support', and 'guardrail'.")

    # Compute the main prompt regardless of the transcript length.
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

    if len(transcript) == 0:
        # Start a new conversation using the main prompt.
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "developer",
                    "content": main_prompt
                }
            ]
        )
        print(f'\nCHAT_INIT_RESPONSE: {response.choices[0].message.content}\n')
        return [response.choices[0].message.content]
    else:
        # Build conversation history starting with the initial main prompt.
        script = [
            {
                "role": "developer",
                "content": main_prompt
            }
        ]
        
        # Append the transcript messages alternating between 'user' and 'assistant'.
        for i, message in enumerate(transcript):
            role = "user" if i % 2 == 0 else "assistant"
            script.append({
                "role": role,
                "content": message
            })
                
        print(f'\nSend of messages script: {script}\n')
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=script
        )
        
        print(response)
        
        # Append the new assistant message to the script.
        script.append({
            "role": "assistant",
            "content": response.choices[0].message.content
        })
        # Optionally remove the main prompt from the conversation history before returning.
        script.pop(0)
        return script
