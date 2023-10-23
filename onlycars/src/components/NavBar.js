import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ExplorePage from "../pages/ExplorePage";
import SubsPage from "../pages/SubsPage";
import SettingsPage from "../pages/SettingsPage";

const NavBar = () => {

    return(
        <section id="profile-box">
            <img id="profile-picture"
              src="http://localhost:3001/images/car1.jpg"
              alt="User Profile Picture"
            />
            <nav id="nav-box">

                <a id="profile-name">user1</a>

                <Link className="nav-links" to="/home">Home</Link>

                <Link className="nav-links" to="/profile">My Profile</Link>

                <Link className="nav-links" to="/explore">Explore</Link>

                <Link className="nav-links" to="/subscriptions">Subscriptions</Link>

                <Link className="nav-links" to="/settings">Settings</Link>

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