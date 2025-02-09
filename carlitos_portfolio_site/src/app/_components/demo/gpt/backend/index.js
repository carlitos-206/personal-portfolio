/*
    This file holds the API calls to my backend flask server: 
    https://github.com/carlitos-206/personal-portfolio/tree/main/carlitos_portfolio_backend
*/


// GPT DEMO SECTION

    //Cover Letter Writer 
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
            try{
                const multi_response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/cover-letter`, {
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
                const data = await multi_response.json();
                console.log("Received from backend:", data);
                return data
            }catch(e){
                console.error(e)
            }
            console.log('data: ', data, 'transcript', transcript)
        }
    }



    // Custom GPT 
    export const custom_gpt= async ( transcript, user, data, prompts) =>{
        console.log(`
            \nCUSTOM GPT:
                main: ${prompts.main_task}
                support: ${prompts.support_task}
                guardrail:${prompts.guardrails_task }
            `)
        if(transcript.length === 0 ){
            try {
                const init_response = await fetch(
                    `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/custom-gpt`, 
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            transcript: transcript,
                            user_prompts:{
                                main: prompts.main_task,
                                support: prompts.support_task,
                                guardrail:prompts.guardrails_task                            ,
                            },
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
            try{
                const multi_response = await fetch(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/custom-gpt`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            transcript: transcript,
                            user_prompts:{
                                main: prompts.main_task,
                                support: prompts.support_task,
                                guardrail:prompts.guardrails_task                            ,
                            },
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            }
                        })
                    }
                );
                const data = await multi_response.json();
                console.log("Received from backend:", data);
                return data
            }catch(e){
                console.error(e)
            }
            console.log('data: ', data, 'transcript', transcript)
        }
    }