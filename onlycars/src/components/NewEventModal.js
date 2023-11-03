import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { CurrentUserContext } from "../App";

const NewEventModal = ({ isOpen, onRequestClose }) => {
	const currentUser = useContext(CurrentUserContext);
	const [eventData, setEventData] = useState({
		title: "",
		location: "",
		date: "",
		description: "",
		banner: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEventData({ ...eventData, [name]: value });
	};

	const handleImageChange = (e) => {
		if (e.target.files) {
			setEventData({ ...eventData, banner: e.target.files[0] });
		}
	};

	const handleImageUpload = async (file) => {
		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch("http://localhost:3001/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Image upload failed");
			}

			const data = await response.json();
			console.log("Image upload successful" + data.url);
			return data.url;
		} catch (error) {
			console.error("Error uploading image:", error);
			throw error;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const bannerUrl = eventData.banner
				? await handleImageUpload(eventData.banner)
				: null;

			const newEventData = {
				...eventData,
				userId: currentUser.currentUser.userId,
				banner: bannerUrl,
			};

			const response = await fetch("http://localhost:3001/createEvent", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEventData),
			});

			if (!response.ok) {
				throw new Error("Failed to create event");
			}

			const data = await response.json();
			console.log("Event created:", data);
			onRequestClose(); // Close the modal after submitting
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="New Event"
			className="modal"
			overlayClassName="overlay"
		>
			<h2>New Event</h2>
            <hr/>
			<form onSubmit={handleSubmit}>
				<label>Title:</label>
				<input
					type="text"
					name="title"
					value={eventData.title}
					onChange={handleChange}
					required
				/>
				<label>Location:</label>
				<input
					type="text"
					name="location"
					value={eventData.location}
					onChange={handleChange}
					required
				/>
				<label>Date and Time:</label>
				<input
					type="datetime-local"
					name="date"
					value={eventData.date}
					onChange={handleChange}
					required
				/>
				<label>Description:</label>
				<textarea
					name="description"
					value={eventData.description}
					onChange={handleChange}
					required
				/>
				<label id="image-upload">
					Upload Image(s) Here
					<input
						type="file"
						name="images"
						accept="image/*"
						onChange={handleImageChange}
					/>
				</label>
				<aside className="form-button-container">
					<button type="submit">Submit</button>
					<button className="close-button" onClick={onRequestClose}>
						Close
					</button>
				</aside>
			</form>
		</Modal>
	);
};

export default NewEventModal;
