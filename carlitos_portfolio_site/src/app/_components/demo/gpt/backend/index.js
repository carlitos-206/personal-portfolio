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
