import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import "./App.css";

function App() {
    return (
        <div class="mainContainer">
            <div class="NavBar"></div>
            <div class="spaceLeft"></div>
            <Router>
                <aside className="contentLeft">
                    <h1>OnlyCars</h1>
                    <nav className="innerNav">
                        <Link className="links" to="/">
                            Home
                        </Link>
                        <Link className="links" to="/">
                            Cars
                        </Link>
                        <Link className="links" to="/">
                            Creators
                        </Link>
                    </nav>
                </aside>

                <div class="pageContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
            <div class="spaceRight"></div>
            <div class="Footer"></div>
        </div>
    );
}

export default App;
