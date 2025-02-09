/*
    This file holds the logic and FE for User Agent demo section
*/

import React, { useEffect, useState } from 'react';

// This is the function that parses the User Agent
import { UserData } from './data_retriver/index.js';

// Firebase imports
import { db } from '../../GLOBAL/database/firebase';
import { collection, addDoc } from 'firebase/firestore';

import './layout.css';

const DataCollectionProject = () => {
    // State handlers
        // form values 
        const [agree, setAgree] = useState(false); // handles user agreeing to parsing their UA
        const [data, setData] = useState(null); // user data
        const [shareData, setShareData] = useState(false); // handles user agreeing to share data
        
    // This is handles the front end logic for when the data gets added and the demo over takes the screen
        useEffect(() => {
            
            if (data === null) return; 
            // elements to style
            let projectDataElement = document.querySelector('.data-project-main');
            let byo_gpt = document.querySelector('.byo-gpt-main');
            let agreeCheckbox = document.getElementById('agree-checkbox-data-project');
            let shareDataCheckbox = document.getElementById('sharedata-checkbox-data-project');
            
            if (data === false) { // when you return it holds the checkboxes
                agreeCheckbox.checked = true;
                shareDataCheckbox.checked = true;
            } else { // when the data exists it hides the gpt demo and streches the UA demo
                projectDataElement.style.height = '680px';
                byo_gpt.style.display = 'none';
            }

        }, [data]);

    // Ensures user agrees to share data and agrees that they understand only the UA will be parsed + firebase send off
        const demoValidation = async () => {
            if (agree && shareData) {
                const requestData = await UserData(); // UA call
                // ensures only sends original data
                if(data === null) {
                    // firebase send off
                    const docRef = await addDoc(collection(db, 'data_project'), {
                        browser: {
                            name: requestData.browser.name,
                            version: requestData.browser.version,
                            engine: {
                                name: requestData.browser.engine.name,
                                version: requestData.browser.engine.version
                            },
                            browserWindowWidth: requestData.browser.screenWidth,
                            browserWindowHeight: requestData.browser.screenHeight
                        },
                        device: {
                            type: requestData.device.type,
                            cpu_architecture: requestData.device.cpu_architecture,
                            model: requestData.device.model,
                            vendor: requestData.device.vendor,
                            os: {
                                name: requestData.device.os.name,
                                version: requestData.device.os.version
                            },
                            deviceScreenWidth: requestData.device.screenWidth,
                            deviceScreenHeight: requestData.device.screenHeight
                        },
                        date: new Date().toLocaleString("en-US", {  timeZone: "America/Los_Angeles"})
                    });
                }
                setData(requestData); // UA Data
            } else {
                alert('You need to agree to the conditions in order to proceed');
            }
        };
    
    // closes the demo
        const revertDemo = (e) => {
            e.preventDefault();
            let projectDataElement = document.querySelector('.data-project-main');
            projectDataElement.style.height = '325px';
            let byo_gpt = document.querySelector('.byo-gpt-main');
            byo_gpt.style.display = 'block';

            setData(false);

        };
    
    // holds the logic for opening links based on screen
        const openLinks = async (e, link) =>{
            e.preventDefault()
            let screenWidth = window.innerWidth
            if(screenWidth < 1300){
                switch (link) {
                    case 'ua-link':
                        window.location.href = "https://developer.mozilla.org/en-US/docs/Glossary/User_agent";
                        break;
                
                    default:
                        break;
                }
            }else{
                switch(link) {
                    case 'ua-link':
                        window.open(
                            "https://developer.mozilla.org/en-US/docs/Glossary/User_agent", 
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
        <div className='data-project-main live-demo-card'>
            {data ? (
                <>
                    <h1 className='data-project-title'>Data</h1>
                    <div className='data-project-form'>
                        <div className='data-project-data-container'>
                            <p className='data-project-result-text'>Browser: {' {'}</p>
                            <p className='data-project-result-text indent-data'>Name: {data.browser.name},</p>
                            <p className='data-project-result-text indent-data'>Version: {data.browser.version},</p>
                            <p className='data-project-result-text indent-data'>Engine: {' {'}</p>
                            <p className='data-project-result-text indent-data-2'>Name: {data.browser.engine.name},</p>
                            <p className='data-project-result-text indent-data-2'>Version: {data.browser.engine.version},</p>
                            <p className='data-project-result-text indent-data-2'>{'},'}</p>
                            <p className='data-project-result-text indent-data'>Window: {'{'}</p>
                            <p className='data-project-result-text indent-data-2'>Width: {data.browser.screenWidth},</p>
                            <p className='data-project-result-text indent-data-2'>Height: {data.browser.screenHeight},</p>
                            <p className='data-project-result-text indent-data-2'>{'},'}</p>
                            <p className='data-project-result-text'>{'};'}</p>
                            <p className='data-project-result-text'>Device: {'{'}</p>
                            <p className='data-project-result-text indent-data'>Type: {data.device.type},</p>
                            {data.device.cpu_architecture !== ' - ' && <p className='data-project-result-text indent-data'>CPU-Architecture: {data.device.cpu_architecture},</p>}
                            {data.device.model !== ' - ' && <p className='data-project-result-text indent-data'>Model: {data.device.model},</p>}
                            {data.device.vendor !== ' - ' && <p className='data-project-result-text indent-data'>Vendor: {data.device.vendor},</p>}
                            <p className='data-project-result-text indent-data'>OS: {' {'}</p>
                            <p className='data-project-result-text indent-data-2'>Name: {data.device.os.name},</p>
                            <p className='data-project-result-text indent-data-2'>Version: {data.device.os.version},</p>
                            <p className='data-project-result-text indent-data-2'>{'},'}</p>
                            <p className='data-project-result-text indent-data'>Screen: {' {'}</p>
                            <p className='data-project-result-text indent-data-2'>Width: {data.device.screenWidth},</p>
                            <p className='data-project-result-text indent-data-2'>Height: {data.device.screenHeight},</p>
                            <p className='data-project-result-text indent-data-2'>{'}'}</p>

                            <p className='data-project-result-text'>{'}'}</p>
                        </div>
                        <button className='project-data-buttons demo-buttons' onClick={(e) =>{ revertDemo(e) }}>Return</button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className='data-project-title'>User Device Data Demo</h1>
                    <div className='data-project-form'>
                        <p className='data-project-summary'>In this demo you will be able to see your device User Agent. This information pertains to your device hardware as well as the browser in which you are visting my site from, I have excluded from this demo any location information.</p>
                        <div className='data-project-checkboxes-container'>
                            <div className='data-project-checkbox-container'>
                                <input className="data-project-checkboxes" type="checkbox" id='agree-checkbox-data-project' onChange={() => setAgree(!agree)} />
                                <label htmlFor="agree-checkbox-data-project">I understand that ONLY the <span className='ua-link' onClick={(e)=>{openLinks(e, 'ua-link')}}>User Agent</span> is being used</label>
                            </div>
                            <div className='data-project-checkbox-container'>
                                <input className="data-project-checkboxes" type="checkbox" id='sharedata-checkbox-data-project' onChange={() => setShareData(!shareData)} />
                                <label htmlFor="sharedata-checkbox-data-project">I agree to share my data</label>
                            </div>
                        </div>
                        <button className='project-data-buttons demo-buttons' onClick={demoValidation}>View Data</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DataCollectionProject;
