import React from "react";
import Modal from "react-modal";

const PostImageModal = ({isOpen, onRequestClose}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="New Post"
			className="modal"
			overlayClassName="overlay"
		>
			<h2>New Event</h2>
			<form>
				{/* Add your form fields here */}
				<button type="submit">Submit</button>
			</form>
			<button onClick={onRequestClose}>Close</button>
		</Modal>
	);
};

export default PostImageModal;
