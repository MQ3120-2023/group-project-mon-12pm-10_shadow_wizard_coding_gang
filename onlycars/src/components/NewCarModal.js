import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { CurrentUserContext } from "../App";

const NewCarModal = ({ isOpen, onRequestClose }) => {
    const currentUser = useContext(CurrentUserContext);
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        year: "",
        modifications: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setCarData({ ...carData, images: filesArray });
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
                carData.images.map(handleImageUpload)
            );

            // Create car data with image URLs and current user's ID
            const newCarData = {
                ...carData,
                images: imageUrls,
                userId: currentUser.currentUser.userId,
            };

            // Send car data to server
            const response = await fetch("http://localhost:3001/createCar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCarData),
            });

            if (!response.ok) {
                throw new Error("Failed to create car");
            }

            const data = await response.json();
            console.log("Car created:", data);
            onRequestClose(); // Close the modal after submitting
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="New Car"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Add New Car</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={carData.brand}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Model:
                    <input
                        type="text"
                        name="model"
                        value={carData.model}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="number"
                        min="1900"
                        max="2099"
                        step="1"
                        name="year"
                        value={carData.year}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Modifications:
                    <select
                        name="modifications"
                        value={carData.modifications}
                        onChange={handleChange}
                        required
                    >
                        <option value="Stock">Stock</option>
                        <option value="Modified">Modified</option>
                    </select>
                </label>
                <label>
                    Upload Images:
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default NewCarModal;
