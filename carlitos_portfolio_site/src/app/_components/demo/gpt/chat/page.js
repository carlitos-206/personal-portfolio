import React, { useState, useEffect, useRef } from "react";
import "./layout.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BYO_GPT_INTERFACE from "../interface/page";

import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import {PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { cover_letter_writer } from "../backend";
const BYO_CHAT = ({ task, onReturnToMain }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState(null)
    const [isTyping, setIsTyping] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [send, setSend] = useState(false);
    const [seeChat, setSeeChat] = useState(true);
    const user = JSON.parse(localStorage.getItem('gpt-builder'));
    const lastMessageRef = useRef(null);
    const chatContainerRef = useRef(null);

    const fetchData = async () => {
        const response = await cover_letter_writer(messages, user, null);
        setData(response)
        console.log(`
            multi response: ${response}
            `)
        setMessages([response.returned_transcript[response.returned_transcript.length -1]]);
    };

    useEffect(() => {
        const sendMessage = async () => {
            if (messages.length > 0) {
                setIsTyping(false);
                const response = await cover_letter_writer(messages, user, data);
                setData(response)
                console.log(`
                    multi response: ${JSON.stringify(response)}
                    `)
                setMessages((prevMessages) => [...prevMessages, response.returned_transcript[response.returned_transcript.length -1]]);
            }
        };
        if (send) {
            sendMessage();
            setSend(false);
        }
    }, [send, messages, user]);

    useEffect(() => {
        if (lastMessageRef.current && chatContainerRef.current) {
            const lastMessageOffset = lastMessageRef.current.offsetTop - 100;
            console.log(lastMessageOffset);
            chatContainerRef.current.scrollTop = lastMessageOffset;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsTyping(true);
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setSend(true);
            setInputValue('');
        }
    };

    const handleInitiation = () => {
        setInitiated(true);
        setIsTyping(true);
        fetchData();
        setIsTyping(false);
    };


    const CoverLetterTitle = () => {
        return(
            <div className="byo-chat-title" >
                <ArrowCircleLeft size={48} id="byo-arrow-icon" onClick={(e)=>{setSeeChat(false)}} /> 
                <p>Cover Letter Writer</p>
            </div>
        )
    }
    const CustomBuiltTitle = () => {
        return(
            <div className="byo-chat-title" >
                <ArrowCircleLeft size={48} id="byo-arrow-icon" onClick={(e)=>{setSeeChat(false)}} /> 
                <p>Custom Built</p>
            </div>
        )
    }
    return (
        
         !seeChat ? <BYO_GPT_INTERFACE onReturnToMain={onReturnToMain}/> : (

        <div className="byo-chat-main">
        <div className="byo-chat-screen">
        {task === 'prebuilt' ? <CoverLetterTitle /> : <CustomBuiltTitle />}
        <div className="byo-chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
                        <div
                        key={index}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className={`byo-chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
                        style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {message}
                        </div>
                    ))}
                    {isTyping && <div className="byo-chat-message typing">...</div>}
                    </div>
                    {initiated ? (
                        <div className="byo-chat-input-container">
                        <TextField
                            className="byo-chat-input"
                            variant="outlined"
                            multiline
                            minRows={1}
                            maxRows={4}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            InputProps={{ style: { whiteSpace: 'pre-wrap' } }}
                            />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendMessage}
                            className="byo-chat-send-button"
                            style={{
                                marginLeft: 8,
                                backgroundColor: 'rgb(43, 43, 43)',
                                borderRadius: 50,
                                padding: 10,
                            }}
                            >
                            <PaperPlaneTilt size={32} />
                        </Button>
                    </div>
                ) : (
                    <div className="byo-init-screen">
                        <h1>Instructions</h1>
                        <ol>
                            <li>
                                <p>
                                    Wait for the GPT to wake up.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Paste the text from your resume.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Paste the job you want GPT to write you a cover letter for.
                                </p>
                            </li>
                            <li>
                                <p>
                                You are limited to 3 letters
                                </p>
                            </li>
                        </ol>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleInitiation}
                            className="byo-chat-send-button"
                            style={{
                                marginLeft: 8,
                                backgroundColor: 'rgb(43, 43, 43)',
                                borderRadius: 50,
                                padding: 10,
                            }}
                            >
                            Start&nbsp;&nbsp; <PaperPlaneTilt size={32} />
                        </Button>
                    </div>
                )}
                </div>
                </div>
    )
            );
}
        
export default BYO_CHAT;
