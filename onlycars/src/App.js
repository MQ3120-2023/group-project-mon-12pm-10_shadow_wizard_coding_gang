import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import "./styles/LightMode.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/Signup" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;
