import React, { useEffect, useState } from 'react';
import './layout.css';
import { UserData } from './data_retriver/index.js';

// import {db} from '../../../database/firebaseConnection';
// import { collection, addDoc } from 'firebase/firestore';
const DataCollectionProject = () => {
    const [agree, setAgree] = useState(false);
    const [data, setData] = useState(null);
    const [shareData, setShareData] = useState(false);

    useEffect(() => {
        if (data === null) return;

        let projectDataElement = document.querySelector('.data-project-main');
        // let byo_gpt = document.querySelector('.byo-gpt-main');
        let agreeCheckbox = document.getElementById('agree-checkbox-data-project');
        let shareDataCheckbox = document.getElementById('sharedata-checkbox-data-project');
        if (data === false) {
            projectDataElement.style.display = 'flex';
            projectDataElement.style.height = '325px';
            // byo_gpt.style.display = 'flex';
            agreeCheckbox.checked = true;
            shareDataCheckbox.checked = true;
        } else {
            projectDataElement.style.height = '680px';
            // byo_gpt.style.display = 'none';
        }

        console.log('data', data);
    }, [data]);

    const demoValidation = async () => {
        if (agree && shareData) {
            const requestData = await UserData();
            // if(data === null) {
            //     const docRef = await addDoc(collection(db, 'data_project'), {
            //         browser: {
            //             name: requestData.browser.name,
            //             version: requestData.browser.version,
            //             engine: {
            //                 name: requestData.browser.engine.name,
            //                 version: requestData.browser.engine.version
            //             },
            //             screenWidth: requestData.browser.screenWidth,
            //             screenHeight: requestData.browser.screenHeight
            //         },
            //         device: {
            //             type: requestData.device.type,
            //             cpu_architecture: requestData.device.cpu_architecture,
            //             model: requestData.device.model,
            //             vendor: requestData.device.vendor,
            //             os: {
            //                 name: requestData.device.os.name,
            //                 version: requestData.device.os.version
            //             },
            //             screenWidth: requestData.device.screenWidth,
            //             screenHeight: requestData.device.screenHeight
            //         },
            //         date: new Date().toLocaleString()
            //     });
            // }
            setData(requestData);
        } else {
            alert('Please read the agreement and check the box to share your data');
        }
    };
    const revertDemo = (e) => {
        e.preventDefault();
        setData(false);

    };
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
                    <h1 className='data-project-title'>Browser Data Collection</h1>
                    <div className='data-project-form'>
                        <p>Summary: This is a live demo for <span>Browser Data Collection</span>, this project allows the collection of data (requests device user-agent and device location) from incoming request in Python and JavaScript</p>
                        <p>Read Agreement</p>
                        <div className='data-project-checkboxes-container'>
                            <div className='data-project-checkbox-container'>
                                <input type="checkbox" id='agree-checkbox-data-project' onChange={() => setAgree(!agree)} />
                                <label htmlFor="agree-checkbox-data-project">I have read the agreement</label>
                            </div>
                            <div className='data-project-checkbox-container'>
                                <input type="checkbox" id='sharedata-checkbox-data-project' onChange={() => setShareData(!shareData)} />
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
