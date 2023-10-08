// Signin.js
import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router";
import { useUserContext } from "../Context/UserContext";
// Import the useUserContext hook
import { authenticateUser } from "./AuthService"; // Import the authentication service

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setUserTask, setProject } = useUserContext(); // Access the context

  const Task = {
    Raj: [
      {
        Work: "UI/UX",
        duration: "10",
        status: "Not Started",
      },
      {
        Work: "Table",
        duration: "20",
        status: "Not Started",
      },
      {
        Work: "UI/UX",
        duration: "30",
        status: "Not Started",
      },
    ],
    Sam: [
      {
        Work: "CSS",
        duration: "20",
        status: "Not Started",
      },
      {
        Work: "Figma",
        duration: "30",
        status: "Not Started",
      },
      {
        Work: "Redux",
        duration: "40",
        status: "Not Started",
      },
    ],
    Ram: [
      {
        Work: "MongoDB",
        duration: "40",
        status: "Not Started",
      },
      {
        Work: "Express",
        duration: "40",
        status: "Not Started",
      },
      {
        Work: "API",
        duration: "40",
        status: "Not Started",
      },
    ],
  };

  const project = [
    {
      name: "Raj",
      Task: "UI/UX",
      duration: 60,
      Status: "Not Start",
    },
    {
      name: "Sam",
      Task: "CSS",
      duration: 90,
      Status: "Not Start",
    },
    {
      name: "Ram",
      Task: "MongoDB",
      duration: 120,
      Status: "Not Start",
    },
  ];
  const handleSignin = () => {
    const user = authenticateUser(email, password);

    if (user) {
      const userTask = Task[user.name];
      setUser(user);
      setUserTask(userTask);
      setProject(project);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="input-container">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button className="signin-button" onClick={handleSignin}>
        Sign In
      </button>
    </div>
  );
};

export default Signin;
