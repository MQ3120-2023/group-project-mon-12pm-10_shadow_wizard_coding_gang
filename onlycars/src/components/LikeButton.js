import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../App";
import axios from "axios";

const LikeButton = ({ post }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Check if the currentUser has liked the post
        const checkLike = likes.includes(currentUser?.userId);
        setIsLiked(checkLike);
    }, [likes, currentUser]);

    const handleLike = async () => {
        // const action = isLiked ? "unlike" : "like";
        try {
            const response = await fetch(`/likePost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser?.userId,
                    postId: post.postId,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update like status");
            }
            const updatedLikes = await response.json();
            setLikes(updatedLikes.likes);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    return (
        <button
            id="like-button"
            autoFocus
            className="post-button"
            onClick={handleLike}
        >
            {post.likes.length} {isLiked ? "Unlike" : "Like"}
        </button>
    );
};

export default LikeButton;