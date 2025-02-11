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
  const [contactElement, setContactElement] = useState(null);
  const [mainTranscript, setMainTranscript] = useState([
    {
      id: 1,
      sender: "app",
      text: `
       When you're ready, tap { 🔴 Start Recording } and repeat the phrase. When finished, tap { ⏹ Stop }. If you're happy with your recording, tap Send Audio. To record again, simply tap { 🔴 Start Recording } to begin a new recording.
      `,
    },
    { id: 2, sender: "app", text: "The phrase you have chosen is:" },

  ]);

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
    {
      id: 1,
      sender: "app",
      text: "Hi! I'm your AI voice coach, and I’ve been trained to analyze your voice. 🎤",
    },
    { id: 2, sender: "app", text: "Tap an option below to practice that phrase:" },
    {
      id: 3,
      sender: "app",
      text: "Let's meet at the coffee shop. We can catch up there.",
    },
    {
      id: 4,
      sender: "app",
      text: "I recently started learning to play the guitar. It's challenging but incredibly rewarding.",
    },
    {
      id: 5,
      sender: "app",
      text: "Converging technological innovations can disrupt traditional industries and redefine market paradigms.",
    },
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
    let element = document.querySelector("#contact");
    setContactElement(element);
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

    // Generate a unique id
    const newId = Date.now();

    // Append the new text message to the messages state
    setMessages([...messages, { id: newId, sender: "user", text: newMessage }]);

    // Append the new text message to mainTranscript with the required structure
    setMainTranscript((prevTranscript) => [
      ...prevTranscript,
      {
        id: newId,
        sender: "user",
        text: newMessage,
        audio: false,
        audio_file: null,
      },
    ]);

    setNewMessage("");
  };

  const handleAudioSend = () => {
    if (audioBlob) {
      const newId = Date.now();
      const audioURL = URL.createObjectURL(audioBlob);

      // Append the new audio message to the messages state
      setMessages([...messages, { id: newId, sender: "user", audio: audioURL }]);

      // Append the new audio message to mainTranscript with the required structure
      setMainTranscript((prevTranscript) => [
        ...prevTranscript,
        {
          id: newId,
          sender: "user",
          text: "", // No text for an audio message
          audio: true,
          audio_file: audioBlob,
        },
      ]);

      setTimeout(() => URL.revokeObjectURL(audioURL), 5000);
      setAudioBlob(null);
    }
  };

  // Separate the instructional messages (IDs 1 & 2) from the option messages (IDs 3–5)
  let instructionMessages = messagesWithMic.filter((msg) => msg.id < 3);
  const optionMessages = messagesWithMic.filter((msg) => msg.id >= 3);

  // handles nav scroll to element
  const scrollToElement = (e, element) => {
    e.preventDefault();
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 100;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if(mainTranscript.length > 2 ){
      const init_messages = document.getElementsByClassName('init-messages')
      for(let i = 0; i < init_messages.length; i++){
        init_messages[i].style.display = 'none'
      }
      if(mainTranscript.length >= 4){

        console.log(JSON.stringify(mainTranscript));
      }
    }else{
      return
    }
  }, [mainTranscript]);

  return (
    <>
      {!is_iOS ? (
        <div className={styles.chatModule}>
          <div className={styles.chatContainer}>
            <div className={styles.chatScreen} ref={chatScreenRef}>
              {mainTranscript ? (
               <>
               {hasPermission ? (
                 <>
                   {/* Render instructional messages */}
                   {instructionMessages.map((msg) => (
                     <div
                       key={msg.id}
                       className={`${styles.chatBubble} ${
                         msg.sender === "user" ? styles.userBubble : styles.nyxBubble
                       } init-messages`}
                     >
                       {msg.text && <p>{msg.text}</p>}
                     </div>
                   ))}
             
                   {/* Render options as buttons or, if one is selected, render it in its own bubble */}
                   <div className={styles.optionsContainer}>
                     {!selectedOption ? (
                       optionMessages.map((option) => (
                         <button
                           key={option.id}
                           className={styles.optionButton}
                           onClick={() => {
                             // When an option is clicked, store it as the selected option...
                             setSelectedOption(option);
             
                             // ...and append it to the transcript if desired.
                             setMainTranscript((prevTranscript) => [
                               ...prevTranscript,
                               {
                                 id: prevTranscript.length + 1,
                                 sender: option.text ? "app" : "user",
                                 text: option.text,
                                 audio: false,
                                 audio_file: null,
                               },
                             ]);
             
                             // Show additional controls if needed.
                             setControlsVisible(true);
                           }}
                         >
                           {option.text}
                         </button>
                       ))
                     ) : (
                       // Render only the selected option message in a styled bubble
                        mainTranscript.map((item)=>{
                          return(
                            <div
                            key={item.id}
                            className={`${styles.chatBubble} ${
                              item.sender === "app" ? styles.nyxBubble : styles.userBubble
                            }`}
                          >
                            {item.audio ? (
                              // Use URL.createObjectURL on the blob stored in audio_file.
                              <audio controls src={URL.createObjectURL(item.audio_file)} />
                            ) : (
                              <p>{item.text}</p>
                            )}
                          </div>
                          )
                        })
                     )}
                   </div>
                 </>
               ) : (
                 // Fallback: render a list of messages when permission is not granted.
                 messages.map((msg) => (
                   <div
                     key={msg.id}
                     className={`${styles.chatBubble} ${
                       msg.sender === "app" ? styles.nyxBubble : styles.userBubble
                     }`}
                   >
                     {msg.text && <p>{msg.text}</p>}
                   </div>
                 ))
               )}
             </>
             
              ) : (
                <>
                  {hasPermission ? (
                    <>
                      {/* Render instructional messages */}
                      {instructionMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`${styles.chatBubble} ${
                            msg.sender === "app" ? styles.nyxBubble : styles.userBubble
                          }`}
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
                              className={styles.optionButton}
                              onClick={() => {
                                // Set the selected option for display
                                setSelectedOption(option);

                                // Append a new transcript entry
                                setMainTranscript((prevTranscript) => [
                                  ...prevTranscript,
                                  {
                                    id: (mainTranscript.length + 1),
                                    sender: "user",
                                    text: option.text,
                                    audio: false,
                                    audio_file: null,
                                  },
                                ]);

                                // Optionally show the controls if needed
                                setControlsVisible(true);
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
                        className={`${styles.chatBubble} ${
                          msg.sender === "app" ? styles.nyxBubble : styles.userBubble
                        }`}
                      >
                        {msg.text && <p>{msg.text}</p>}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>

            {/* Render the permission or chat controls only while `controlsVisible` is true */}
            {controlsVisible &&
              (!hasPermission ? (
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
                    <button className="demo-buttons" type="submit">Send</button>
                  </form>

                  <div className={styles.audioControls}>
                    <button className="demo-buttons" onClick={startRecording} disabled={!hasPermission || isRecording}>
                    🔴 Start Recording
                    </button>
                    <button className="demo-buttons" onClick={stopRecording} disabled={!isRecording}>
                      ⏹ Stop
                    </button>
                    {audioBlob && (
                      <div className={styles.audioPreview}>
                        <audio src={URL.createObjectURL(audioBlob)} controls />
                        <button className="demo-buttons" onClick={handleAudioSend}>Send Audio</button>
                      </div>
                    )}
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : (
        <>
          {iOSMessages.map((msg) => (
            <React.Fragment key={msg.id}>
              <p className={styles.iosMessage}>{msg.text}</p>
              <button className="demo-buttons" onClick={(e) => scrollToElement(e, contactElement)}>
                Contact for Support
              </button>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}
