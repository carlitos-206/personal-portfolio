import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true 
});


let today_date_string = new Date().toLocaleDateString();


export const cover_letter_writer = async (transcript, user, data) =>{
    // data = {
    //     "message": ...<STRING>...,
    //     "returned_transcript":...[ '<STRINGS_ONLY>' ]...,
    //     "sent_transcript": ...[ '<STRINGS_ONLY>' ]...,
    //     "sent_user": {
    //         "email": ...<STRING>...,
    //         "firstName": ...<STRING>...,
    //         "lastName": ...<STRING>...
    //     },
    //     "status": 200 
    // }
    
    if(transcript.length === 0 && data === null){
        try {
            const init_response = await fetch(
                `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/cover-letter`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        transcript: transcript,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }
                    })
                }
            );
            
            const data = await init_response.json();
            console.log("Received from backend:", data);
            return data
        } catch (e) {
            console.error("Error while calling /cover-letter:", e);
        }
    }else{
        console.log('data: ', data, 'transcript', transcript)
    }
}

export const cover_letter_writer_2 = async(transcript, user) => {
    if(transcript.length === 0){
        const initial_chat = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `
                    Your task is to write a cover letter for a job application. 
                    Prompt the user to add resume and job description, 
                    Also validate the resume to ensure a match.
                    The user name is ${user.firstName}.
                    finally, only accept the job if the user is qualified.
                    and avoid asking the user to upload a file only paste the content.
                    Start by greeting the user, and say you are ready to help them with the task, 
                    your tone is of a friendly career coach. 
                    `,
                },
            ],
            model: 'gpt-4o-2024-05-13',
        })
        console.log(initial_chat)
        return initial_chat.choices[0].message.content;
    } 

    let message = [
        {
            role: 'system',
            content: `
                    Your task is to write a cover letter for a job application. 
                    Prompt the user to add resume and job description, 
                    Also validate the resume to ensure a match.
                    The user name is ${user.firstName}.
                    finally, only accept the job if the user is qualified.
                    and avoid asking the user to upload a file only paste the content.
                    todays date is ${today_date_string}
            `,
        },
    ]

    for (let i = 0; i < transcript.length; i++) {
        // every even index is the user
        if (i % 2 === 0) {
            message.push({
                role: 'system',
                content: transcript[i],
            })
        } else {
            message.push({
                role: 'user',
                content: transcript[i],
            })
        }
    }
    console.log(message)
    const chat = await openai.chat.completions.create({
        messages: message,
        model: 'gpt-4o-2024-05-13',
    })

    return chat.choices[0].message.content;
}



export const gpt_organizer = async (main_prompt, supporting_info, guardrails, image, audio) => {
    let messages = []
    if(main_prompt && supporting_info && guardrails && image && audio){
        messages = [
            {
                "role": "System",
                "content": `
                    
                `
            }
        ]
    }
    const main_prompt_builder = async() => {
        let gpt = await openai.completions.create({
            message: messages,
            model: 'gpt-4o-2024-05-13'
        })
        return gpt.choices[0].message.content;
    }



}



const getToken = async () => {
    let response = await fetch('http://127.0.0.1:8000/getToken/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        let data = await response.json();
        document.cookie = `csrftoken=${data.csrf}; path=/;`;
        const csrftoken = getCookie('csrftoken');
        return csrftoken;
    } else {
        console.error('HTTP Error:', response.status, response.statusText);
    }
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const django_test = async () => {
    let csrftoken = await getToken();
    if (csrftoken) {
        let response = await fetch('http://127.0.0.1:8000/react-test/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data);
        } else {
            console.error('HTTP Error:', response.status, response.statusText);
        }
    }
};
