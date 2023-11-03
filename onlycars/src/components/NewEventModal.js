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

            // Create a new Date object and convert it to an ISO string
            const currentDate = new Date().toISOString();

            const newEventData = {
                ...eventData,
                // Set the date field to the current date and time
                date: currentDate,
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
            onRequestClose();
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
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Upload Banner:
                    <input
                        type="file"
                        name="banner"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default NewEventModal;
