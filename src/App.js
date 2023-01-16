import "./App.css";
import React from "react";
import Header from "./MyComponents/Header";
import { Login } from "./MyComponents/Login";
import { SignUp } from "./MyComponents/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./MyComponents/Home";
import About from "./MyComponents/About";
import NoteState from "./context/notes/NoteState";
import AdminLogin from "./MyComponents/AdminLogin";
import AdminSign from "./MyComponents/AdminSign";
import Database from "./MyComponents/Database";
import Django from "./MyComponents/Django";

function App() {
  return (
    <NoteState>
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/admin/signup" element={<AdminSign />} />
          <Route exact path="/admin/database" element={<Database />} />
        </Routes>
      </Router> 
    </NoteState>
    
  );
}

export default App;
