import React from "react";
import { useNavigate } from "react-router";
import "./Nav.css"; // Import the CSS file
import { useUserContext } from "../Context/UserContext";
export const Nav = () => {
  const navigate = useNavigate();
  const { user, project, userTask } = useUserContext(); // Access user-related data from context

  // const { user } = useUserContext();
  // const navigate = useNavigate();

  // Define a key to store user data in localStorage
  const userStorageKey = "userData";

  // Load user data from localStorage, or use an empty object if it doesn't exist
  const storedUserData = JSON.parse(localStorage.getItem(userStorageKey)) || {};

  // Merge the loaded user data with the user data from context
  const mergedUser = { ...user, ...storedUserData };

  // Save the merged user data back to localStorage
  localStorage.setItem(userStorageKey, JSON.stringify(mergedUser));

  // Check if user is null/undefined or has no 'name' property
  if (!mergedUser || !mergedUser.name) {
    // You can handle this case, e.g., redirect the user or show an error message
    return (
      <div>
        <p>Loading user data...</p>
      </div>
    );
  }

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
        <li className="nav-items">{user ? user.name : ""}</li>
        <li
          className="nav-item nav-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};
