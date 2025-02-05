import os
from openai import OpenAI

openai_client = OpenAI( 
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def gpt_cover_letter_writer(transcript, user):
    print(f'The value of VARIABLE_NAME is:{os.environ.get("OPENAI_API_KEY")}')
    init_prompt = f'''
            Your task is to write a cover letter for a job application. 
            Prompt the user to add their resume and a job description, 
            Also validate the resume to ensure a match.
            The user name is {user.firstName}.
            finally, only accept the job if the user is qualified.
            and avoid asking the user to upload a file only paste the content.
            Start by greeting the user, and say you are ready to help them with the task, 
            your tone is of a friendly career coach. 
        '''
    if transcript.length == 0 :
        response = openai_client.chat.completions.create(
            model = "gpt-4o",
            messages = [
                {
                    "role": "developer", 
                    "content": init_prompt
                }
            ]
        )
        return response.choices[0].message