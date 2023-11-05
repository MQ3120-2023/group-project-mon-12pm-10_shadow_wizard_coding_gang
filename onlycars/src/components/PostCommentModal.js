import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCommentModal = ({
	isOpen,
	onRequestClose,
	post,
	postId,
	car,
	user,
}) => {
	const [comments, setComments] = useState([1]);
	const navigate = useNavigate();

	useEffect(() => {
		if (isOpen) {
			fetch(`http://localhost:3001/getComments/${postId}`)
				.then((response) => response.json())
				.then((data) => {
					console.log("Comments Data: " + data);
					setComments(data);
				})
				.catch((error) => {
					console.error("Error fetching comments:", error);
				});
		}
	}, [isOpen, postId]);

	const handleUserClick = (user) => {
		// Navigate to the ProfilePage with the username as a parameter
		// and pass the user data as state
		navigate(`/profile`, { state: { user } });
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="New Post"
			className="comment-modal"
			overlayClassName="overlay"
		>
			<div className="comments-div">
				<div>
					<section className="modal-post-container">
						<header
							className="post-header"
							onClick={() => handleUserClick(user)}
						>
							<img
								className="post-pfp"
								src={user?.profilepic}
								alt="User Profile Picture"
								style={{ cursor: "pointer" }}
							/>
							<a className="post-user" style={{ cursor: "pointer" }}>
								{user?.username}
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
							{post?.likes.length}
							<br />
							{post?.description}
						</p>
						<p>{moment(post?.date).format("MMMM Do YYYY, h:mm a")}</p>
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
							<button
								id="close-button"
								className="post-button"
								onClick={onRequestClose}
							>Close</button>
						</div>
					</section>
				</div>

				<section className="comments-section">
					<p id="info-header">Comments</p>
					{comments.map((comm, index) => {
						console.log("Generating Post & Comments");
						const user = comm.user;
						return (
							<section className="comment-container" key={index}>
								<header
									className="comment-header"
									onClick={() => handleUserClick(user)}
								>
									<img
										className="comment-pfp"
										src={user?.profilepic}
										alt="User Profile Picture"
										style={{ cursor: "pointer" }}
									/>
									<a className="comment-user" style={{ cursor: "pointer" }}>
										{user?.username}
									</a>
								</header>
								<p>
									{comm?.description}
									<br />
									{moment(comm?.date).format("MMMM Do YYYY, h:mm a")}
								</p>
							</section>
						);
					})}
					<form className="comments-form">
						<input type="text" placeholder={"Comment Here"} />
						<button type="submit" className="send-comment-button">
							Send
						</button>
					</form>
				</section>
			</div>
		</Modal>
	);
};

export default PostCommentModal;
