import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";

function App() {
  return (
    <Router>
      <nav className="navBar">
        <h1>OnlyCars</h1>
        <section className="linkSection">
          <Link className="links" to="/">
            Home
          </Link>
        </section>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;