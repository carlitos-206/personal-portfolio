/*
    This file contains the Interface Component, for Custom GPT
    
    REF Cycle: "./gpt/page.js(*ROOT*)" <-> "./gpt/interface/page.js"(*YOU ARE HERE*) <-> "./gpt/chat/page.js"
*/ 

'use clien'
import React, { useState, useEffect } from 'react';

// Custom components
import BYO_CHAT from '../chat/page';

// Material UI imports
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

//
import { isServerOnlineChecker } from '../../../GLOBAL/functions/checkServer';
import './layout.css';

// MUI styles
const InputField = styled(TextField)({
    '& label': {
        color: '#ffffff',
    },
    '& .MuiInputBase-input': {
        color: '#ffffff',
    },
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& .MuiFormHelperText-root': {
        color: '#ffffff',
    },
});

const BYO_GPT_INTERFACE = ({ onReturnToMain }) => {
    // State handlers
        const [coverLetter, setCoverLetter] = useState(false); // handles if user wants to use cover letter
        const [chat, setChat] = useState(false); // handles showing chat component
        const [userTask, setUserTask] = useState(''); // handles propegating the task the user wants: prebuilt or custom

        // handlers for custom gpt prompt + error handler
        const [mainTask, setMainTask] = useState("")
        const [error_mainTask, setError_mainTask] = useState(false)
        const [error_mainTask_text, setError_mainTask_text] = useState(false)

        const [supportTask, setSupportTask] = useState("")
        const [error_supportTask, setError_supportTask] = useState(false)
        const [error_supportTask_text, setError_supportTask_text] = useState(false)

        const [guardrailsTask, setGuardrailsTask] = useState("")
        const [error_guardrailsTask_text, setError_guardrailsTask_text] = useState(false)
        const [error_guardrailsTask, setError_guardrailsTask] = useState(false)

        const [isServerOnline, setIsServerOnline] = useState(true)
        const [isLoading, setIsLoading] = useState(false)
    // User info retrival 
        const userInfo = localStorage.getItem('gpt-builder');
        const user = JSON.parse(userInfo);

    // handles checking if server is online 
        
        const checkServer = async (e) =>{
            const server = localStorage.getItem('server-status')
            if(server !== null ){    
                setIsServerOnline(JSON.parse(server))
            }
            setIsLoading(true)
            const retry = await isServerOnlineChecker()
            localStorage.setItem('server-status', retry)
            setIsServerOnline(JSON.parse(retry))
            if(retry !== 'true'){
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }else{

                setIsLoading(false)
            }
        }
        useEffect(()=>{
            checkServer()
        },[])
    
    // handles fliping to <BYO_CHAT /> for cover letter option
        useEffect(() => {
            if (coverLetter) {
                setChat(true);
                setUserTask('prebuilt');
            } else {
                setChat(false);
            }
        }, [coverLetter]);
    
    // handles building the custom prompt, validating and sending it to backend 
        const handleCustomBuild = async (e, main, support, guardrails) => {
            e.preventDefault();
            // initiates as error free for resubmission and new validation
            let hasError = false
            // edge case: user changes mind of guardrails and wants to keep it empty
            if(!guardrails){
                setError_guardrailsTask(false)
                setError_guardrailsTask_text('')
            }
            // guardrail exist and it must be at least 15 char
            if(guardrails && guardrails.length > 0 && guardrails.length < 15){
                setError_guardrailsTask(true)
                setError_guardrailsTask_text('Please provide a longer guardrail for better context')
                hasError = true
            }
            // edge case: user changes mind of support and wants to keep it empty
            if(!support){
                setError_supportTask(false)
                setError_supportTask_text("")
            }
            // support exist and it must be at least 15 char
            if(support && 0 < support.length && support.length < 15){
                setError_supportTask(true)
                setError_supportTask_text("Please provide more information to best assist you")
                hasError = true 
            }
            // main is empty
            if (!main || main.trim().length === 0) {
                setError_mainTask(true);
                setError_mainTask_text("Please provide details for the main task");
                hasError = true;
            }
            // main is too short
            if (main.trim().length < 115) {
                // main is present but too short
                setError_mainTask(true);
                setError_mainTask_text("Please write more details about the task");
                hasError = true;
            }
            // all validation passed
            if(!hasError){
                // prompt builder
                let data = {
                    main_task : main,
                    support_task: support,
                    guardrails_task: guardrails
                }

                localStorage.setItem('prompts', JSON.stringify(data)) // saves a local back up
                // clears all errors and resets fields
                setError_supportTask(false)
                setError_supportTask_text("")
                setError_guardrailsTask(false)
                setError_guardrailsTask_text('')
                setError_mainTask(false);
                setError_mainTask_text("");
                setMainTask("")
                setSupportTask("")
                setGuardrailsTask("")

                // shows chat
                setChat(true);
                // sets task
                setUserTask('custom');

            }


        };
    const handleTutorialLink = async(e, route)=>{
        let screen = window.innerWidth
        if(screen < 1300){
            switch (route) {
                case 'letter':
                    window.location.href = "https://www.youtube.com/watch?v=dwrlevpwWpc";
                    break;
                case 'custom':
                    window.location.href = "https://www.youtube.com/watch?v=gYqma0kj-eE";

                break;
                default:
                    break;
            }
        }else{
            switch (route) {
                case 'letter':
                    window.open(
                        "https://www.youtube.com/watch?v=dwrlevpwWpc", 
                        "myPopup", 
                        "top=25,left=50,width=900,height=900",
                    )
                    break;
                case 'custom':
                    window.open(
                        "https://www.youtube.com/watch?v=gYqma0kj-eE", 
                        "myPopup", 
                        "top=25,left=50,width=900,height=900",
                    )
                break;
                default:
                    break;
            }
        }
    }
    return (
        isServerOnline ? (
        chat ? <BYO_CHAT task={userTask}  onReturnToMain={onReturnToMain} /> :
            <div className="byo-gpt-interface-container">
                <div className="byo-gpt-interface-title">
                    <h1>Hi, {user?.firstName}!</h1>
                    <div className='gpt-interface-demo-buttons-container'>
                        <p
                           className='gpt-tutorial-links'
                           onClick={(e)=>{handleTutorialLink(e, 'letter')}}
                        >
                            Cover Letter Tutorial Video
                        </p> 
                        <p 
                            className='gpt-tutorial-links'
                            onClick={(e)=>{handleTutorialLink(e, 'custom')}}
                        >
                            Custom GPT Tutorial Video
                        </p>
                    </div>
                </div>
                <div className="byo-gpt-contianer-pre-demo-container">
                    <p>Prebuilt Demo: </p>
                    <div className="byo-gpt-contianer-pre-demo-options">
                        <input type="checkbox" style={{cursor:'pointer'}} onChange={(e)=>{setCoverLetter(!coverLetter);}
} checked={coverLetter} />
                        <p>Cover Letter Writer</p>
                    </div>
                </div>
                <div className="byo-gpt-contianer-demo-custom">
                    <div className="byo-gpt-contianer-demo-custom-builder">
                        <div className="byo-gpt-contianer-demo-custom-fields">
                            <p className='byo-gpt-custom-build-labels'>Custom Main Task</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Write task you want GPT to accomplish"
                                multiline
                                value={mainTask}
                                rows={3}
                                variant="outlined"
                                error={error_mainTask}
                                helperText={error_mainTask_text}
                                onChange={(e) => setMainTask(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Supporting Information (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Write any supporting information"
                                multiline
                                value={supportTask}
                                rows={3}
                                variant="outlined"
                                error={error_supportTask}
                                helperText={error_supportTask_text}
                                onChange={(e) => setSupportTask(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Guardrails (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Write any limitations, and/or constraints"
                                multiline
                                value={guardrailsTask}
                                rows={3}
                                variant="outlined"
                                error={error_guardrailsTask}
                                helperText={error_guardrailsTask_text}
                                onChange={(e) => setGuardrailsTask(e.target.value)}
                            />
                        </div>
                        <div className='gpt-interface-demo-buttons-container'>
                            <button className="demo-buttons byo-interface-mobile" onClick={onReturnToMain}>Return</button>
                            <button className="demo-buttons byo-interface-mobile" onClick={(e)=>{handleCustomBuild(e, mainTask, supportTask, guardrailsTask)}}>Build</button>
                        </div>
                    </div>
                </div>
            </div> ):(
                <div className="byo-gpt-interface-container">
                    <div className="byo-gpt-interface-404-container">
                        <h1 className="gpt-title-text">Custom Chat GPT Builder</h1>
                        <h1>Hi,</h1>
                        <br/>
                        <h3>My server is currently offline. Please click “Retry” to see if it becomes available again. If it remains unresponsive, feel free to explore my user agent demo, which relies on client-side functionality. Should you need additional help or prefer a more personalized walkthrough, don’t hesitate to contact me to schedule a demo. Thank you for your patience and understanding.</h3>
                        <br/>                        
                        <div className='gpt-interface-demo-buttons-container'>
                                <button className="demo-buttons byo-interface-mobile" onClick={onReturnToMain}>Exit</button>
                                <button 
                                    className="demo-buttons byo-interface-mobile" 
                                    onClick={(e)=>{checkServer(e)}}
                                    disabled = {isLoading}
                                    >
                                    {isLoading ? 'Checking server ...': 'Retry'}
                                </button>
                                <button className="demo-buttons byo-interface-mobile" onClick={(e)=>{handleCustomBuild(e, mainTask, supportTask, guardrailsTask)}}>Contact Me</button>

                        </div>
                    </div>
                </div>
            ) 
    );
};

export default BYO_GPT_INTERFACE;
