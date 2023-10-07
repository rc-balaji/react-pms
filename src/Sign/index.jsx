import React, { useState } from "react";
import Signin from "./Signin";
import SignUp from "./SignUp";
import "./Index.css"; // Import the CSS file for styling

export const Index = () => {
  const [Type, SetType] = useState("SignIN");

  return (
    <div className="container">
      <div className="header">
        <ul className="button-container">
          <li>
            <button
              className="button"
              onClick={() => {
                SetType("SignIN");
              }}
            >
              Sign IN
            </button>
          </li>
          <li>
            <button
              className="button"
              onClick={() => {
                SetType("SignUP");
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
      <div className="body">{Type === "SignIN" ? <Signin /> : <SignUp />}</div>
    </div>
  );
};
