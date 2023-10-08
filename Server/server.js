const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { log } = require("console");

const PORT = process.env.PORT || 3001;
const JSON_TASKS_FILE_PATH = "./task.json"; // Replace with the actual path to your task JSON file
const JSON_PROJECT_FILE_PATH = "./project.json"; // Replace with the actual path to your project JSON file

app.use(express.json());
app.use(cors());



app.put("/api/project", async (req, res) => {
    const userName = req.body.user;
    const updatedStatus = req.body.status;
    console.log("Requested update");
  
    await fs.readFile(JSON_PROJECT_FILE_PATH, "utf8", (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      try {
        const projectData = JSON.parse(data);
        console.log("read");
  
        // Find the project with the matching user name
        const projectToUpdate = projectData.find((project) => project.name === userName);
  
        if (projectToUpdate) {
          projectToUpdate.Status = updatedStatus; // Update the status
  
          // Write the modified data back to the JSON file
          fs.writeFile(JSON_PROJECT_FILE_PATH, JSON.stringify(projectData), (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
              res.status(500).json({ error: "Error updating project status" });
              return;
            }
            console.log("error");
            res.json({ success: true });
          });
        } else {
          res.status(404).json({ error: "User not found in project data" });
        }
      } catch (parseError) {
        console.error(parseError);
        res.status(500).json({ error: "Failed to parse JSON" });
      }
    });
  });
  


app.get("/api/tasks", (req, res) => {
    console.log("Requested")

  fs.readFile(JSON_TASKS_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const tasks = JSON.parse(data);
      res.json(tasks);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

app.put("/api/tasks/update", (req, res) => {
  const userName = req.body.user;
  const updatedTask = req.body.task;
  console.log("Requested")


  fs.readFile(JSON_TASKS_FILE_PATH, "utf8", (readErr, data) => {
    if (readErr) {
      console.error(readErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      const tasksData = JSON.parse(data);

      if (tasksData[userName]) {
        const userTasks = tasksData[userName];

        // Find and update the specific task by matching its properties
        const taskToUpdate = userTasks.find(
          (task) =>
            task.Work === updatedTask.Work &&
            task.duration === updatedTask.duration
        );

        if (taskToUpdate) {
          taskToUpdate.status = updatedTask.status;
        }

        // Write the modified data back to the JSON file
        fs.writeFile(JSON_TASKS_FILE_PATH, JSON.stringify(tasksData), (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            res.status(500).json({ error: "Error updating tasks" });
            return;
          }
          res.json({ success: true });
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

app.get("/api/project", (req, res) => {
    console.log("Requested")

  fs.readFile(JSON_PROJECT_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const project = JSON.parse(data);
      res.json(project);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});


  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
