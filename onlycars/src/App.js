import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import "./App.css";

function App() {
    return (
        <div class="mainContainer">
            <div class="spaceLeft"></div>
            <Router>
                <div class="pageContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/LoginPage" element={<LoginPage />} />
                        <Route path="/SignUpPage" element={<SignUpPage />} />
                    </Routes>
                </div>
            </Router>
            <div class="spaceRight"></div>
            <div class="Footer"></div>
        </div>
    );
}

export default App;
