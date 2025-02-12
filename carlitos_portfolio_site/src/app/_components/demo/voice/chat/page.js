"use client";

import React, { useEffect, useState, useRef } from "react";
import { UserData } from "../../userAgent/data_retriver";
import { voice_api_with_audio,  backend_api_context_chat } from "../backend";
import styles from "./ChatModule.module.css";
import { IoIosRefresh } from "react-icons/io";

export default function ChatModule() {
  // =====================
  // 1) STATE DECLARATIONS
  // =====================
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [is_iOS, setIs_iOS] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chatScreenRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  // Text input
  const [newMessage, setNewMessage] = useState("");
  // After first audio sent, show text input only
  const [hasSentAudio, setHasSentAudio] = useState(false);
  // Which option (phrase) the user selected
  const [selectedOption, setSelectedOption] = useState(null);

  // This holds the chat transcript for *current* display
  const [mainTranscript, setMainTranscript] = useState([]);

  // So we can scroll to "contact" if on iOS
  const [contactElement, setContactElement] = useState(null);

  // This toggles microphone controls
  const [controlsVisible, setControlsVisible] = useState(true);

  // =======================
  // 2) PREDEFINED MESSAGES
  // =======================
  const initialOptions = [
    "Let's meet at the coffee shop. We can catch up there.",
    "I recently started learning to play the guitar. It's challenging but incredibly rewarding.",
    "Converging technological innovations can disrupt traditional industries and redefine market paradigms.",
  ];

  // The code below will run if iOS is detected:
  const iOSMessages = [
    {
      id: 1,
      sender: "app",
      text: `Hey there! 👋 Just a quick heads-up—iOS has some internal microphone restrictions that prevent this feature from working smoothly.
While there is a way to manually update your phone settings, reverting those changes could be tricky for most users.
To experience this demo, I recommend trying on an Android device or desktop instead. Thanks for your patience! 😊🚀`,
    },
  ];

  // When you refresh, you see these "options" again
  // so let's store them in a separate "initial" screen
  const initialScreen = (
    <div className={styles.chatBubble}>
      <div className={styles.nyxBubble}>
        <p>Hi! I'm your AI voice coach. Tap an option below to practice that phrase, by recording your voice and sending it to me to analyze!</p>
      </div>
      <div className={styles.optionsContainer}>
        {initialOptions.map((optionText, index) => (
          <button
            key={index}
            className={styles.optionButton}
            onClick={() => handleOptionClick(optionText)}
          >
            {optionText}
          </button>
        ))}
      </div>
    </div>
  );

  // =========================
  // 3) DETECT iOS & MICROPHONE
  // =========================
  useEffect(() => {
    const checkFor_iOS = async () => {
      try {
        const data = await UserData();
        setIs_iOS(data.device.os.name === "iOS");
      } catch (error) {
        console.error("Error detecting OS:", error);
      }
    };
    setContactElement(document.querySelector("#contact"));
    checkFor_iOS();
  }, []);

  // For non-iOS: check microphone permission
  useEffect(() => {
    if (is_iOS) return; // skip on iOS
    const checkMicrophonePermission = async () => {
      try {
        const storedPermission = localStorage.getItem("microphonePermission");
        if (storedPermission === "granted") {
          setHasPermission(true);
          return;
        }

        // Check permission
        const permission = await navigator.permissions.query({ name: "microphone" });
        if (permission.state === "granted") {
          localStorage.setItem("microphonePermission", "granted");
          setHasPermission(true);
        } else if (permission.state === "denied") {
          alert("Microphone access is blocked. Please enable it in your browser settings.");
        }

        // Watch for changes
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

  // Keep chat scrolled to bottom
  useEffect(() => {
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = chatScreenRef.current.scrollHeight;
    }
  }, [mainTranscript, selectedOption]);

  // =======================
  // 4) RECORDING FUNCTIONS
  // =======================
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

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(blob);
        // stop all tracks
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

  // ================================
  // 5) SENDING TEXT / AUDIO MESSAGES
  // ================================
  useEffect(() => {
    if (!isSending) return;
  
    const sendToBackend = async () => {
      try {
        // For example, you might do something like:
        const response = await  backend_api_context_chat(mainTranscript);
        console.log('trained response\n', JSON.stringify(response), typeof response)
        // Suppose the server reply is in `response.replyText`
        setMainTranscript((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "app",
            text: response.received_texts[response.received_texts.length-1].text,
            audio: false,
            audio_file: null,
          },
        ]);
  
        // Finished sending
        setIsSending(false);
      } catch (err) {
        console.error("Error sending to backend:", err);
        setIsSending(false);
      }
    };
  
    sendToBackend();
  }, [isSending, mainTranscript]);


  
  const handleTextSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    // 1) Immediately set isSending true
    setIsSending(true);
  
    // 2) Append user’s message
    setMainTranscript((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: newMessage,
        audio: false,
        audio_file: null,
      },
    ]);
  
    // 3) Clear input
    setNewMessage("");
  };
  
  const handleAudioSend = async () => {
    if (!audioBlob) {
      alert("Recording Failed: No audio found.");
      return;
    }

    // 1) Append the audio to the chat so it's playable
    setMainTranscript((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: "",
        audio: true,
        audio_file: audioBlob,
      },
    ]);

    // 2) Optionally send to your backend (comment out if not needed)
    try {
      const phrase = selectedOption || "";
      const jsonResponse = await voice_api_with_audio(audioBlob, phrase);
      console.log("Response from backend:", jsonResponse);

      // If you want to show the server response, create a new bubble:
      if (jsonResponse?.result?.text) {
        setMainTranscript((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "app",
            text: jsonResponse.result.text,
            audio: false,
            audio_file: null,
          },
        ]);
      }
    } catch (error) {
      console.error("Error handling audio data:", error);
      alert("An error occurred while processing the audio data.");
    }

    // 3) Now that we've sent at least one audio message, hide recording controls
    //    and show text input only
    setAudioBlob(null);
    setHasSentAudio(true);
  };

  // ================
  // 6) OPTION SELECT
  // ================
  const handleOptionClick = (optionText) => {
    setSelectedOption(optionText);

    // Replace the main transcript with the instructions + chosen phrase
    setMainTranscript([
      {
        id: 1,
        sender: "app",
        text: `When you're ready, tap { 🔴 Start Recording } and repeat the phrase. When finished, tap { ⏹ Stop }. If you're happy with your recording, tap Send Audio. To record again, simply tap { 🔴 Start Recording } to begin a new recording.`,
        audio: false,
        audio_file: null,
      },
      {
        id: 2,
        sender: "app",
        text: `Say your phrase: "${optionText}"`,
        audio: false,
        audio_file: null,
      },
      {
        id: 3,
        sender: "app",
        text: `"${optionText}"`,
        audio: false,
        audio_file: null,
      }
    ]);

    // Make sure controls are visible for recording
    setControlsVisible(true);
  };

  // ===========================
  // 7) REFRESH - "RESTART" LOGIC
  // ===========================
  const handleRefresh = () => {
    // Reset everything to default
    setSelectedOption(null);
    setHasSentAudio(false);
    setAudioBlob(null);
    setNewMessage("");
    setIsRecording(false);
    setMainTranscript([]);
    if (chatScreenRef.current) {
      chatScreenRef.current.scrollTop = 0;
    }
  };

  // iOS fallback
  const scrollToElement = (e, element) => {
    e.preventDefault();
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
  };

  // =====================
  // 8) RENDERING FUNCTION
  // =====================
  const renderChatBubbles = () => {
    // If user is on desktop/Android but hasn't allowed permission,
    // show "permission needed" message
    if (!hasPermission && !is_iOS) {
      return (
        <div className={styles.chatBubble}>
          <div className={styles.nyxBubble}>
            <p>Please grant microphone access to proceed.</p>
          </div>
        </div>
      );
    }

    // If no option is selected, show the initial screen with options
    if (!selectedOption) {
      return initialScreen;
    }

    // Else, show the main transcript (instructions + user's recordings, etc.)
    return (
      <>
        {mainTranscript.map((item) => (
          <div
            key={item.id}
            className={`${styles.chatBubble} ${
              item.sender === "app" ? styles.nyxBubble : styles.userBubble
            }`}
          >
            {item.audio ? (
              <audio controls src={URL.createObjectURL(item.audio_file)} />
            ) : (
              <p>{item.text}</p>
            )}
          </div>
        ))}
      </>
    );
  };

  // ====================
  // 9) MAIN RENDER RETURN
  // ====================
  return (
    <>
      {!is_iOS ? (
        <div className={styles.chatModule}>
          <div className={styles.chatContainer}>
            {/* Refresh Button */}
            <div className={styles.refreshButtonContainer}>
              <button className="demo-buttons" onClick={handleRefresh}>
                <IoIosRefresh size={16} style={{
                  marginRight: "5px"
                }} /> Restart Demo
              </button>
            </div>

            {/* Chat Screen */}
            <div className={styles.chatScreen} ref={chatScreenRef}>
              {renderChatBubbles()}
            </div>

            {/* Controls */}
            {controlsVisible && !hasSentAudio && hasPermission && selectedOption && (
              <div className={styles.audioControls}>
                <button
                  className="demo-buttons"
                  onClick={startRecording}
                  disabled={!hasPermission || isRecording}
                >
                  🔴 Start Recording
                </button>
                <button
                  className="demo-buttons"
                  onClick={stopRecording}
                  disabled={!isRecording}
                >
                  ⏹ Stop
                </button>
                {audioBlob && (
                  <div className={styles.audioPreview}>
                    <audio src={URL.createObjectURL(audioBlob)} controls />
                    <button className="demo-buttons" onClick={handleAudioSend}>
                      Send Audio
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Once user has sent audio, show text input */}
            {hasSentAudio && (
              <form className={styles.chatInput} onSubmit={handleTextSend}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="demo-buttons" type="submit">
                  Send
                </button>
              </form>
            )}

            {/* If permission not granted, ask to grant it */}
            {!hasPermission && !is_iOS && (
              <div className={styles.permissionContainer}>
                <p>Microphone permission is not granted.</p>
                <button onClick={requestPermissionManually}>Grant Microphone Access</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // If iOS is detected
        iOSMessages.map((msg) => (
          <React.Fragment key={msg.id}>
            <p className={styles.iosMessage}>{msg.text}</p>
            <button className="demo-buttons" onClick={(e) => scrollToElement(e, contactElement)}>
              Contact for Support
            </button>
          </React.Fragment>
        ))
      )}
    </>
  );
}
