import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    };
    
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
    <div id="login-container">
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
            <button
                type="button"
                onClick={() => (window.location.href = "/LoginPage")}
            >
                Already have an account? Login here
            </button>
        </form>
    </div>
  );
};

export default SignUpPage;