"use client";

import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import {PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";

// If you want to use a global CSS file:
import "./layout.css";

// If you prefer CSS Modules, rename layout.css to ChatModule.module.css and import:
// import styles from "./ChatModule.module.css";

// Importing SVGs as static assets
// import trash from "/images/trash.svg";
// import check from "/images/check.svg";

export default function ChatModule() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
  
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
  
        const audioChunks = [];
        mediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };
  
        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(blob);
        };
  
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };
  
    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };

  const handleSend = (e) => {
    e.preventDefault();
    if (audioBlob) {
      // convertToMp3(audioBlob); // or handle your logic here
    }
  };

  return (
    <div className="chat_module_main">
      <div className="chat_module_container">
        <div className="chat_screen_container">
          <div className="chat_screen">
            <div className="chat_bubble_container">
              <div className="chat_bubble-nyx">
                <p>Hi! I&apos;m Nyx, your personal speaking assistant. How can I help you today?</p>
              </div>
            </div>
          </div>
        </div>
        <div className="chat_input_container">
        <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioBlob && (
        <audio src={URL.createObjectURL(audioBlob)} controls />
      )}
    </div>
        </div>
      </div>
    </div>
  );
}
