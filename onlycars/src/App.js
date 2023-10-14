import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import "./App.css";

function App() {
    return (
            <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/LoginPage" element={<LoginPage />} />
                        <Route path="/SignUpPage" element={<SignUpPage />} />
                    </Routes>
            </Router>
    );
}

export default App;
