import React, { useState, useEffect } from "react";
import Home from "./page/home.page";
import Signup from "./page/signup.page";
import Login from "./page/login.page";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { FIREBASE_AUTH } from "./config/firebase";

function CustomRouter() {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user === null) {
        navigate("/")
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <section>
        <Routes>
          {" "}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </section>
    </div>
  )
}

function App() {
  return (
    <Router>
      <CustomRouter/>
    </Router>
  );
}

export default App;