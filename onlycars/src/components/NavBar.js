import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ExplorePage from "../pages/ExplorePage";
import SubsPage from "../pages/SubsPage";
import SettingsPage from "../pages/SettingsPage";

const NavBar = () => {
    const [userData, setUserData] = useState(null); // Declare state variable

    useEffect(() => {
        const currentUser = async () => {
            const response = await axios.get(
                "/currentUser",
                {
                    timeout: 5000,
                    withCredentials: true,
                }
            );
            console.log("NavBar " + response.data);
            setUserData(response.data); // Update state variable
        };
        currentUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "/logout",
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                setUserData(null); // Clear the user data from state
                sessionStorage.clear(); // Clear session storage
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <section id="profile-box">
            <img id="profile-picture" src={userData?.profilepic} alt="User Profile Picture" />
            <nav id="nav-box">
                <a id="profile-name">{userData?.username}</a>
                <Link className="nav-links" to="/home">
                    Home
                </Link>
                <Link className="nav-links" to="/profile">
                    My Profile
                </Link>
                <Link className="nav-links" to="/explore">
                    Explore
                </Link>
                <Link className="nav-links" to="/subscriptions">
                    Subscriptions
                </Link>
                <Link className="nav-links" to="/settings">
                    Settings
                </Link>
                <Link className="nav-links" to="/" onClick={handleLogout}>
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
