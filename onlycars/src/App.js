import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import Home from "./Home.js";
import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import "./App.css";

function App() {
    return (
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/LoginPage" element={<LoginPage />} />
                        <Route path="/SignUpPage" element={<SignUpPage />} />
                    </Routes>
            </Router>
    );
}

export default App;
