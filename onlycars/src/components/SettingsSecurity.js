import React, { useState } from "react";
import axios from "axios";

const SettingsSecurity = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
	const [conPassword, setConPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/settingsSecurity", {
				oldPassword, // Include oldPassword in the request body
				password,
			});
			const { data } = response;
			if (data.message === "Settings Saved") {
				// Redirect to home page or dashboard
				alert("Your password has been changed!");
				await setTimeout(1000);
				window.location.href = "/";

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
					<p className="settings-header">Security Settings</p>
					<div className="settings-list">
						<form onSubmit={handleSubmit}>
							<label>Old Password:</label>
							<input
								type="password" // Change the input type to password
								value={oldPassword}
								placeholder="Old Password"
								onChange={(e) => setOldPassword(e.target.value)}
								required
							/>
							<hr />
							<label>Update Password:</label>
							<input
								type="password" // Change the input type to password
								value={password}
								placeholder="New Password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<hr />
							<label></label>
							<input
								type="password" // Change the input type to password
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