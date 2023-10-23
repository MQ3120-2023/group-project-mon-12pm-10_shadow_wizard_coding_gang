import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import SubsPage from "./pages/SubsPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/LightMode.css";

function App() {
    const [username, setUsername] = useState(null);
    
      useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);
    return (
        <div>

        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/explore" element={<ExplorePage/>}/>
                <Route path="/subscriptions" element={<SubsPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
            </Routes>
        </Router>
        
        </div>
    );
}

export default App;
