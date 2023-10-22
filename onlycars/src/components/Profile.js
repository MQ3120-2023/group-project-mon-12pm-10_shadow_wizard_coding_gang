import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";

const Profile = () => {

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

                <Route path="/profile" element={<HomePage/>}/>

                <Route path="/explore" element={<HomePage/>}/>

                <Route path="/subscriptions" element={<HomePage/>}/>

                <Route path="/settings" element={<HomePage/>}/>

            </Routes>

        </section>
    )
}

export default Profile