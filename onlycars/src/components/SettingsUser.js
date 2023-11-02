import React, { useState } from "react";
import axios from "axios";

const SettingsUser = () => {
	const [email, setEmail] = useState("");
	const [location, setLocation] = useState("");
	const [gender, setGender] = useState("");
	const [language, setLanguage] = useState("");
	const [theme, setTheme] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/SettingsUser", {
				email,
				location,
				gender,
				language,
				theme,
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
					<p className="settings-header">User Settings</p>
					<div className="settings-list">
						<form onSubmit={handleSubmit}>
							<label>Email</label>
							<input
								type="text"
								value={email}
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<hr />
							<label>Location</label>
							<input
								type="text"
								value={location}
								placeholder="Suburb/City, Country"
								onChange={(e) => setLocation(e.target.value)}
								required
							/>
							<hr />
							<label>Gender</label>
							<input
								type="text"
								value={gender}
								placeholder="Gender"
								onChange={(e) => setGender(e.target.value)}
								required
							/>
							<hr />
							<label>Language</label>
							<input
								type="text"
								value={language}
								placeholder="Language"
								onChange={(e) => setLanguage(e.target.value)}
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

export default SettingsUser;
