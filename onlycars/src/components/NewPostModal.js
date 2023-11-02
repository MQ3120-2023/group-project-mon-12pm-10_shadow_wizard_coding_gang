import React, { useState } from 'react';
import Modal from 'react-modal';

const NewPostModal = ({ isOpen, onRequestClose }) => {
  const [postData, setPostData] = useState({
    description: '',
    carId: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPostData({ ...postData, images: filesArray });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Data:', postData);
    // Here you would typically send the postData to your server
    onRequestClose(); // Close the modal after submitting
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
          <select name="carId" value={postData.carId} onChange={handleChange}>
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
