import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
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
    // const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentPath = location.pathname;
            console.log("FetchData " + currentPath);
            try {
                console.log("Try");
                const response = await axios.get(
                    "http://localhost:3001/currentUser",
                    { timeout: 5000, withCredentials: true }
                );
                console.log("response" + response.data);
                const { currentUser } = response.data;
                console.log(currentUser);
                if (currentUser) {
                    // setCurrentUser(currentUser);
                    console.log("User logged in");
                } else if (!currentUser && currentPath !== "/" && currentPath !== "/signup") {
                    console.log("No User logged in");
                    //window.location.href = "/";
                }
            } catch (error) {console.error("Error fetching current user:", error);
                if (error.code === "ECONNABORTED") {
                    console.error("Request timed out");
                }
            }
        };

        fetchData();
    }, []);

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
