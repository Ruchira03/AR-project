import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API } from "./backend";
import Homepage from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import "./App.scss";
function App() {
  console.log("API IS ", API);
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/userhomepage" element={<Homepage />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
