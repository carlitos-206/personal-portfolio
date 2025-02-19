/*
    This file contains the init form Component, for Custom GPT
    
    REF Cycle: "./gpt/page.js(*ROOT*)(*YOU ARE HERE*)" <-> "./gpt/interface/page.js" <-> "./gpt/chat/page.js"
*/ 

'use client'
import React, {useEffect, useState} from "react";

// Custom components
import BYO_GPT_INTERFACE from "./interface/page";

// Firebase imports
import { db } from "../../GLOBAL/database/firebase";
import { collection, addDoc } from 'firebase/firestore';

// Material UI imports
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import "./layout.css";

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


const BYO_GPT = () => {
    
    // state managers
        // form values + errors
        const [email, setEmail] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [agree, setAgree] = useState(false)
        const [shareData, setShareData] = useState(false)
        const [h_email, setH_email] = useState('');
        const [h_fName, setH_fName] = useState('');
        const [h_lName, setH_lName] = useState('');

        // manages to show interface block
        const [build , setBuild] = useState(false);

    // handles the flip and css of the init interface back to form ie return ref()
        useEffect(()=>{
            if(!build){
                let dataProject = document.querySelector('.data-project-main');
                dataProject.style.display = 'block';
            }

        })
    
    // handles the validation of the form 
        const handleClick = async (e) => {
            e.preventDefault();
            // validations
            const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
            const byo_gpt = document.querySelector('.byo-gpt-main');
            
            // first name must be 2 letters min
            if(firstName.length < 2){
                byo_gpt.style.margin = '-.5rem 0';
                byo_gpt.style.color = 'D74748'
                setH_fName('Enter a valid first name');
            }
            
            // last name must be 2 letters min
            if(lastName.length < 2){
                byo_gpt.style.margin = '-.5rem 0';
                setH_lName('Enter a valid last name');
            }
            // test email regex againts user email
            if (!validEmail.test(email)){
                byo_gpt.style.margin = '-.5rem 0';
                setH_email('Enter a valid Email');
            }
            // ensure user agrees to the terms
            if(!agree){
                alert("In order to use this demo please adhere to Openai terms of use by checking the box")
            }
            // ensure user agrees to share data
            if(!shareData){
                alert("In order to use this demo please agree to share your data")

            }
            // all validations passed
            if(validEmail.test(email) && firstName.length >= 2 && lastName.length >= 2 && agree && shareData){    
                const docRef = await addDoc(collection(db, 'byo_gpt'), {
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                });

                localStorage.setItem('gpt-builder', JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    // id: docRef.id
                })
                )
                // sets the css for the interface 
                let dataProject = document.querySelector('.data-project-main');
                dataProject.style.display = 'none';
                byo_gpt.style.top = '0rem';
                // clears the form
                setH_fName('');
                setH_lName('');
                setH_email('');
                setFirstName("")
                setLastName("")
                setEmail("")
                setAgree(false)
                setShareData(false)

                // triggers the interface switch
                setBuild(true);
            }


        }
    // handles how links are open based on device 
        const openLinks = async (e, link) =>{
            e.preventDefault()
            let screenWidth = window.innerWidth
            if(screenWidth < 1300){
                switch (link) {
                    case 'openai-tos':
                        window.location.href = "https://openai.com/policies/row-terms-of-use/";
                        break;
                
                    default:
                        break;
                }
            }else{
                switch(link) {
                    case 'openai-tos':
                        window.open(
                            "https://openai.com/policies/row-terms-of-use/", 
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
        <div className="byo-gpt-main">
            {
                !build ? (
                <div className="byo-gpt-container">
                <h1 className="gpt-title-text">Custom Chat GPT Builder</h1>
                <p className="gpt-summary-text">This GPT Context Training demo lets you build a custom Chat GPT to suit your needs, featuring a pre-trained cover letter writer.</p>
                <form className="byo-gpt-form" action=""  autoComplete="off">
                    <div className="byo-gpt-input-container">
                        <InputField 
                            className="byo-gpt-inputs" 
                            id="byo-f-name" 
                            label="First Name" 
                            type="text"
                            variant="outlined" 
                            autoComplete='off'
                            onChange={(e) => {setFirstName(e.target.value)}}
                            helperText={h_fName}
                            />
                        <InputField
                            className="byo-gpt-inputs"
                            id="byo-l-name" 
                            label="Last Name"
                            type="text"
                            variant="outlined"
                            autoComplete='off'
                            onChange={(e) => {setLastName(e.target.value)}}
                            helperText={h_lName}
                            />
                        <InputField
                            className="byo-gpt-inputs"
                            id="byo-email" 
                            label="Email"
                            variant="outlined"
                            type="email"
                            autoComplete='off'
                            onChange={(e) => {setEmail(e.target.value)}}
                            helperText={h_email}
                            />
                    </div>
                </form>
                <div className='gpt-tos-container'>
                    <div>
                        <input className="gpt-tos-checkboxes" type="checkbox" id='agree-checkbox-data-project' onChange={() => setAgree(!agree)} />
                        <label htmlFor="gpt-tos-agree-checkbox-label">I will adhere to OpenAI <span className="tos-openai-link" onClick={(e)=>{openLinks(e, 'openai-tos')}}>Terms of Use</span></label>
                    </div>
                    <div>
                        <input className="data-project-checkboxes" type="checkbox" id='sharedata-checkbox-data-project' onChange={() => setShareData(!shareData)} />
                        <label htmlFor="sharedata-checkbox-data-project">I agree to share my data</label>
                    </div>
                </div>
                
                <button className="demo-buttons" onClick={(e)=>{handleClick(e)}}>Start Build</button>
            </div>)
            : (
                <BYO_GPT_INTERFACE 
                    onReturnToMain={() => setBuild(false)}
                />
            )
    }
        </div>
    );
}

export default BYO_GPT;