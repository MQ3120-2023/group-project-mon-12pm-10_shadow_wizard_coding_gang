import React, { useState, useContext } from "react";
import axios from "axios";

const SettingsProfile = () => {
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/SettingsProfile", {
				username,
				description,
			});
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
			<div className="settings-box">
				<div className="settings-inside-box">
					<p className="settings-header">Profile Settings</p>
					<div className="settings-list">
						<form onSubmit={handleSubmit}>
							<label>Username</label>
							<input
								type="text"
								value={username}
								placeholder="Username"
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							<hr />
							<label>Description</label>
							<input
								type="text"
								value={description}
								placeholder="Description"
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
							<hr />
							<label>
								Change Profile Picture
								<input
									type="file"
									name="images"
									accept="image/*"
								/>
							</label>
							<button type="submit">Save Changes</button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SettingsProfile;
