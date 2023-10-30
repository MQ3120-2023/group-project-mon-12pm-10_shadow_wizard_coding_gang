import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect, createContext, useContext } from "react";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import SubsPage from "./pages/SubsPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/LightMode.css";

// Create a context for the current user
export const CurrentUserContext = createContext(null);

function AppWrapper() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                <App />
            </CurrentUserContext.Provider>
        </Router>
    );
}


function App() {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    // useEffect(() => {
    //     const currentPath = location.pathname;
    //     if (currentUser) {
    //         console.log("User logged in");
    //     } else if (!currentUser && currentPath !== "/" && currentPath !== "/signup") {
    //         console.log("No User logged in");
    //         window.location.href = "/";
    //     }
    // }, [currentUser, location]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/subscriptions" element={<SubsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}

export default AppWrapper;
