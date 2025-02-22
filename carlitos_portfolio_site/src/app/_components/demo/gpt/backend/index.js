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

        if(transcript.length === 0 && data === null){ // This ensures the initial call is done
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
                console.log(`
                        Cover Letter Response
                        ${data}
                    `)
                return data
            } catch (e) {
                console.error("Error while calling /cover-letter:", e);
            }
        }else{  // conversation exist
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
                console.log(`
                    Custom GPT Response
                    ${data}
                `)
                return data
            }catch(e){
                console.error("Error while calling /cover-letter:", e)
            }
        }
    }



    // Custom GPT 
    export const custom_gpt= async ( transcript, user, data, prompts) =>{
        if(transcript.length === 0 ){ // Initial call to context train gpt
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
                return data
            } catch (e) {
                console.error("Error while calling /custom-gpt:", e);
            }
        }else{ // gpt is trained
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
                return data
            }catch(e){
                console.error("Error while calling /custom-gpt:", e);
            }
            console.log('data: ', data, 'transcript', transcript)
        }
    }