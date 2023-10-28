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
                "http://localhost:3001/currentUser",
                {
                    timeout: 5000,
                    withCredentials: true,
                }
            );
            console.log('NavBar ' + response.data);
            setUserData(response.data); // Update state variable
        };
        currentUser();
    }, []);

    return(
        <section id="profile-box">
            <img id="profile-picture"
              src='BLAH'
              alt="User Profile Picture"
            />
            <nav id="nav-box">

                <a id="profile-name">BLAH</a>
                <Link className="nav-links" to="/home">Home</Link>
                <Link className="nav-links" to="/profile">My Profile</Link>
                <Link className="nav-links" to="/explore">Explore</Link>
                <Link className="nav-links" to="/subscriptions">Subscriptions</Link>
                <Link className="nav-links" to="/settings">Settings</Link>
                <Link className="nav-links" to="/" onClick={() => localStorage.clear()}>Logout</Link>

            </nav>

            <Routes>

                <Route path="/home" element={<HomePage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/explore" element={<ExplorePage/>}/>
                <Route path="/subscriptions" element={<SubsPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>

            </Routes>

        </section>
    )
}

export default NavBar