import React, { useState } from "react";
import ChartPage from "./Chart";
import "./ProjectStatus.css"; // Import the CSS file
import { Nav } from "../Navbar/Nav";
import { useUserContext } from "../Context/UserContext";

export const ProjectStatus = () => {
  const { project } = useUserContext(); // Access project from context
  console.log(project);
  const [employeeData, setEmployeeData] = useState(project);
  //         [
  //     { name: "Raj", Task: "UI/UX", duration: 70, Status: "Completed" },
  //     {
  //       name: "Ram",
  //       Task: "Object Detection",
  //       duration: 50,
  //       Status: "Pending",
  //     },
  //     {
  //       name: "Sam",
  //       Task: "Text Recognition",
  //       duration: 60,
  //       Status: "Pending",
  //     },
  //     { name: "Sakthi", Task: "Production", duration: 45, Status: "Completed" },
  //     { name: "Suvi", Task: "Deploy", duration: 10, Status: "Not Start" },
  //     { name: "Sam", Task: "Deploy", duration: 10, Status: "Completed" },
  //     { name: "Sami", Task: "Deploy", duration: 40, Status: "Not Start" },
  //   ]);

  return (
    <div>
      <Nav />
      <div className="project-status-container">
        <h1>Project Status</h1>
        <ChartPage
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
        />
      </div>
    </div>
  );
};
