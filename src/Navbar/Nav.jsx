import React from "react";
import { useNavigate, useLocation } from "react-router";
import "./Nav.css"; // Import the CSS file

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Get user info from location state
  //   console.log(user);
  const project = location.state ? location.state.project : [];
  const userTask = location.state ? location.state.userTask : {};
  console.log(project);

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
            navigate("/prod", { state: { user, userTask, project } });
          }}
        >
          Project Details
        </li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/pros", { state: { user, userTask, project } });
          }}
        >
          Project Status
        </li>
        <li className="nav-item">{user ? user.name : ""}</li>
        <li
          className="nav-item nav-button"
          onClick={() => {
            navigate("/", { state: { user, userTask, project } });
          }}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

// export default Nav;
