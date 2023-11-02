import React, { useState } from "react";
import axios from "axios";

const SettingsSecurity = () => {
	const [password, setPassword] = useState("");
	const [conPassword, setConPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/SettingsSecurity", {
				password,
			});
			const { data } = response;
			if (data.message === "Settings Saved") {
				// Redirect to home page or dashboard
				alert("Your password has been changed!");
			}
		} catch (error) {
			console.error("Error during authentication:", error);
			alert("An error occurred during login. Please try again.");
		}
	};

	return (
		<main id="main-container">
			<div className="settings-box">
				<div className="settings-inside-box">
					<p className="settings-header">Profile Settings</p>
					<div className="settings-list">
						<form onSubmit={handleSubmit}>
							<label>Update Password:</label>
							<input
								type="text"
								value={password}
								placeholder="New Password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<hr />
                            <label></label>
							<input
								type="text"
								value={conPassword}
								placeholder="Confirm Password"
								onChange={(e) => setConPassword(e.target.value)}
								required
							/>
							<hr />
							<button type="submit">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SettingsSecurity;
