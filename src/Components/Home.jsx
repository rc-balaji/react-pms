import React, { useState, useEffect } from "react";
import "./Home.css";
import { Nav } from "../Navbar/Nav";
import axios from "axios"; // Import Axios
import { useUserContext } from "../Context/UserContext";

export const Home = () => {
  const { user } = useUserContext();

  const userStorageKey = `userData_${user.name}`; // Create a unique storage key for each user
  const storedUserData = JSON.parse(localStorage.getItem(userStorageKey)) || {};
  const mergedUser = { ...user, ...storedUserData };
  localStorage.setItem(userStorageKey, JSON.stringify(mergedUser));

  const [allotedTask, setAllotedTask] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);

  useEffect(() => {
    console.log("Fetching task data...");
    axios
      .get("http://localhost:3001/api/tasks")
      .then((response) => {
        const tasks = response.data;
        console.log("Received task data:", tasks);
        setAllotedTask(tasks[mergedUser.name] || []);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });

    axios
      .get("http://localhost:3001/api/project")
      .then((response) => {
        const projectData = response.data;
        console.log("Received project data:", projectData);
        setProjectData(projectData);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [mergedUser.name]);

  const handleButtonClick = (index) => {
    const updatedTasks = [...allotedTask];
    if (updatedTasks[index].status === "Not Started") {
      updatedTasks[index].status = "Pending";
    } else if (updatedTasks[index].status === "Pending") {
      updatedTasks[index].status = "Complete";
    }

    console.log("Updating task data...", updatedTasks);

    axios
      .put("http://localhost:3001/api/tasks/update", {
        user: mergedUser.name,
        task: updatedTasks[index],
      })
      .then((response) => {
        console.log("Updated task data:", response.data);
        setAllotedTask(updatedTasks);

        const allTasksCompleted = updatedTasks.every(
          (task) => task.status === "Complete"
        );

        if (allTasksCompleted) {
          updateProjectStatus("Completed");
        } else {
          updateProjectStatus("Pending");
        }
      })
      .catch((error) => {
        console.error("Error updating task data:", error);
      });
  };

  const updateProjectStatus = async (status) => {
    setIsUpdatingProject(true);

    await axios
      .put("http://localhost:3001/api/project", {
        user: mergedUser.name,
        status: status,
      })
      .then((response) => {
        console.log("Updated project status:", response.data);
        setIsUpdatingProject(false);
      })
      .catch((error) => {
        console.error("Error updating project status:", error);
        setIsUpdatingProject(false);
      });
  };

  if (!mergedUser || !mergedUser.name) {
    return (
      <div>
        <Nav />
        <div className="home-container">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  const teamLeader = "Ramesh";

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
