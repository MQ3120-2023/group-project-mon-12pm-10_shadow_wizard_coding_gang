import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import PostImageModal from "./PostImageModal";
import PostCommentModal from "./PostCommentModal";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";

const HomeLatest = ({ user }) => {
	const { currentUser } = useContext(CurrentUserContext);
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [isCommentModalOpen, setisCommentModalOpen] = useState(false);
	const [modalPost, setModalPost] = useState();
	const [modalPostId, setModalPostId] = useState();
	const [carObject, setCar] = useState();
	const [userObject, setUser] = useState();
	const navigate = useNavigate();

	const fetchMoreData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3001/getHomeLatest?page=${page}&userId=${currentUser?.userId}`
			);
			if (response.data.length > 0) {
				setPosts([...posts, ...response.data]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching more data:", error);
		}
	};

	useEffect(() => {
		// Reset state variables
		setPosts([]);
		setHasMore(true);
		setPage(1);

		// Fetch initial data based on sortType
		fetchMoreData();
	}, [user]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
		setisCommentModalOpen(false);
	};

	// Function to handle comment button click
	const handleCommentClick = (post, postId, car, user) => {
		console.log(postId);
		setModalPost(post);
		setisCommentModalOpen(true);
		setModalPostId(postId);
		setCar(car);
		setUser(user);
	};

	const handleUserClick = (user) => {
		// Navigate to the ProfilePage with the username as a parameter
		// and pass the user data as state
		navigate(`/profile`, { state: { user } });
	};

	return (
		<section id="posts-container">
			<InfiniteScroll
				dataLength={posts.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				scrollableTarget="posts-container"
				id="infinite-scroll"
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>No Posts? Go to Explore for more posts!</b>
					</p>
				}
			>
				{posts.map((post, index) => {
					const car = post.car;
					const user = post.user;
					return (
						<section className="post-container" key={index}>
							<header
								className="post-header"
								onClick={() => handleUserClick(user)}
							>
								<img
									className="post-pfp"
									src={user.profilepic}
									alt="User Profile Picture"
									style={{ cursor: "pointer" }}
								/>
								<a className="post-user" style={{ cursor: "pointer" }}>
									{user.username}
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
												onClick={() => {
													setModalPost(post);
													setIsImageModalOpen(true);
												}}
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
									id="comment-button"
									className="post-button"
									onClick={() =>
										handleCommentClick(
											post,
											post.postId,
											car,
											user,
											closeImageModal
										)
									}
								>
									Comment
								</button>
							</div>
						</section>
					);
				})}
			</InfiniteScroll>
			<PostImageModal
				isOpen={isImageModalOpen}
				onRequestClose={closeImageModal}
				post={modalPost}
			/>
			<PostCommentModal
				post={modalPost}
				onRequestClose={closeImageModal}
				isOpen={isCommentModalOpen}
				postId={modalPostId}
				car={carObject}
				user={userObject}
			/>
		</section>
	);
};

export default HomeLatest;
