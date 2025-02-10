"use client";

import React, { useState } from "react";
import "./layout.css"; // or convert this to a CSS module if you prefer
import es_logo from "../../../../../public/images/easyspeak-logo.svg"; // Note the /public directory
import Image from "next/image";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import ChatModule from "./chat/page";
// import { db } from "@/database/firebaseConnection"; // If you’re using Firebase
// import { collection, addDoc } from "firebase/firestore";

const InputField = styled(TextField)({
  "& label": {
    color: "#4d3e3e",
  },
  "& .MuiInputBase-input": {
    color: "#4d3e3e",
  },
  "& label.Mui-focused": {
    color: "#4d3e3e",
  },
});

export default function ES_PROJECT() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [h_fname, setH_FName] = useState("");
  const [h_lname, setH_LName] = useState("");
  const [h_email, setH_Email] = useState("");
  const [chatModule, setChatModule] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    if (fname.length < 2) {
      setH_FName("Must be at least 2 characters");
    }
    if (lname.length < 2) {
      setH_LName("Must be at least 2 characters");
    }
    if (!validEmail.test(email)) {
      setH_Email("Invalid Email");
    }
    if (validEmail.test(email) && fname.length >= 2 && lname.length >= 2) {
      setH_Email("");
      setH_FName("");
      setH_LName("");
      // const docRef = await addDoc(collection(db, "es_project"), {
      //   first_name: fname,
      //   last_name: lname,
      //   email: email
      // });
      // console.log("Document written with ID: ", docRef.id);

      setChatModule(true);
    }
  };

  return (
    <div id="es-demo" className="es-project-main">
      <div className="es-project-container">
        {/* If you prefer Next’s <Image>, replace this <img> with <Image src={es_logo} ... /> */}
        <Image
          src={es_logo}
          alt="ES"
          id="es-logo-icon"
          />
        {chatModule ? (
          <ChatModule />
        ) : (
          <>
            <div className="es-project-buttons-container">
              <InputField
                className="es-project-inputs"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                autoComplete="off"
                helperText={h_fname}
                onChange={(e) => setFName(e.target.value)}
              />
              <InputField
                className="es-project-inputs"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                helperText={h_lname}
                onChange={(e) => setLName(e.target.value)}
              />
              <InputField
                className="es-project-inputs"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                helperText={h_email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="es-demo-buttons" onClick={handleClick}>
              Start Demo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
