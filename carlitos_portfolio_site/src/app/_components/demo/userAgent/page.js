"use client";
import React, { useEffect, useState } from 'react';
import './layout.css';
import { isServerOnline } from '../../GLOBAL/checkServer';
// import { UserData } from './data_retriver/index.js';

const DataCollectionProject = () => {
    const [agree, setAgree] = useState(false);
    const [data, setData] = useState(null);
    const [shareData, setShareData] = useState(false);

    // Effect to handle UI changes after data is retrieved or reverted
    useEffect(() => {
        if (data === null) return;
            const projectDataElement = document.querySelector('.data-project-main');
            // const byo_gpt = document.querySelector('.byo-gpt-main');
            const agreeCheckbox = document.getElementById('agree-checkbox-data-project');
            const shareDataCheckbox = document.getElementById('sharedata-checkbox-data-project');

        if (data === false) {
            // "Reverted" data - restore minimal UI
            projectDataElement.style.display = 'flex';
            projectDataElement.style.height = '325px';
            // if (byo_gpt) byo_gpt.style.display = 'flex';
            agreeCheckbox.checked = true;
            shareDataCheckbox.checked = true;
        } else {
            // Data is now some object
            projectDataElement.style.height = '680px';
            // if (byo_gpt) byo_gpt.style.display = 'none';
        }
    }, [data]);

    // Check user agreement and server status; retrieve data if possible
    const demoValidation = async () => {
        if (!agree || !shareData) {
            alert('Please read the agreement and check the box to share your data');
            return;
        }

    // Check if the server is active
    const isServerActive = await isServerOnline();
    console.log(`isServerActive: ${isServerActive}`)
        if (!isServerActive) {
            alert('Server is offline, contact me for support');
            return;
        }

        // If we’ve never retrieved data yet, do so
        if (data === null) {
            try {
                // const requestData = await UserData(); // External function to fetch user data
                // setData(requestDat    a);
                
                // Temporary placeholder
                const placeholderData = {
                    message: 'Server is active! Your data can be collected.'
                };
                setData(placeholderData);
            } catch (err) {
                console.error('Error retrieving data:', err);
                alert('An error occurred while collecting your data.');
            }
        }
    };
    
    // Revert the UI back to "null" state
    const revertDemo = (e) => {
        e.preventDefault();
        setData(false);
    };

    return (
        <div className='data-project-main live-demo-card'>
            {data ? (
                <div className='data-render-container'>
                    <h1 className='data-project-title'>Data</h1>
                    <div className='data-project-form'>
                        <div className='data-project-data-container'>
                            {/* 
                                Display data in any format you want. 
                                Adjust below if you have a more complex object. 
                            */}
                            <p className='data-project-result-text'>
                                {JSON.stringify(data, null, 2)}
                            </p>
                        </div>
                        <button
                            className='project-data-buttons demo-buttons'
                            onClick={revertDemo}
                        >
                            Return
                        </button>
                    </div>
                </div>
            ) : (
            <section className='data-project-container'>
                <h1 className='data-project-title'>User Data Collection Demo</h1>
                <div className='data-project-form'>
                    <p>
                        I'm crafted a Flask demo to reveal your user agent info with a button click! 
                        No personal or location data is collected only the device user agent.
                    </p>
                    <p>Read Agreement</p>
                    <div className='data-project-checkboxes-container'>
                        <div className='data-project-checkbox-container'>
                            <input
                                className="data-project-checkbox"
                                type="checkbox"
                                id='agree-checkbox-data-project'
                                onChange={() => setAgree(!agree)}
                            />
                            <label htmlFor="agree-checkbox-data-project">
                                I have read the agreement
                            </label>
                        </div>
                        <div className='data-project-checkbox-container'>
                            <input
                                className="data-project-checkbox"
                                type="checkbox"
                                id='sharedata-checkbox-data-project'
                                onChange={() => setShareData(!shareData)}
                            />
                            <label htmlFor="sharedata-checkbox-data-project">
                                I agree to share my data
                            </label>
                        </div>
                    </div>
                    <button
                        className='project-data-buttons demo-buttons'
                        onClick={demoValidation}
                    >
                        View Data
                    </button>
                </div>
            </section>
        )}
      </div>
    );
};

export default DataCollectionProject;
