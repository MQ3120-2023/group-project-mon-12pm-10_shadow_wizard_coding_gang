import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { CurrentUserContext } from "../App";

const NewPostModal = ({ isOpen, onRequestClose }) => {
  const currentUser = useContext(CurrentUserContext);
    const [postData, setPostData] = useState({
        description: "",
        carId: "420",
        images: [],
    });

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
            console.log("Image upload successful" + data.url)
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
              ...postData, 
              images: imageUrls,
              userId: currentUser.currentUser.userId // Add the current user's ID here
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
              throw new Error("Failed to create post"),
              console.log(response)
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
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={postData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Select Car:
                    <select
                        name="carId"
                        value={postData.carId}
                        onChange={handleChange}
                    >
                        <option value="">None</option>
                        {/* Here you should map over the user's cars and create an option for each */}
                        {/* <option value={carId}>{carName}</option> */}
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

export default NewPostModal;
