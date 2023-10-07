import React from "react";
import { useNavigate } from "react-router";
import "./Nav.css"; // Import the CSS file
import { useUserContext } from "../Context/UserContext";
export const Nav = () => {
  const navigate = useNavigate();
  const { user, project, userTask } = useUserContext(); // Access user-related data from context

  return (
    <div>
      <ul className="nav-bar">
        <li className="nav-item">PSM</li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/prod");
          }}
        >
          Project Details
        </li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/pros");
          }}
        >
          Project Status
        </li>
        <li className="nav-item">{user ? user.name : ""}</li>
        <li
          className="nav-item nav-button"
          onClick={() => {
            // Here, you can reset the user context when signing out
            // For example, you can call setUser(null) to clear user data
            navigate("/");
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};
