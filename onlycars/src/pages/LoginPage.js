import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                username,
                password,
            });
            const { data } = response;
            if (data.message === "Login successful") {
                // Redirect to home page or dashboard
                console.log(data.message);
                window.location.href = "/Home";
            } else {
                alert("Invalid credentials");
                console.log(data)
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <main id="main-container">
            <section id="posts-container">
                <div id="login-form" className="form-container">
                    <p className="form-heading">Login</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        <button
                            type="button"
                            onClick={() => (window.location.href = "/signup")}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
