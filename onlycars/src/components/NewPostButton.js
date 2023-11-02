import React from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';

const NewPostButton = ({ onClick }) => {
    return (
        <button className="new-button" onClick={onClick}>
            <PostAddIcon className="new-button-icon" style={{ fontSize: 40 }} />
            New Post
        </button>
    );
};

export default NewPostButton;
