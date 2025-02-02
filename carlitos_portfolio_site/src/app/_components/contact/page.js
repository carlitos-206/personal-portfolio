'use client'
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ContactMail, Subject, Engineering } from "@mui/icons-material";
import "./layout.css";

export default function Contact() {
    const [index, setIndex] = useState(0);
    const [indexTextBox, setIndexTextBox] = useState(0);
    const [isMobile, setIsMobile] = useState(null)
    const textValues = ["project", "idea", "app", "event"];
    const textValuesForBox = [
        "your idea",
        "your project",
        "a job opportunity",
        "your app",
        "your event",
    ];

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

    const contactButtonSubtmit = async (e, smallScreen, route ) =>{
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
                            <button className="contact-section-social-buttons" onClick={(e)=>{contactButtonSubtmit(e, isMobile, "email")}}>Email</button>
                            <button className="contact-section-social-buttons" onClick={(e)=>{contactButtonSubtmit(e, isMobile, "linkedin")}}>LinkedIn</button>
                            <button className="contact-section-social-buttons" onClick={(e)=>{contactButtonSubtmit(e, isMobile, "github")}}>GitHub</button>
                            <button className="contact-section-social-buttons" onClick={(e)=>{contactButtonSubtmit(e, isMobile, "youtube")}}>YouTube</button>
                        </div>
                    </div>
                </div>
                <div className="contact-section-right">
                    <h1>Send me a message</h1>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField sx={{width: "280px"}} label="Full Name" variant="standard" required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactMail sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField sx={{width: "280px"}} label="Email" variant="standard" required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Subject sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField sx={{width: "280px"}} label="Subject" variant="standard" required />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Engineering sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                        <TextField
                            label={`Tell me more about ${textValuesForBox[indexTextBox]}`}
                            variant="standard"
                            multiline
                            maxRows={7}
                            sx={{width: "280px"}}
                            required
                        />
                    </Box>
                    <button className="contact-section-message-button" onClick={(e)=>{contactButtonSubtmit(e, isMobile, "message")}}>Send message</button>
                </div>
            </div>
        </section>
    );
}
