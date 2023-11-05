import React, { useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";

const SettingsProfile = () => {
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [profilepic, setProfilePicture] = useState([]);
	const { currentUser, setCurrentUser, refreshCurrentUser } = useContext(CurrentUserContext);

	const handleImageUpload = async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "onlycars");

		try {
			const response = await fetch(
				"https://api.cloudinary.com/v1_1/dv8lielzo/image/upload",
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Image upload failed");
			}

			const data = await response.json();
			console.log("Image upload successful: " + data.secure_url);
			return data.secure_url;
		} catch (error) {
			console.error("Error uploading image:", error);
			throw error;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Upload Profile Picture and get their URLs
			const imageUrl = profilepic && profilepic instanceof FileList
				? await Promise.all(Array.from(profilepic).map(handleImageUpload))
				: [];

			const response = await axios.post("/settingsProfile", {
				username,
				description,
				profilepic: imageUrl[0],
			});
			console.log(profilepic);
			const { data } = response;
			if (data.message === "Settings Saved") {
				alert("Your Changes have been applied!");
				// Update the currentUser state with the new username
				setCurrentUser({ ...currentUser, username, description, profilepic, refreshCurrentUser });
				// Redirect to home page or dashboard
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
									onChange={(e) => setProfilePicture(e.target.files)}
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