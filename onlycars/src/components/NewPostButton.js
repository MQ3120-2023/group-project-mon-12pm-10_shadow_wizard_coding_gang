import React, { useState } from "react";
import Modal from 'react-modal';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NewPostModal from "../components/NewPostModal";

Modal.setAppElement('#root'); // Add this line to avoid accessibility errors


const NewPostButton = ({ onClick }) => {

    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

    const openNewPostModal = () => {
        setIsNewPostModalOpen(true);
    };
    const closeNewPostModal = () => {
        setIsNewPostModalOpen(false);
    };

    return (
        <button className="new-button" onClick={openNewPostModal}>
            <PostAddIcon className="new-button-icon" style={{ fontSize: 40 }} />
            New Post
            <NewPostModal isOpen={isNewPostModalOpen} onRequestClose={closeNewPostModal} />
        </button>
    );
};

export default NewPostButton;
