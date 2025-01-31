import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ContactMail, Subject, Engineering } from "@mui/icons-material";
import "./layout.css";

export default function Contact() {
    const [index, setIndex] = useState(0);
    const [indexTextBox, setIndexTextBox] = useState(0);

    const textValues = ["project", "idea", "app", "event"];
    const textValuesForBox = [
        "your project",
        "your idea",
        "your app",
        "your event",
        "a job opportunity"
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % textValues.length);
            setIndexTextBox((prevIndex) => (prevIndex + 1) % textValuesForBox.length);
        }, 1500);

        return () => clearInterval(intervalId);
    }, [textValues.length, textValuesForBox.length]);

    return (
        <section id="contact" className="contact-section-container">
            <div className="contact-section-content-container">
                <div className="contact-section-content-left">
                    <div className="contact-section-left-internal">
                        <h1>Let's chat.</h1>
                        <h1>Tell me about your</h1>
                        <h1>{textValues[index]}</h1>
                        <p>Let's create something together!</p>
                        <div className="contact-section-left-socials">
                            <button>LinkedIn</button>
                            <button>YouTube</button>
                            <button>GitHub</button>
                            <button>Email</button>
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
                            rows={4}
                            sx={{width: "280px"}}
                            required
                        />
                    </Box>
                </div>
            </div>
        </section>
    );
}
