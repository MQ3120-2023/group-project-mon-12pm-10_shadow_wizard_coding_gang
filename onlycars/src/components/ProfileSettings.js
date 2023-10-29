import React, { useState } from "react";
import axios from "axios";

const ProfileSettings = () => {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/profileSettings",
                {
                    username,
                    description,
                }
            );
            const { data } = response;
            if (data.message === "Settings Saved") {
                // Redirect to home page or dashboard
                alert("Your Changes have been applied!");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <main id="main-container">
            <div id="info-box">
                <p id="info-header">Profile Settings</p>
                <div id="info-list">
                    <form onSubmit={handleSubmit}>
                        <label>UserName</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ProfileSettings;
