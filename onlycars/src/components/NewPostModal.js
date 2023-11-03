import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { CurrentUserContext } from "../App";

const NewPostModal = ({ isOpen, onRequestClose }) => {
	const currentUser = useContext(CurrentUserContext);
	const [userCars, setUserCars] = useState([]); // State to hold the user's cars
	const [postData, setPostData] = useState({
		description: "",
		carId: "",
		images: [],
	});

	// Function to fetch cars owned by the current user
	const fetchUserCars = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/getUserCars?userId=${currentUser.currentUser.userId}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch cars");
			}
			const cars = await response.json();
			setUserCars(cars); // Update the state with the fetched cars
			console.log(userCars.map((car) => car.carId));
		} catch (error) {
			console.error("Error fetching cars:", error);
		}
	};

	// Call fetchUserCars when the modal opens
	useEffect(() => {
		if (isOpen) {
			console.log("Modal is opened");
			fetchUserCars();
		}
	}, [isOpen]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({ ...postData, [name]: value });
	};

	const handleImageChange = (e) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			setPostData({ ...postData, images: filesArray });
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
			// Upload images and get their URLs
			const imageUrls = await Promise.all(
				postData.images.map(handleImageUpload)
			);

			// Create post data with image URLs and current user's ID
			const updatedPostData = {
				description: postData.description,
				images: imageUrls,
				userId: currentUser.currentUser.userId,
				carId: postData.carId || null, // Set carId to null if not provided
			};

			// Send post data to server
			const response = await fetch("http://localhost:3001/createPost", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedPostData),
			});

			if (!response.ok) {
				throw (new Error("Failed to create post"), console.log(response));
			}

			const data = await response.json();
			console.log("Post created:", data);
			onRequestClose(); // Close the modal after submitting
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="New Post"
			className="modal"
			overlayClassName="overlay"
		>
			<h2>New Post</h2>
            <hr/>
			<form onSubmit={handleSubmit}>
				<label>Description:</label>
				<textarea
					name="description"
					value={postData.description}
					onChange={handleChange}
					required
				/>
				<label>Select Car:</label>
				<select name="carId" value={postData.carId} onChange={handleChange}>
					<option value="">None</option>
					{userCars.map((car) => (
						<option key={car.carId} value={car.carId}>
							{car.brand} {car.model}
						</option>
					))}
				</select>
				<label id="image-upload">
					Upload Image(s) Here
					<input
						type="file"
						name="images"
						accept="image/*"
						multiple
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

export default NewPostModal;
