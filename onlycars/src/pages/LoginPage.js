import React, { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend authentication logic
        console.log("Sending request:", { username, password });
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Login successful") {
                    // Redirect to home page or dashboard
                    window.location.href = "/Home";
                } else {
                    alert("Invalid credentials");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <main id="main-container">
            <section id="posts-container">
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
                            onClick={() =>
                                (window.location.href = "/signup")
                            }
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
