import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI( 
    api_key=os.environ.get("OPENAI_API_KEY"),
)


def customGPT(user_prompts, user, transcript, ):
    main_prompt = None
    print(f'''
            \n 
                transcript: {transcript}
                transcript_length: {len(transcript)}

            \n
        ''')
    if len(transcript) == 0:
        if user_prompts.get('main') and user_prompts.get('support') and user_prompts.get('guardrail'):
            main_prompt  = f'''
                Your task is to be an assistant for {user['firstName']}.
                They have tasked you with: {user_prompts['main']}...
                These are provided details: {user_prompts['support'] }...
                These are some guardrails: {user_prompts['guardrail']}...
                Maintain your tone proffesional lean more towards corporate tone, 
                unless {user['firstName']} has said other wiser. 
                When responding, you will be interacting with {user['firstName']}, unless they say otherwise.
                Initiate the conversation with a greeting and prompt: {user['firstName']} with a question reguarding the task,
            '''
    if len(transcript) == 0 :
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = [
                {
                    "role": "developer", 
                    "content": main_prompt
                }
            ]
        )
        print(f'\n CHAT_INIT_RESPONSE: {response.choices[0].message.content} \n')
        return [response.choices[0].message.content]
    else:
        print("\n",'transcript-inside', transcript, "\n")
        script = [
                {
                    "role": "developer", 
                    "content": main_prompt
                }
            ]
        
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
                
        print(f'''
                \n Send of messages script: {script} \n
            ''')
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = script
        )
        
        print(response)
        
        script.append({
                    "role": "assistant",
                    "content": response.choices[0].message.content
                })
        script.pop(0)
        return script