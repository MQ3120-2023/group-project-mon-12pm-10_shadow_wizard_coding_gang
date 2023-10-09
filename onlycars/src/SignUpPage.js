import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

export const SignUpPage = () => {
    return (
        <div className="sign-up-page">
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
                            <div className="text-login-header">Sign Up</div>
                            <div className="username-input">
                                <div className="div-wrapper">
                                    <div className="text-username">Email</div>
                                </div>
                            </div>
                            <div className="overlap-wrapper">
                                <div className="div-wrapper">
                                    <div className="text-username">Username</div>
                                </div>
                            </div>
                            <div className="password-input">
                                <div className="div-wrapper">
                                    <div className="text-password">Password</div>
                                </div>
                            </div>
                            <button className="sign-up-button">
                                <button className="text-sign-up-button-wrapper">
                                    <button className="text-sign-up-button">SIGN UP</button>
                                </button>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default SignUpPage;
