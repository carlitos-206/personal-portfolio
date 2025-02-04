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

const BYO_GPT_INTERFACE = () => {
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


    return (
        chat ? <BYO_CHAT task={userTask} /> :
            <div className="byo-gpt-interface-container">
                <div className="byo-gpt-interface-title">
                    <h1>Welcome {user?.firstName}</h1>
                    <p>Watch how to video</p>
                </div>
                <div className="byo-gpt-contianer-pre-demo-container">
                    <p>Prebuilt Demo: </p>
                    <div className="byo-gpt-contianer-pre-demo-options">
                        <input type="checkbox" style={{cursor:'pointer'}} onChange={handleCoverLetterChange} checked={coverLetter} />
                        <p>Cover Letter Writer</p>
                    </div>
                </div>
                <div className="byo-gpt-contianer-demo-custom">
                    <h1>Build </h1>
                    <div className="byo-gpt-contianer-demo-custom-builder">
                        {/* <div className="byo-gpt-contianer-demo-custom-services">
                            <p>Select Services: </p>
                            <div className="byo-gpt-contianer-demo-custom-options">
                                <input type="checkbox" style={{cursor:'pointer'}} 
                                    onChange={(e)=>{setServiceGpt(!service_gpt)}} />
                                <p>Chat-GPT 4</p>
                            </div>
                            <div className="byo-gpt-contianer-demo-custom-options">
                                <input type="checkbox" style={{cursor:'pointer'}}
                                    onChange={(e)=>{setServiceWhisper(!service_whisper)}}
                                />
                                <p>Whisper Ai</p>
                            </div>
                            <div className="byo-gpt-contianer-demo-custom-options">
                                <input type="checkbox" style={{cursor:'pointer'}}
                                    onChange={(e)=>{setServiceDalle(!service_dalle)}}
                                />
                                <p>Dall-E</p>
                            </div>
                            <div className="byo-gpt-contianer-demo-custom-options">
                                <input type="checkbox" style={{cursor:'pointer'}}
                                    onChange={(e)=>{setServiceVision(!service_vision)}}
                                />
                                <p>Vision</p>
                            </div>
                        </div> */}
                        <div className="byo-gpt-contianer-demo-custom-fields">
                            <p className='byo-gpt-custom-build-labels'>Main Task</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Write the main task you want to accomplish"
                                multiline
                                rows={3}
                                cols={10}
                                variant="outlined"
                                onChange={(e) => setMainTask(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Supporting Information (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Add supporting information, context, and/or data"
                                multiline
                                rows={3}
                                cols={10}
                                variant="outlined"
                                onChange={(e) => setSupportingInfo(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Guardrails (optional)</p>
                            <InputField
                                className="byo-gpt-contianer-demo-custom-fields-input"
                                label="Add guardrails, limitations, and/or constraints"
                                multiline
                                rows={3}
                                cols={10}
                                variant="outlined"
                                onChange={(e) => setGuardrails(e.target.value)}
                            />
                            <p className='byo-gpt-custom-build-labels'>Supporting Files (optional)</p>
                            <div>
                                <label htmlFor="audio_files">Upload Audio: </label>
                                <input type="file" name="audio_files" id="audio_files"
                                    onChange={(e) => setAudio(e.target.files)}
                                />
                            </div>
                            <div>
                                <label htmlFor="image_files">Upload Image: </label>
                                <input type="file" name="image_files" id="image_files" 
                                    onChange={(e) => setImage(e.target.files)}
                                />
                            </div>
                            <div>
                                <p>Demo limitations: Does not support video input or output</p>
                            </div>
                        </div>
                        <button className="gpt-submit-build-button" onClick={(e)=>{handleCustomBuild(e)}}>Build</button>
                    </div>
                </div>
            </div>
    );
};

export default BYO_GPT_INTERFACE;
