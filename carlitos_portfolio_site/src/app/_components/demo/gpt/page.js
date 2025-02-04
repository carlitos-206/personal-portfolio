import React, {useState} from "react";
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

    const [h_email, setH_email] = useState('');
    const [h_fName, setH_fName] = useState('');
    const [h_lName, setH_lName] = useState('');

    const [build , setBuild] = useState(false);
    const handleClick = async (e) => {
        e.preventDefault();
        // validations
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        const byo_gpt = document.querySelector('.byo-gpt-main');
        if(firstName.length < 2){
            byo_gpt.style.margin = '-.5rem 0';
            setH_fName('Must be at least 2 characters');
        }
        if(lastName.length < 2){
            byo_gpt.style.margin = '-.5rem 0';
            setH_lName('Must be at least 2 characters');
        }
        if (!validEmail.test(email)){
            byo_gpt.style.margin = '-.5rem 0';
            setH_email('Invalid Email');
        }
        if(validEmail.test(email) && firstName.length >= 2 && lastName.length >= 2){    
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
            // byo_gpt.style.position = 'absolute';
            byo_gpt.style.top = '0rem';
            setBuild(true);
        }


    }
    return (
        <div className="byo-gpt-main">
            {
                !build ? (
                <div className="byo-gpt-container">
                <h1>Build your own custom Chat-GPT</h1>
                <p>Summary: This is a live demo of GPT Context Training, except here you can custom build your own Chat GPT </p>
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
                <button className="demo-buttons" onClick={(e)=>{handleClick(e)}}>Start Build</button>
            </div>)
            : (
                <BYO_GPT_INTERFACE />
            )
    }
        </div>
    );
}

export default BYO_GPT;