/*
    This file contains the Chat Component, for Custom GPT
    
    REF Cycle: "./gpt/page.js(*ROOT*)" <-> "./gpt/interface/page.js" <-> "./gpt/chat/page.js"(*YOU ARE HERE*)
*/ 
import React, { useState, useEffect, useRef } from "react";

// Material UI Component
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Phosphor Icons with Next.js Routing
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr/ArrowCircleLeft";
import {PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";

// Backend import
import { cover_letter_writer, custom_gpt } from "../backend";

// Custom Components
import BYO_GPT_INTERFACE from "../interface/page";

import "./layout.css";

const BYO_CHAT = ({ task, onReturnToMain }) => {
    // State Handlers
        const [inputValue, setInputValue] = useState(''); // handles the user input
        const [messages, setMessages] = useState([]); // handles messages text
        const [data, setData] = useState(null) // handles data, so it can stay constant
        const [isTyping, setIsTyping] = useState(false); // eneables and disables input
        
        const [initiated, setInitiated] = useState(false); // handles the instructions - > chat screen
        
        const [send, setSend] = useState(false); // handles trigger to send message
        const [seeChat, setSeeChat] = useState(true); // handles see chat flip
        const [prompts, setPrompts] = useState('') // handles prompts for custom GPT
        
        const lastMessageRef = useRef(null); // keeps ref of last message so it can scroll to it
        const chatContainerRef = useRef(null); // keeps ref of chat container so it can scroll to last message
    
    // retrives the user data so it can be sent to backend
        const user = JSON.parse(localStorage.getItem('gpt-builder')); 
    
    // initial cover letter fetch
        const fetchData_cover_letter = async () => {
            const response = await cover_letter_writer(messages, user, data);
            setData(response)
            console.log(`
                                multi response: ${JSON.stringify(response)}
                `)
            setMessages([response.returned_transcript[response.returned_transcript.length -1]]);
        };
    // initial custom gpt fetch
        const fetchData_custom_gpt = async () => {
            const response = await custom_gpt(messages, user, data, prompts);
            setData(response)
            console.log(`
                                multi response: ${JSON.stringify(response)}
                `)
            setMessages([response.returned_transcript[response.returned_transcript.length -1]]);
        };

    // handles the retrivel of prompts on render
        useEffect(()=>{
            let values = localStorage.getItem('prompts')
            setPrompts(JSON.parse(values))
        },[])

    // Handles sending messages in chain
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

    // handles scroll to top of last message
        useEffect(() => {
            if (lastMessageRef.current && chatContainerRef.current) {
                const lastMessageOffset = lastMessageRef.current.offsetTop - 100;
                console.log(lastMessageOffset);
                chatContainerRef.current.scrollTop = lastMessageOffset;
            }
        }, [messages]);
    // handles building the array for message to be send
        const handleSendMessage = async () => {
            if (inputValue.trim()) {
                setIsTyping(true);
                setMessages((prevMessages) => [...prevMessages, inputValue]);
                setSend(true);
                setInputValue('');
            }
        };

    // cover letter init function
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
    // custom gpt init function
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
            // If 'seeChat' is false, render the custom GPT interface component.
            !seeChat ? (
                <BYO_GPT_INTERFACE onReturnToMain={onReturnToMain}/>
            ) : (
                <div className="byo-chat-main">
                    {/* Main chat container */}
                    <div className="byo-chat-screen">
                        {task === 'prebuilt' ? (
                            <>
                                {/* Title section for the Cover Letter Writer */}
                                <div className="byo-chat-title">
                                    {/* Back arrow icon to return to the main interface */}
                                    <ArrowCircleLeft
                                        size={48}
                                        id="byo-arrow-icon"
                                        onClick={(e) => { setSeeChat(false) }}
                                    />
                                    <p>Cover Letter Writer</p>
                                </div>
        
                                {/* Container for displaying chat messages */}
                                <div className="byo-chat-messages" ref={chatContainerRef}>
                                    {messages.map((message, index) => {
                                        return (
                                            <div
                                                key={index}
                                                // Attach ref to the last message to enable scrolling
                                                ref={index === messages.length - 1 ? lastMessageRef : null}
                                                // Alternate message alignment based on index
                                                className={`byo-chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
                                                // Preserve whitespace formatting
                                                style={{ whiteSpace: 'pre-wrap' }}
                                            >
                                                {message}
                                            </div>
                                        );
                                    })}
                                    {/* Typing indicator shown when GPT is processing */}
                                    {isTyping && <div className="byo-chat-message typing">...</div>}
                                </div>
        
                                {initiated ? (
                                    // Input container shown after chat has been initiated
                                    <div className="byo-chat-input-container">
                                        {/* Text field for user to type a message */}
                                        <TextField
                                            className="byo-chat-input"
                                            variant="outlined"
                                            multiline
                                            maxRows={4}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Type a message..."
                                        />
                                        {/* Button to send the message */}
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
                                    // Initial instructions screen shown before the chat starts
                                    <div className="byo-init-screen">
                                        <h1>Instructions</h1>
                                        <ol>
                                            <li>
                                                <p>Wait for the GPT to wake up.</p>
                                            </li>
                                            <li>
                                                <p>Paste the text from your resume.</p>
                                            </li>
                                            <li>
                                                <p>Paste the job you want GPT to write you a cover letter for.</p>
                                            </li>
                                            <li>
                                                <p>You are limited to 3 letters</p>
                                            </li>
                                        </ol>
                                        {/* Button to initiate the cover letter process */}
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
                            </>
                        ) : (
                            <>
                                {/* Title section for the Custom GPT Build */}
                                <div className="byo-chat-title">
                                    {/* Back arrow icon to return to the main interface */}
                                    <ArrowCircleLeft
                                        size={48}
                                        id="byo-arrow-icon"
                                        onClick={(e) => { setSeeChat(false) }}
                                    />
                                    <p>Custom GPT Build</p>
                                </div>
        
                                {/* Container for displaying chat messages in the Custom GPT Build */}
                                <div className="byo-chat-messages" ref={chatContainerRef}>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            // Alternate message alignment based on index
                                            className={`byo-chat-message ${index % 2 === 0 ? 'left' : 'right'}`}
                                        >
                                            {message}
                                        </div>
                                    ))}
                                    {/* Typing indicator shown when GPT is processing */}
                                    {isTyping && <div className="byo-chat-message typing">...</div>}
                                </div>
        
                                {initiated ? (
                                    // Input container shown after chat has been initiated
                                    <div className="byo-chat-input-container">
                                        {/* Text field for user input */}
                                        <TextField
                                            className="byo-chat-input"
                                            variant="outlined"
                                            multiline
                                            maxRows={4}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Type a message..."
                                        />
                                        {/* Button to send the message */}
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
                                    // Initial instructions screen for Custom GPT Build
                                    <div className="byo-init-screen">
                                        <h1>Instructions</h1>
                                        <ol>
                                            <li>
                                                <p>Wait for the GPT to train.</p>
                                            </li>
                                            <li>
                                                <p>Start interacting!</p>
                                            </li>
                                        </ol>
                                        {/* Button to start the Custom GPT build process */}
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
                            </>
                        )}
                    </div>
                </div>
            )
        );
}
        
export default BYO_CHAT;
