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
import axios from "axios";

// Create a context for the current user
export const CurrentUserContext = createContext(null);

function AppWrapper() {
    const [currentUser, setCurrentUser] = useState(null);

    const refreshCurrentUser = async () => {
        try {
            const response = await axios.get("/currentUser");
            const user = response.data;
            if (user) setCurrentUser(user);
            else {
                if (window.location.pathname !== "/" && window.location.pathname !== "/signup")
                    window.location.href = "/";
                setCurrentUser(null)
            }
        } catch (error) {
            console.error("Error during user refresh:", error);
            //alert("An error occurred during signup. Please try again.");
            if (window.location.pathname !== "/" && window.location.pathname !== "/signup")
                window.location.href = "/";
        }
    };

    useEffect(() => {
        refreshCurrentUser();
    }, []);

    return (
        <Router>
            <CurrentUserContext.Provider
                value={{ currentUser, setCurrentUser, refreshCurrentUser }}
            >
                <App />
            </CurrentUserContext.Provider>
        </Router>
    );
}

function App() {
    const { currentUser } = useContext(CurrentUserContext);
    const location = useLocation();

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup/*" element={<SignUpPage />} />
                <Route path="/home/*" element={<HomePage />} />
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="/explore/*" element={<ExplorePage />} />
                <Route path="/subscriptions/*" element={<SubsPage />} />
                <Route path="/settings/*" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}

export default AppWrapper;