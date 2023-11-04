import React from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCommentModal = ({ isOpen, onRequestClose, post, car, postUser }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: false,
		centreMode: true,
		className: "post-image-modal",
	};

	const navigate = useNavigate();

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
			className="image-modal"
			overlayClassName="overlay"
		>
			<section className="post-container">
				<header className="post-header" onClick={() => handleUserClick(postUser)}>
					<img
						className="post-pfp"
						src={postUser.profilepic}
						alt="User Profile Picture"
						style={{ cursor: "pointer" }}
					/>
					<a className="post-user" style={{ cursor: "pointer" }}>
						{postUser.username}
					</a>
				</header>
				{car ? (
					<p>
						Brand: {car.brand} - Model: {car.model} - Year: {car.year}
					</p>
				) : (
					<p>No car information available.</p>
				)}
				<p>
					{post.likes.length}
					<br />
					{post.description}
				</p>
				<p>{moment(post.date).format("MMMM Do YYYY, h:mm a")}</p>
				<figure className="post-images">
					{post && post.images && (
						<Slider {...settings}>
							{post.images.map((image, imgIndex) => (
								<img
									key={imgIndex}
									src={image}
									alt={`Post image ${imgIndex + 1}`}
								/>
							))}
						</Slider>
					)}
				</figure>
				<div className="post-button-container">
					<button id="like-button" className="post-button">
						Like
					</button>
				</div>
			</section>
		</Modal>
	);
};

export default PostCommentModal;
