import React, { useState, useEffect } from 'react';
import './layout.css';
import BYO_CHAT from '../chat/page';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { django_test } from '../backend';

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

    const [service_gpt, setServiceGpt] = useState(false);
    const [service_whisper, setServiceWhisper] = useState(false);
    const [service_dalle, setServiceDalle] = useState(false);
    const [service_vision, setServiceVision] = useState(false);
    const [mainTask, setMainTask] = useState('');
    const [supportingInfo, setSupportingInfo] = useState('');
    const [guardrails, setGuardrails] = useState('');
    const [audio, setAudio] = useState('');
    const [image, setImage] = useState('');
    const [customBuild, setCustomBuild] = useState(false);


    const [returnToMain, setReturnToMain] = useState(false)
    useEffect(() => {
        if (coverLetter) {
            setChat(true);
            setUserTask('prebuilt');
        } else {
            setChat(false);
        }
    }, [coverLetter]);

    useEffect(() => {
        const gpt_main = document.querySelector('.byo-gpt-main');
        if (gpt_main) {
            gpt_main.style.alignItems = 'flex-start';
        }
    }, []);

    const userInfo = localStorage.getItem('gpt-builder');
    const user = JSON.parse(userInfo);

    const handleCoverLetterChange = () => {
        setCoverLetter(!coverLetter);
    };

    useEffect(() => {
        if(customBuild){
            let gpt_builder = {
                gpt:service_gpt, 
                whisper: service_whisper, 
                dalle:service_dalle, 
                vision:service_vision, 
                main:mainTask, 
                support_info:supportingInfo, 
                guardrails:guardrails, 
                audio: audio, 
                image: image, 
            };
            localStorage.setItem('gpt-builder-info', JSON.stringify(gpt_builder));

            setChat(true);
            setUserTask('custom');
        }


    }, [service_gpt, 
        service_whisper, 
        service_dalle, 
        service_vision, 
        mainTask, 
        supportingInfo, 
        guardrails, 
        audio, image, 
        customBuild]);

    
    const handleCustomBuild = async (e) => {
        e.preventDefault();
        setCustomBuild(!customBuild);

        let response = await django_test()
    };

    const handleReturnClick = () => {
        // Here we just call the callback passed from the parent
        onReturnToMain();
    }
    return (
        chat ? <BYO_CHAT task={userTask} /> :
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
                                label="The task you want GPT to accomplish"
                                multiline
                                rows={3}
                                variant="outlined"
                                onChange={(e) => setMainTask(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Supporting Information (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Any supporting information"
                                multiline
                                rows={3}
                                variant="outlined"
                                onChange={(e) => setSupportingInfo(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Guardrails (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Any limitations, and/or constraints"
                                multiline
                                rows={3}
                                variant="outlined"
                                onChange={(e) => setGuardrails(e.target.value)}
                            />
                        </div>
                        <div className='gpt-interface-demo-buttons-container'>
                            <button className="demo-buttons byo-interface-mobile" onClick={handleReturnClick}>Return</button>
                            <button className="demo-buttons byo-interface-mobile" onClick={(e)=>{handleCustomBuild(e)}}>Build</button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default BYO_GPT_INTERFACE;
