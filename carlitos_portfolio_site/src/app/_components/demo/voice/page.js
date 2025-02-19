"use client";

import React, { useState } from "react";
import "./layout.css"; // or convert this to a CSS module if you prefer

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import ChatModule from "./chat/page";
// import { db } from "@/database/firebaseConnection"; // If you’re using Firebase
// import { collection, addDoc } from "firebase/firestore";

const InputField = styled(TextField)({
  "& label": {
    color: "#fff",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
});

export default function ES_PROJECT() {
  // Input values
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");

  // Error messages & error state for each input
  const [h_fname, setH_FName] = useState("");
  const [h_lname, setH_LName] = useState("");
  const [h_email, setH_Email] = useState("");

  const [error_fname, setError_FName] = useState(false);
  const [error_lname, setError_LName] = useState(false);
  const [error_email, setError_Email] = useState(false);

  // Checkbox state and error message for data sharing
  const [agreeShareData, setAgreeShareData] = useState(false);
  const [shareDataError, setShareDataError] = useState("");

  // State to toggle the chat module
  const [chatModule, setChatModule] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    let valid = true;
    const validEmailRegex = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );

    // Validate the data sharing checkbox
    if (!agreeShareData) {
      setShareDataError("You must agree to share data to continue.");
      valid = false;
    } else {
      setShareDataError("");
    }

    // Validate first name
    if (fname.trim().length < 2) {
      setH_FName("Must be at least 2 characters");
      setError_FName(true);
      valid = false;
    } else {
      setH_FName("");
      setError_FName(false);
    }

    // Validate last name
    if (lname.trim().length < 2) {
      setH_LName("Must be at least 2 characters");
      setError_LName(true);
      valid = false;
    } else {
      setH_LName("");
      setError_LName(false);
    }

    // Validate email
    if (!validEmailRegex.test(email)) {
      setH_Email("Invalid Email");
      setError_Email(true);
      valid = false;
    } else {
      setH_Email("");
      setError_Email(false);
    }

    // If all validations pass, proceed to the chat module
    if (valid) {
      // Optional: You can add your data submission logic here
      // const docRef = await addDoc(collection(db, "es_project"), {
      //   first_name: fname,
      //   last_name: lname,
      //   email: email,
      // });

      setChatModule(true);
    }
  };

  return (
    <div id="es-demo" className="es-project-main">
      <div className="es-project-container">
        {/* Uncomment and use Next.js <Image> if preferred */}
        {/* <Image src={es_logo} alt="ES" id="es-logo-icon" /> */}
        <h1 className="voice-demo-title">AI Accent Detection</h1>
        {chatModule ? (
          <ChatModule />
        ) : (
          <>
            <div className="es-project-buttons-container">
              <InputField
                className="es-project-inputs"
                id="first-name-input"
                label="First Name"
                variant="outlined"
                autoComplete="off"
                helperText={h_fname}
                error={error_fname}
                onChange={(e) => setFName(e.target.value)}
              />
              <InputField
                className="es-project-inputs"
                id="last-name-input"
                label="Last Name"
                variant="outlined"
                helperText={h_lname}
                error={error_lname}
                onChange={(e) => setLName(e.target.value)}
              />
              <InputField
                className="es-project-inputs"
                id="email-input"
                label="Email"
                variant="outlined"
                type="email"
                helperText={h_email}
                error={error_email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeShareData}
                    onChange={(e) => {
                      setAgreeShareData(e.target.checked);
                      // Clear error when the user checks the box
                      if (e.target.checked) setShareDataError("");
                    }}
                    style={{ color: "#fff" }}
                  />
                }
                label="I agree to share data"
              />
              {shareDataError && (
                <p id="outlined-basic-helper-text" style={{ color: "#d32f2f" }}>
                  {shareDataError}
                </p>
              )}
            </div>
            <button className="demo-buttons" onClick={handleClick}>
              Start Demo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
