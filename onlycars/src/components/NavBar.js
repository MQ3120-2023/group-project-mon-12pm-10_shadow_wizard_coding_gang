import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ExplorePage from "../pages/ExplorePage";
import SubsPage from "../pages/SubsPage";
import SettingsPage from "../pages/SettingsPage";
import { CurrentUserContext } from "../App";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";
import NewPostModal from "../components/NewPostModal";
import NewEventModal from "../components/NewEventModal";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Add this line to avoid accessibility errors

const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);
    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false); // State to manage modal visibility
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.post("/logout", {
                withCredentials: true,
            });
            if (response.status === 200) {
                currentUser.refreshCurrentUser();
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const styles = {
        largeIcon: {
            width: 60,
            height: 60,
        },
    };

    const openNewPostModal = () => {
        setIsNewPostModalOpen(true);
    };
    const closeNewPostModal = () => {
        setIsNewPostModalOpen(false);
    };

    const openNewEventModal = () => {
        setIsNewEventModalOpen(true);
    };
    const closeNewEventModal = () => {
        setIsNewEventModalOpen(false);
    };

    return (
        <section id="profile-box">
            <img
                id="profile-picture"
                src={currentUser?.currentUser?.profilepic}
                alt="User Profile Picture"
            />
            <nav id="nav-box">
                <a id="profile-name">{currentUser?.currentUser?.username}</a>
                <Link className="nav-links" to="/home">
                    <HomeIcon className="nav-icon" style={{ fontSize: 40 }} />
                    Home
                </Link>
                <Link className="nav-links" to="/profile">
                    <AccountBoxIcon
                        className="nav-icon"
                        style={{ fontSize: 40 }}
                    />
                    My Profile
                </Link>
                <Link className="nav-links" to="/explore">
                    <ExploreIcon
                        className="nav-icon"
                        style={{ fontSize: 40 }}
                    />
                    Explore
                </Link>
                <Link className="nav-links" to="/subscriptions">
                    <PersonAddIcon
                        className="nav-icon"
                        style={{ fontSize: 40 }}
                    />
                    Subscriptions
                </Link>
                <Link className="nav-links" to="/settings">
                    <SettingsApplicationsIcon
                        className="nav-icon"
                        style={{ fontSize: 40 }}
                    />
                    Settings
                </Link>
                <Link
                    className="nav-links"
                    id="logout-button"
                    to="/"
                    onClick={handleLogout}
                >
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
            <NewPostButton onClick={openNewPostModal} />
            <NewEventButton onClick={openNewEventModal} />
            <NewPostModal
                isOpen={isNewPostModalOpen}
                onRequestClose={closeNewPostModal}
            />
            <NewEventModal
                isOpen={isNewEventModalOpen}
                onRequestClose={closeNewEventModal}
            />
        </section>
    );
};

export default NavBar;
