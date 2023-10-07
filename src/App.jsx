import { useState } from "react";

import "./App.css";
import { ProjectStatus } from "./Components/ProjectStautus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./Navbar/Nav";
// import { ProjectStatus } from "./Components/ProjectStautus";
import { Home } from "./Components/Home";
import { ProjectDetail } from "./Components/ProjectDetail";
import { Index } from "./Sign";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/prod" element={<ProjectDetail />} />
          <Route path="/pros" element={<ProjectStatus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
