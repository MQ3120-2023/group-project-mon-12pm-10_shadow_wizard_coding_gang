import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import SubsPage from "./pages/SubsPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/LightMode.css";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}



function App() {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    axios.get("http://localhost:3001/currentUser")
    .then(response => {
        const { currentUser } = response.data;
        if (currentUser) {
          // Do something with currentMember
        }
        else if (!currentUser && currentPath !== '/' && currentPath !== '/signup') {
          window.location.href = '/';
        }
    })
    .catch(error => {
        console.error("Error fetching current user:", error);
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/subscriptions" element={<SubsPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Routes>
    </div>
  );
}

export default AppWrapper;
