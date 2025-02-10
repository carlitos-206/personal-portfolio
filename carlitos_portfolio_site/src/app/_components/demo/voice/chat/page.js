"use client";

import React, { useEffect, useState, useRef } from "react";
import { UserData } from "../../userAgent/data_retriver";
import styles from "./ChatModule.module.css"; // Use CSS Modules

export default function ChatModule() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [is_iOS, setIs_iOS] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chatScreenRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  // New state to control the visibility of the permission/chat controls
  const [controlsVisible, setControlsVisible] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 2,
      sender: "app",
      text: "Before we get started, make sure to grant microphone permissions so I can hear you. 😊",
    },
  ]);

  const [messagesWithMic, setMessagesWithMic] = useState([
    { id: 1, sender: "app", text: "Hi! I'm your AI voice coach, and I’ve been trained to analyze your voice. 🎤" },
    { id: 2, sender: "app", text: "Tap an option:" },
    { id: 3, sender: "app", text: "Let's meet at the coffee shop. We can catch up there." },
    { id: 4, sender: "app", text: "I recently started learning to play the guitar. It's challenging but incredibly rewarding." },
    { id: 5, sender: "app", text: "Converging technological innovations can disrupt traditional industries and redefine market paradigms." },
  ]);

  const [iOSMessages, setIOSMessages] = useState([
    {
      id: 1,
      sender: "app",
      text: `Hey there! 👋 Just a quick heads-up—iOS has some internal microphone restrictions that prevent this feature from working smoothly.
While there is a way to manually update your phone settings, reverting those changes could be tricky for most users.
To experience this demo, I recommend trying the demo on an Android device or desktop instead. Thanks for your patience, and let me know if you need any help! 😊🚀`,
    },
  ]);

  // State for tracking the selected option (if any)
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [messages, selectedOption]);


  useEffect(() => {
      // 🔹 Detect if the user is on iOS
    const checkFor_iOS = async () => {
      try {
        let data = await UserData();
        setIs_iOS(data.device.os.name === "iOS");
      } catch (error) {
        console.error("Error detecting OS:", error);
    }
  };
    checkFor_iOS();
  }, []);

  // 🔹 Check microphone permission on render using localStorage (Only if NOT iOS)
  useEffect(() => {
    if (is_iOS) return; // Skip permission logic for iOS

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
  }, [is_iOS]);

  // 🔹 Manually request microphone permission
  const requestPermissionManually = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      localStorage.setItem("microphonePermission", "granted");
      setHasPermission(true);
      alert("Microphone access granted!");
    } catch (error) {
      console.error("Manual microphone request failed:", error);
      alert("Failed to access the microphone. Please check your browser settings.");
    }
  };

  // 🔹 Recording Logic
  const startRecording = async () => {
    if (!hasPermission) {
      alert("Microphone permission is required to record.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Failed to access the microphone.");
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

    setMessages([...messages, { id: Date.now(), sender: "user", text: newMessage }]);
    setNewMessage("");
  };

  const handleAudioSend = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      setMessages([...messages, { id: Date.now(), sender: "user", audio: audioURL }]);

      setTimeout(() => URL.revokeObjectURL(audioURL), 5000);
      setAudioBlob(null);
    }
  };

  // Separate the instructional messages (IDs 1 & 2) from the option messages (IDs 3–5)
  const instructionMessages = messagesWithMic.filter((msg) => msg.id < 3);
  const optionMessages = messagesWithMic.filter((msg) => msg.id >= 3);

  return (
    <>
      {!is_iOS ? (
        <div className={styles.chatModule}>
          <div className={styles.chatContainer}>
            <div className={styles.chatScreen} ref={chatScreenRef}>
              {hasPermission ? (
                <>
                  {/* Render instructional messages */}
                  {instructionMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.chatBubble} ${msg.sender === "app" ? styles.nyxBubble : styles.userBubble}`}
                    >
                      {msg.text && <p>{msg.text}</p>}
                    </div>
                  ))}

                  {/* Render options as buttons or the selected option */}
                  <div className={styles.optionsContainer}>
                    {!selectedOption ? (
                      optionMessages.map((option) => (
                        <button
                          key={option.id}
                          className={`${styles.optionButton}`}
                          onClick={() => {
                            setSelectedOption(option);
                            setControlsVisible(true); // Hide the permission/chat controls
                          }}
                        >
                          {option.text}
                        </button>
                      ))
                    ) : (
                      <div
                        key={selectedOption.id}
                        className={`${styles.chatBubble} ${
                          selectedOption.sender === "app" ? styles.nyxBubble : styles.userBubble
                        }`}
                      >
                        {selectedOption.text && <p>{selectedOption.text}</p>}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Fallback messages when permission is not granted
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.chatBubble} ${msg.sender === "app" ? styles.nyxBubble : styles.userBubble}`}
                  >
                    {msg.text && <p>{msg.text}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Render the permission or chat controls only while `controlsVisible` is true */}
            {controlsVisible && (
              !hasPermission ? (
                <div className={styles.permissionContainer}>
                  <p>Microphone permission is not granted. Click below to allow it.</p>
                  <button onClick={requestPermissionManually}>Grant Microphone Access</button>
                </div>
              ) : (
                <>
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
                    <button onClick={startRecording} disabled={!hasPermission || isRecording}>
                      🎤 Start Recording
                    </button>
                    <button onClick={stopRecording} disabled={!isRecording}>
                      ⏹ Stop
                    </button>
                    {audioBlob && (
                      <div className={styles.audioPreview}>
                        <audio src={URL.createObjectURL(audioBlob)} controls />
                        <button onClick={handleAudioSend}>Send Audio</button>
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      ) : (
        <>
          {iOSMessages.map((msg) => (
            <>
              <p key={msg.id} className={styles.iosMessage}>{msg.text}</p>
              <button className="demo-buttons">Contact for Support</button>
            </>
          ))}
        </>
      )}
    </>
  );
}
