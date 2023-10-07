import React, { useContext } from "react";
import "./ProjectDetail.css"; // Import the CSS file for styling
import { Nav } from "../Navbar/Nav";
import { useUserContext } from "../Context/UserContext"; // Import the useProjectContext hook

export const ProjectDetail = () => {
  const { project } = useUserContext(); // Access project from context
  console.log(project);

  const teamLeader = "Ramesh";

  // Calculate total duration
  const totalDuration = project.reduce((acc, item) => acc + item.duration, 0);

  // Calculate end date (assuming a start date is known)
  const startDate = new Date(); // Replace with the actual start date
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + totalDuration);

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
        <p className="total-duration">Total Duration: {totalDuration}</p>
        <p className="end-date">End Date: {endDate.toDateString()}</p>
      </div>
    </div>
  );
};
