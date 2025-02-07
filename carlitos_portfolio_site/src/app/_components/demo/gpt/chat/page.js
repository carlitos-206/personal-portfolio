import React, { useState, useEffect, useRef } from "react";
import "./layout.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BYO_GPT_INTERFACE from "../interface/page";

import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import {PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { cover_letter_writer, custom_gpt } from "../backend";
const BYO_CHAT = ({ task, onReturnToMain }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState(null)
    const [isTyping, setIsTyping] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [send, setSend] = useState(false);
    const [seeChat, setSeeChat] = useState(true);
    const [prompts, setPrompts] = useState('')
    const user = JSON.parse(localStorage.getItem('gpt-builder'));
    const lastMessageRef = useRef(null);
    const chatContainerRef = useRef(null);

    const fetchData_cover_letter = async () => {
        const response = await cover_letter_writer(messages, user, data);
        setData(response)
        console.log(`
                            multi response: ${JSON.stringify(response)}
            `)
        setMessages([response.returned_transcript[response.returned_transcript.length -1]]);
    };
    const fetchData_custom_gpt = async () => {
        const response = await custom_gpt(messages, user, data, prompts);
        setData(response)
        console.log(`
                            multi response: ${JSON.stringify(response)}
            `)
        setMessages([response.returned_transcript[response.returned_transcript.length -1]]);
    };
    useEffect(()=>{
        let values = localStorage.getItem('prompts')
        setPrompts(JSON.parse(values))
        console.log('prompts, useeeffect', prompts)
    },[])
    useEffect(() => {
        const sendMessage = async () => {
            if (messages.length > 0) {
                setIsTyping(false);
                let response
                switch (task) {
                    case 'prebuilt':
                        response = await cover_letter_writer(messages, user, data);
                        setData(response)
                        console.log(`
                            multi response: ${JSON.stringify(response)}
                            `)
                            setMessages(response.returned_transcript.map((item) => item.content));
                        
                        break;
                    case 'custom':
                        console.log('prompts at js', prompts)
                        response = await custom_gpt(messages, user, data, prompts);
                        setData(response)
                        console.log(`
                            multi response: ${JSON.stringify(response)}
                            `)
                            setMessages(response.returned_transcript.map((item) => item.content));
                            break
                    default:
                        break;
                }
            }
        };
        if (send) {
            sendMessage();
            setSend(false);
        }
    }, [send, messages, user]);

    useEffect(() => {
        // if (lastMessageRef.current && chatContainerRef.current) {
        //     const lastMessageOffset = lastMessageRef.current.offsetTop - 100;
        //     console.log(lastMessageOffset);
        //     chatContainerRef.current.scrollTop = lastMessageOffset;
        // }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsTyping(true);
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setSend(true);
            setInputValue('');
        }
    };

    const cover_leter_init = () => {
        if (inputValue.trim()) {
            setIsTyping(true);
            setMessages((prevMessages) => [...prevMessages, inputValue]);
        }
        setInitiated(true);
        setIsTyping(true);
        fetchData_cover_letter();
        setIsTyping(false);
    };
    const customGPTBuild = () => {
        if (inputValue.trim()) {
            setIsTyping(true);
            setMessages((prevMessages) => [...prevMessages, inputValue]);
        }
        setInitiated(true);
        setIsTyping(true);
        fetchData_custom_gpt();
        setIsTyping(false);
    };

    return (
        
        !seeChat ? <BYO_GPT_INTERFACE onReturnToMain={onReturnToMain}/> : (

        <div className="byo-chat-main">
        <div className="byo-chat-screen">
        {task === 'prebuilt' ?             <>
                <div className="byo-chat-title" >
                    <ArrowCircleLeft size={48} id="byo-arrow-icon" onClick={(e)=>{setSeeChat(false)}} /> 
                    <p>Cover Letter Writer</p>
                </div>
                <div className="byo-chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => 
        
        {

           return (
                        <div
                        key={index}
                        ref={index === messages.length - 1 ? lastMessageRef : null}
                        className={`byo-chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
                        style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {message}
                        </div>
                    )
                    
                    
                    })}
                    {isTyping && <div className="byo-chat-message typing">...</div>}
                    </div>
                    {initiated ? (
                        <div className="byo-chat-input-container">
                        <TextField
                            className="byo-chat-input"
                            variant="outlined"
                            multiline
                            maxRows={4}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
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
                            onClick={cover_leter_init}
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
            </> :   <>
                <div className="byo-chat-title" >
                    <ArrowCircleLeft size={48} id="byo-arrow-icon" onClick={(e)=>{setSeeChat(false)}} /> 
                    <p>Custom GPT Build</p>
                </div>
                <div className="byo-chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
                        <div
                        key={index}
                        // ref={index === messages.length - 1 ? lastMessageRef : null}
                        className={`byo-chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
                        // style={{ whiteSpace: 'pre-wrap' }}
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
                            maxRows={4}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
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
                                    Wait for the GPT to train.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Start interacting!
                                </p>
                            </li>
                        </ol>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={customGPTBuild}
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
            </>}
                </div>
                </div>
    )
            );
}
        
export default BYO_CHAT;
