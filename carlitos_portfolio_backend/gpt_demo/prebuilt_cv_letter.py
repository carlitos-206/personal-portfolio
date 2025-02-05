import os
from openai import OpenAI

client = OpenAI( 
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def gpt_cover_letter_writer(transcript, user):
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
    if len(transcript) == 0 :
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = [
                {
                    "role": "developer", 
                    "content": init_prompt
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
                    "content": init_prompt
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
        
        script.append(response.choices[0].message.content)
        
        return script