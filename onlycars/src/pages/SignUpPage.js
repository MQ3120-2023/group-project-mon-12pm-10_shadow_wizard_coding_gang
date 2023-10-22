import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "", 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.message === "SignUp successful") {
            navigate("/");
        }
    };

    return (
        <main id="main-container">
            <section id="posts-container">
                <div class="form-container">
                <p class="form-heading">Sign Up</p>
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
                        <a
                            type="button"
                            class="text-button"
                            onClick={() =>
                                (window.location.href = "/")
                            }
                        >
                            Already have an account? Login here
                        </a>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;
 