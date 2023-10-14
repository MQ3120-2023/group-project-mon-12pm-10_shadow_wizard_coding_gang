import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import "./styles/LightMode.css";

function App() {
    return (
        <div id="main-container">

            <Router>
                    <Routes>
                        <Route path="/Home" element={<HomePage />} />
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/Signup" element={<SignUpPage />} />
                    </Routes>
            </Router>

            <div id="logo-container">

            </div>

            <div id="search-container">

            </div>

            <div id="profile-container">

            </div>

            <div id="posts-container">

            </div>

            <div id="info-container">

            </div>

        </div>
    );
}

export default App;
