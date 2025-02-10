"use client";

import React, { useEffect, useState, useRef } from "react";
import "./layout.css"; // or use ChatModule.module.css for CSS Modules

export default function ChatModule() {
  // State to track audio recording status and audio blob
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  // State for chat messages and new text input
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "nyx",
      text: "Hi! I'm Nyx, your personal speaking assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle sending a text message
  const handleTextSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  // Handle sending an audio message
  const handleAudioSend = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      const message = {
        id: Date.now(),
        sender: "user",
        audio: audioURL,
      };

      setMessages((prevMessages) => [...prevMessages, message]);
      setAudioBlob(null);
    }
  };

  return (
    <div className="chat_module_main">
      <div className="chat_module_container">
        {/* Chat Screen */}
        <div className="chat_screen_container">
          <div className="chat_screen">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat_bubble_container ${
                  message.sender === "nyx" ? "chat_bubble-nyx" : "chat_bubble-user"
                }`}
              >
                {message.text && <p>{message.text}</p>}
                {message.audio && (
                  <audio src={message.audio} controls className="audio_message" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input for text messages */}
        <form className="chat_input_container" onSubmit={handleTextSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        {/* Audio recording controls */}
        <div className="chat_audio_controls">
          <button onClick={startRecording} disabled={isRecording}>
            Start Recording
          </button>
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop Recording
          </button>
          {audioBlob && (
            <div className="audio_preview">
              <audio src={URL.createObjectURL(audioBlob)} controls />
              <button onClick={handleAudioSend}>Send Audio</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
