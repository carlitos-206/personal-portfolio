/* 
    This file contains the Contact section logic and FE
*/

'use client'
import { useEffect, useState } from "react";

// Material UI Imports
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ContactMail, Subject, Engineering, Try } from "@mui/icons-material";

// Firebase Imports
import { db } from "../GLOBAL/database/firebase"; 
import { collection, addDoc } from 'firebase/firestore';

import "./layout.css";

export default function Contact() {

    // These are the state managers
        const [index, setIndex] = useState(0); // handles the word slider init in title
        const [indexTextBox, setIndexTextBox] = useState(0); // handles the word slider in form
        
        const [isMobile, setIsMobile] = useState(null); // handles flip to mobile screen
        
        // All form values
        const [fullName, setFullName] = useState(null);
        const [email, setEmail] = useState(null);
        const [messageSubject, setMessageSubject] = useState(null);
        const [messageBody, setMessageBody] = useState(null)
        
        // All form error values
        const [fullNameError, setFullNameError] = useState(false);
        const [emailError, setEmailError] = useState(false);
        const [subjectError, setSubjectError] = useState(false);
        const [bodyError, setBodyError] = useState(false);

        const textValues = ["project", "idea", "app", "event"]; // text values for title word slideshow
        const textValuesForBox = [
            "your idea",
            "your project",
            "a job opportunity",
            "your app",
            "your event",
        ]; // values for form word slide show

    // Handles window size + slide changer for title and form
        useEffect(() => {
            const intervalId = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % textValues.length);
                setIndexTextBox((prevIndex) => (prevIndex + 1) % textValuesForBox.length);
            }, 1500);
                    // resize handler
                    const handleResize = () => {
                        const width = window.innerWidth;
                        setIsMobile(width <= 1200);
                    };
                    handleResize();
                    window.addEventListener("resize", handleResize);

            return () => { 
                clearInterval(intervalId);
                window.removeEventListener("resize", handleResize);
            }
        }, [textValues.length, textValuesForBox.length]);

    // Handles links send off based on {isMobile} for UX 
        const contactButtonLink = async (e, smallScreen, route ) =>{
            e.preventDefault()
            if(smallScreen){
                switch (route) {
                    case 'email':
                        window.location.href =  "mailto:carloscaceres041@gmail.com"
                        break;
                    case "linkedin":
                        window.location.href = "https://www.linkedin.com/in/carlitos206/";
                        break;
                    case "github":
                        window.location.href = "https://github.com/carlitos-206";
                        break;
                    case "youtube":
                        window.location.href = "https://www.youtube.com/@carloscaceres2608";
                        break;
                    default:
                        break;
                }
            }else{
                switch (route) {
                    case 'email':
                        window.open('mailto:carloscaceres041@gmail.com')
                        break;
                    case 'linkedin':
                        window.open(
                            "https://www.linkedin.com/in/carlitos206/", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break;
                    case 'github':
                        window.open(
                            "https://github.com/carlitos-206", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break;
                    case 'youtube':
                        window.open(
                            "https://www.youtube.com/@carloscaceres2608", 
                            "myPopup", 
                            "top=25,left=50,width=900,height=900",
                        )
                        break;
                    default:
                        break;
                }
            }
        }

    // Handles sending the message and validating the form
        const sendMessage = async (e, fName, mail, subject, body ) =>{
            e.preventDefault()
            console.log(`
                fname: ${fName},
                mail: ${mail},
                subject: ${subject}
                body: ${body}
                `)
            const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
            let hasError = false;

             // Validate full name
            if (!fullName || fullName.trim().length < 2) {
                setFullNameError(true);
                hasError = true;
            } else {
                setFullNameError(false);
            }

            // Validate email
            if (!email || !emailRegex.test(email)) {
                setEmailError(true);
                hasError = true;
            } else {
                setEmailError(false);
            }
        
            // Validate subject
            if (!messageSubject || messageSubject.trim().length < 4) {
                setSubjectError(true);
                hasError = true;
            } else {
                setSubjectError(false);
            }
        
            // Validate message body
            if (!messageBody || messageBody.trim().length < 21) {
                setBodyError(true);
                hasError = true;
            } else {
                setBodyError(false);
            }
        
            // If any error exists, do not proceed.
            if (hasError) {
                return;
            } else{
                setFullNameError(false)
                setEmailError(false)
                setSubjectError(false)
                setBodyError(false)
                // send off to Firebase
                try{
                    const docRef = await addDoc( collection(db, 'contact-section'), {
                        full_name: fullName,
                        email: email,
                        subject: messageSubject,
                        message: messageBody,
                        date: new Date().toLocaleString("en-US", {  timeZone: "America/Los_Angeles"})
                    })
                    setFullName("")
                    setEmail("")
                    setMessageSubject("")
                    setMessageBody("")
                }catch (e) {
                    alert(`
                        Unfortunately the form did not go through, try again or email me directly.
                        carloscaceres041@gmail.com
                        `)
                }
            }

        }
    return (
        <section id="contact" className="contact-section-container">
            <div className="contact-section-content-container">
                <div className="contact-section-content-left">
                    <div className="contact-section-left-internal">
                        <h1>Let's chat.</h1>
                        <h1>Tell me about your {textValues[index]}</h1>
                        {/* <h1>{textValues[index]}</h1> */}
                        <p className="contact-section-left-intersection-p-tag">Let's create something together!</p>
                        <div className="contact-section-left-socials">
                            <button 
                                className="contact-section-social-buttons" 
                                onClick={(e)=>{contactButtonLink(e, isMobile, "email")}}
                            >
                                Email
                            </button>
                            <button 
                                className="contact-section-social-buttons" 
                                onClick={(e)=>{contactButtonLink(e, isMobile, "linkedin")}}
                            >
                                LinkedIn
                            </button>
                            <button 
                                className="contact-section-social-buttons" 
                                onClick={(e)=>{contactButtonLink(e, isMobile, "github")}}
                            >
                                GitHub
                            </button>
                            <button 
                                className="contact-section-social-buttons" 
                                onClick={(e)=>{contactButtonLink(e, isMobile, "youtube")}}
                            >
                                YouTube
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contact-section-right">
                    <h1>Send me a message</h1>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField 
                            sx={{width: "280px"}} 
                            label="Full Name" 
                            variant="standard"
                            value={fullName}
                            onChange={(e)=>{setFullName(e.target.value)}}
                            id="full-name"
                            error={fullNameError}              
                            helperText={fullNameError && "Please enter your full name"}
                            className="input-fields"
                            required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactMail sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField 
                            sx={{width: "280px"}} 
                            label="Email" 
                            variant="standard"
                            value={email}
                            id="e-mail"
                            error={emailError}
                            helperText={emailError && "Please enter a valid email"}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="input-fields"
                            required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Subject sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField 
                            sx={{width: "280px"}} 
                            label="Subject" 
                            variant="standard"
                            value={messageSubject} 
                            onChange={(e)=>{setMessageSubject(e.target.value)}}
                            error={subjectError}
                            helperText={subjectError && "Please write a subject"}
                            id="message-subject"
                            className="input-fields"
                            required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Engineering sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField
                            label={`Tell me more about ${textValuesForBox[indexTextBox]}`}
                            variant="standard"
                            value={messageBody}
                            multiline
                            maxRows={7}
                            sx={{width: "280px"}}
                            onChange={(e)=>{setMessageBody(e.target.value)}}
                            id="message-body"
                            error={bodyError}
                            helperText={bodyError && "Please write a longer message"}
                            className="input-fields"
                            required />
                    </Box>
                    <button 
                        className="contact-section-message-button" 
                        onClick={(e)=>{sendMessage(e, fullName, email, messageSubject, messageBody)}}
                    >
                        Send message
                    </button>
                </div>
            </div>
        </section>
    );
}
