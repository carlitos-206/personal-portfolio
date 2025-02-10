"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatModule.module.css"; // Use CSS Modules

export default function ChatModule() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chatScreenRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "nyx",
      text: "Hi! I'm Nyx, your personal speaking assistant. How can I help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Check microphone permission on render using localStorage
  useEffect(() => {
    
    localStorage.removeItem("microphonePermission")
    const checkMicrophonePermission = async () => {
      try {
        const storedPermission = localStorage.getItem("microphonePermission");
        if (storedPermission === "granted") {
          setHasPermission(true);
          return;
        }

        const permission = await navigator.permissions.query({ name: "microphone" });

        if (permission.state === "granted") {
          localStorage.setItem("microphonePermission", "granted");
          setHasPermission(true);
        } else if (permission.state === "denied") {
          alert("Microphone access is blocked. Please enable it in your browser settings.");
        }

        permission.onchange = () => {
          if (permission.state === "granted") {
            localStorage.setItem("microphonePermission", "granted");
            setHasPermission(true);
          } else if (permission.state === "denied") {
            localStorage.removeItem("microphonePermission");
            setHasPermission(false);
          }
        };
      } catch (error) {
        console.error("Microphone permission request error:", error);
      }
    };

    checkMicrophonePermission();
  }, []);

  // 🔹 Manually request permission when the user clicks a button
  const requestPermissionManually = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop stream immediately
      localStorage.setItem("microphonePermission", "granted");
      setHasPermission(true);
      alert("Microphone access granted!");
    } catch (error) {
      console.error("Manual microphone request failed:", error);
      alert("Failed to access the microphone. Please check your browser settings.");
    }
  };

  const startRecording = async () => {
    if (!hasPermission) {
      alert("Microphone permission is required to record.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 🔹 Ensure microphone is immediately used (Fix for iOS Safari)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      source.connect(processor);
      processor.connect(audioContext.destination); // Required for iOS Safari

      // Media Recorder setup
      const options = { mimeType: "audio/webm" };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(blob);

        // Stop all tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());
        audioContext.close();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Failed to access the microphone. Try refreshing the page and allowing microphone access again.");
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
  
        {/* 🔹 UI Elements for Chat Input, Audio Controls & Permission Handling */}
        <div className={styles.chatBottom}>
          {/* Display this section only if permission is granted */}
          {hasPermission ? (
            <>
              {/* Chat Input */}
              <form className={styles.chatInput} onSubmit={handleTextSend}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
  
              {/* Audio Controls */}
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
            </>
          ) : (
            // If permission is NOT granted, show this UI
            <div className={styles.permissionContainer}>
              <p>Microphone permission is not granted. Click below to allow it.</p>
              <button onClick={requestPermissionManually}>Grant Microphone Access</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}
