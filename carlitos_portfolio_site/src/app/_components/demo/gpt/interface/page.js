import React, { useState, useEffect } from 'react';
import './layout.css';
import BYO_CHAT from '../chat/page';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { custom_gpt } from '../backend';

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
    const [coverLetter, setCoverLetter] = useState(false);
    const [chat, setChat] = useState(false);
    const [userTask, setUserTask] = useState('');


    const [mainTask, setMainTask] = useState("")
    const [error_mainTask, setError_mainTask] = useState(false)
    const [error_mainTask_text, setError_mainTask_text] = useState(false)
    
    const [supportTask, setSupportTask] = useState("")
    const [error_supportTask, setError_supportTask] = useState(false)
    const [error_supportTask_text, setError_supportTask_text] = useState(false)

    const [guardrailsTask, setGuardrailsTask] = useState("")
    const [error_guardrailsTask_text, setError_guardrailsTask_text] = useState(false)
    const [error_guardrailsTask, setError_guardrailsTask] = useState(false)



    useEffect(() => {
        if (coverLetter) {
            setChat(true);
            setUserTask('prebuilt');
        } else {
            setChat(false);
        }
    }, [coverLetter]);


    const userInfo = localStorage.getItem('gpt-builder');
    const user = JSON.parse(userInfo);

    const handleCoverLetterChange = () => {
        setCoverLetter(!coverLetter);
    };
    
    const handleCustomBuild = async (e, main, support, guardrails) => {
        e.preventDefault();
        let hasError = false
        if(!guardrails){
            setError_guardrailsTask(false)
            setError_guardrailsTask_text('')
        }
        if(guardrails && guardrails.length > 0 && guardrails.length < 15){
            setError_guardrailsTask(true)
            setError_guardrailsTask_text('Please provide a longer guardrail for better context')
            hasError = true
        }
        if(!support){
            setError_supportTask(false)
            setError_supportTask_text("")
        }
        if(support && 0 < support.length && support.length < 15){
            setError_supportTask(true)
            setError_supportTask_text("Please provide more information to best assist you")
            hasError = true 
        }
        if (!main || main.trim().length === 0) {
            // main is empty
            setError_mainTask(true);
            setError_mainTask_text("Please provide details for the main task");
            hasError = true;
          } 
          if (main.trim().length < 115) {
            // main is present but too short
            setError_mainTask(true);
            setError_mainTask_text("Please write more details about the task");
            hasError = true;
          }
        if(!hasError){
            let data = {
                main_task : main,
                support_task: support,
                guardrails_task: guardrails
            }
            
            localStorage.setItem('prompts', JSON.stringify(data))
            setError_supportTask(false)
            setError_supportTask_text("")
            setError_guardrailsTask(false)
            setError_guardrailsTask_text('')
            setError_mainTask(false);
            setError_mainTask_text("");
            setMainTask("")
            setSupportTask("")
            setGuardrailsTask("")
            
            setChat(true);
            setUserTask('custom');

        }


    };

    return (
        chat ? <BYO_CHAT task={userTask}  onReturnToMain={onReturnToMain} /> :
            <div className="byo-gpt-interface-container">
                <div className="byo-gpt-interface-title">
                    <h1>Hi, {user?.firstName}!</h1>
                    <p>Watch Tutorial Video</p>
                </div>
                <div className="byo-gpt-contianer-pre-demo-container">
                    <p>Prebuilt Demo: </p>
                    <div className="byo-gpt-contianer-pre-demo-options">
                        <input type="checkbox" style={{cursor:'pointer'}} onChange={handleCoverLetterChange} checked={coverLetter} />
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
            </div>
    );
};

export default BYO_GPT_INTERFACE;
