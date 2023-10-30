import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/signup", formData);
            const { data } = response;
            if (data.message === "SignUp successful") {
                // Redirect to home page or dashboard
                window.location.href = "/";
            } else {
                alert("Username/Email already exists");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <main id="main-container">
            <section id="posts-container">
                <img id="logo-image" src="/images/Logo.png" />
                <div className="form-container">
                    <p className="form-heading">Sign Up</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Sign Up</button>
                        <button
                            type="button"
                            onClick={() => (window.location.href = "/")}
                        >
                            Already have an account? Login here
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;
