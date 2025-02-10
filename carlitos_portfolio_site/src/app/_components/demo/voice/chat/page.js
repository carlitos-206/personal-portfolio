"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatModule.module.css"; // Use CSS Modules

export default function ChatModule() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "nyx",
      text: "Hi! I'm Nyx, your personal speaking assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const chatScreenRef = useRef(null); // Scroll Reference for Mobile

  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Ensure compatibility with iOS
      const options = { mimeType: "audio/webm" };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Microphone access is required for recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTextSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), sender: "user", text: newMessage },
    ]);
    setNewMessage("");
  };

  const handleAudioSend = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), sender: "user", audio: audioURL },
      ]);

      setTimeout(() => URL.revokeObjectURL(audioURL), 5000);
      setAudioBlob(null);
    }
  };

  return (
    <div className={styles.chatModule}>
      <div className={styles.chatContainer}>
        <div className={styles.chatScreen} ref={chatScreenRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.chatBubble} ${
                msg.sender === "nyx" ? styles.nyxBubble : styles.userBubble
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.audio && <audio src={msg.audio} controls className={styles.audioMessage} />}
            </div>
          ))}
        </div>

        <form className={styles.chatInput} onSubmit={handleTextSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <div className={styles.audioControls}>
          <button onClick={startRecording} disabled={isRecording}>🎤 Start Recording</button>
          <button onClick={stopRecording} disabled={!isRecording}>⏹ Stop</button>
          {audioBlob && (
            <div className={styles.audioPreview}>
              <audio src={URL.createObjectURL(audioBlob)} controls />
              <button onClick={handleAudioSend}>Send Audio</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
