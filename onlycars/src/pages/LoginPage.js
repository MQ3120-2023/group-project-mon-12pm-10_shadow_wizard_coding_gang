import React, { useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setCurrentUser } = useContext(CurrentUserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/login",
                {
                    username,
                    password,
                },
                { withCredentials: true }
            );
            const { data } = response;
            if (data.message === "Login successful") {
                setCurrentUser(data); // <-- This line sets the current user in the context
                console.log(data.message);
                window.location.href = "/Home";
            } else {
                alert("Invalid credentials");
                console.log(data);
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <main id="main-container">
            <section id="posts-container">
                <img
                    id="logo-image"
                    src="http://localhost:3001/images/Logo.png"
                />
                <div id="login-form" class="form-container">
                    <p class="form-heading">Login</p>
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
