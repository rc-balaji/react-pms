import React, { useState } from "react";
import "./Home.css"; // Import the CSS file for styling
import { Nav } from "../Navbar/Nav";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export const Home = () => {
  // Access the Task data using useLocation
  const location = useLocation();
  const Task = location.state ? location.state.userTask : [];
  const project = location.state ? location.state.project : [];

  console.log(project);

  // console.log(Task);

  // Initialize allotedTask with the Task data
  const initialAllotedTask = Task || [];

  const [allotedTask, setAllotedTask] = useState(initialAllotedTask);

  const handleButtonClick = (index) => {
    const updatedTasks = [...allotedTask];
    if (updatedTasks[index].status === "Not Started") {
      updatedTasks[index].status = "Pending";
    } else if (updatedTasks[index].status === "Pending") {
      updatedTasks[index].status = "Complete";
    }
    setAllotedTask(updatedTasks);
  };

  return (
    <div>
      <Nav />

      <div className="home-container">
        <h3>Your Allotted Tasks</h3>
        <table className="task-table">
          <thead>
            <tr>
              <th style={{ color: "black" }}>S.No</th>
              <th style={{ color: "black" }}>Work</th>
              <th style={{ color: "black" }}>Duration</th>
              <th style={{ color: "black" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {allotedTask.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.Work}</td>
                <td>{task.duration}</td>
                <td>
                  <button
                    className={`action-button ${
                      task.status === "Complete" ? "disabled" : ""
                    }`}
                    onClick={() => handleButtonClick(index)}
                    disabled={task.status === "Complete"}
                  >
                    {task.status === "Not Started"
                      ? "Start"
                      : task.status === "Pending"
                      ? "Complete"
                      : "Completed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
