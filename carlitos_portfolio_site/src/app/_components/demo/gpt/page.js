'use client'
import React, {useEffect, useState} from "react";
import "./layout.css";
import BYO_GPT_INTERFACE from "./interface/page";
import { db } from "../../GLOBAL/database/firebase";
import { collection, addDoc } from 'firebase/firestore';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

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
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [agree, setAgree] = useState(false)
    const [h_email, setH_email] = useState('');
    const [h_fName, setH_fName] = useState('');
    const [h_lName, setH_lName] = useState('');

    const [build , setBuild] = useState(false);


    useEffect(()=>{
        if(!build){
            let dataProject = document.querySelector('.data-project-main');
            dataProject.style.display = 'block';
        }

    })
    const handleClick = async (e) => {
        e.preventDefault();
        // validations
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        const byo_gpt = document.querySelector('.byo-gpt-main');

        if(firstName.length < 2){
            byo_gpt.style.margin = '-.5rem 0';
            byo_gpt.style.color = 'D74748'
            setH_fName('Enter a valid first name');
        }
        if(lastName.length < 2){
            byo_gpt.style.margin = '-.5rem 0';
            setH_lName('Enter a valid last name');
        }
        if (!validEmail.test(email)){
            byo_gpt.style.margin = '-.5rem 0';
            setH_email('Enter a valid Email');
        }
        if(!agree){
            alert("In order to use this demo please adhere to Openai terms of use by checking the box")
        }
        if(validEmail.test(email) && firstName.length >= 2 && lastName.length >= 2 && agree){    
            // const docRef = await addDoc(collection(db, 'byo_gpt'), {
            //     email: email,
            //     firstName: firstName,
            //     lastName: lastName
            // });
            // console.log('Document written with ID: ', docRef.id);
            
            localStorage.setItem('gpt-builder', JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                // id: docRef.id
            })
            )

            setH_fName('');
            setH_lName('');
            setH_email('');
            let dataProject = document.querySelector('.data-project-main');
            dataProject.style.display = 'none';
            byo_gpt.style.top = '0rem';
            setFirstName("")
            setLastName("")
            setEmail("")
            setAgree(false)
            setBuild(true);
        }


    }

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
                <p className="gpt-summary-text">Summary: This is a live demo of GPT Context Training, except here you can custom build your own Chat GPT </p>
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
                    <input className="gpt-tos-checkboxes" type="checkbox" id='agree-checkbox-data-project' onChange={() => setAgree(!agree)} />
                    <label htmlFor="gpt-tos-agree-checkbox-label">I will adhere to OpenAI <span className="tos-openai-link" onClick={(e)=>{openLinks(e, 'openai-tos')}}>Terms of Use</span></label>
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