import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
