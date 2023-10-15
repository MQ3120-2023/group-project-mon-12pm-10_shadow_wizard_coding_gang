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
        <div id="main-container">
            <div id="posts-container">
                <div id="form-container">
                    <h2>Login</h2>
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
                            No login? Sign Up Here
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
