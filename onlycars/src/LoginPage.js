import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

export const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="content-mid-wrapper">
                <div className="content-mid">
                    <div className="logo">
                        <div className="overlap-group">
                            <img className="logo-image" alt="Logo image" src="logo-image.png" />
                            <img className="logo-text" alt="Logo text" src="logo-text.png" />
                        </div>
                    </div>
                    <div className="login-form">
                        <div className="overlap">
                            <div className="text-login-header">Login</div>
                            <div className="username-input">
                                <div className="div-wrapper">
                                    <div className="text-username">Username or email</div>
                                </div>
                            </div>
                            <div className="password-input">
                                <div className="div-wrapper">
                                    <div className="text-password">Password</div>
                                </div>
                            </div>
                            <div className="login-button">
                                <div className="div">
                                    <div className="text-login-button"><Link className="links" to="/">
                                        Log In
                                    </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="sign-up-button">
                                <div className="div">
                                    <p className="text-sign-up-button"><Link className="links" to="/SignUpPage">
                                    No login? Sign Up Here
                                    </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;
