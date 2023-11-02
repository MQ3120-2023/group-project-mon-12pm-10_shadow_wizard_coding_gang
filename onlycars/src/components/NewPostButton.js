import React, { useState } from "react";
import Modal from "react-modal";
import PostAddIcon from "@mui/icons-material/PostAdd";

Modal.setAppElement("#root"); // Add this line to avoid accessibility errors

const NewPostButton = ({ onClick }) => {
    return (
        <button className="new-button" onClick={onClick}>
            <PostAddIcon className="new-button-icon" style={{ fontSize: 40 }} />
            New Post
        </button>
    );
};

export default NewPostButton;
