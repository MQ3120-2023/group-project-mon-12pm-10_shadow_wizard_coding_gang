import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCommentModal = ({ isOpen, onRequestClose, post }) => {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetch(`http://localhost:5000/getComments/${post.postId}`)
                .then((response) => response.json())
                .then((data) => {
                    setComments(data);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [isOpen, post.postId]);

    const handleUserClick = (user) => {
        // Navigate to the ProfilePage with the username as a parameter
        // and pass the user data as state
        navigate(`/profile/${user.username}`, { state: { user } });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="New Post"
            className="comment-modal"
            overlayClassName="overlay"
        >
            {comments.map((comm, index) => {
                const user = comm.user;
                return (
                    <section className="comment-container" key={index}>
                        <header
                            className="comment-header"
                            onClick={() => handleUserClick(user)}
                        >
                            <img
                                className="comment-pfp"
                                src={user.profilepic}
                                alt="User Profile Picture"
                                style={{ cursor: "pointer" }}
                            />
                            <a
                                className="comment-user"
                                style={{ cursor: "pointer" }}
                            >
                                {user.username}
                            </a>
                        </header>
                        <p>
                            {post.description}
                            <br />
                            {/* {moment(post.date).format("MMMM Do YYYY, h:mm a")} */}
                        </p>
                    </section>
                );
            })}
        </Modal>
    );
};

export default PostCommentModal;
