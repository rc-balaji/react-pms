// ProjectDetail.jsx
import React, { useState, useEffect } from "react";
import "./ProjectDetail.css";
import { Nav } from "../Navbar/Nav";
import axios from "axios"; // Import Axios
import { useUserContext } from "../Context/UserContext";

export const ProjectDetail = () => {
  const { user } = useUserContext();
  const teamLeader = "Ramesh";
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/project") // Replace with your server's endpoint
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  // Function to get the row color based on status
  const getRowColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "yellow";
      case "Not Start":
        return "red";
      default:
        return "";
    }
  };

  // Calculate total duration
  const totalDuration = project.reduce((acc, item) => acc + item.duration, 0);

  // Calculate end date (assuming a start date is known)
  const startDate = new Date(); // Replace with the actual start date
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + totalDuration);

  return (
    <div>
      <Nav />
      <div className="project-detail-container">
        <h4 className="team-leader">Team Leader: {teamLeader}</h4>
        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {project.map((item, index) => (
              <tr
                key={index}
                className={`project-row ${getRowColor(item.Status)}`}
              >
                <td>{item.name}</td>
                <td>{item.Task}</td>
                <td>{item.duration}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="total-duration">Total Duration: {totalDuration} min</p>
        {/* <p className="end-date">End Date: {endDate.toDateString()}</p> */}
      </div>
    </div>
  );
};
