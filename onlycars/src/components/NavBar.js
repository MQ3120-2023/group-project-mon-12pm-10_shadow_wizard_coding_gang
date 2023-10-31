import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ExplorePage from "../pages/ExplorePage";
import SubsPage from "../pages/SubsPage";
import SettingsPage from "../pages/SettingsPage";
import { CurrentUserContext } from "../App";

const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "/logout",
                { withCredentials: true }
            );
            if (response.status === 200) {
                currentUser.refreshCurrentUser();
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <section id="profile-box">
            <img id="profile-picture" src={currentUser?.currentUser?.profilepic} alt="User Profile Picture" />
            <nav id="nav-box">
                <a id="profile-name">{currentUser?.currentUser?.username}</a>
                <Link className={`nav-links ${location.pathname === '/home' ? 'active' : ''}`} to="/home">
                    Home
                </Link>
                <Link className={`nav-links ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">
                    My Profile
                </Link>
                <Link className={`nav-links ${location.pathname === '/explore' ? 'active' : ''}`} to="/explore">
                    Explore
                </Link>
                <Link className={`nav-links ${location.pathname === '/subscriptions' ? 'active' : ''}`} to="/subscriptions">
                    Subscriptions
                </Link>
                <Link className={`nav-links ${location.pathname === '/settings' ? 'active' : ''}`} to="/settings">
                    Settings
                </Link>
                <Link className="nav-links" id="logout-button" to="/" onClick={handleLogout}>
                    Logout
                </Link>
            </nav>

            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/subscriptions" element={<SubsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </section>
    );
};

export default NavBar;
