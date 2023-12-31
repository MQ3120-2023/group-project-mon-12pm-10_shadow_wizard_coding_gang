import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import PostImageModal from "./PostImageModal";
import PostCommentModal from "./PostCommentModal";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

const ProfilePopular = ({ user }) => {
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
		if (!user) return; // Make sure user is defined before proceeding

		try {
			const response = await axios.get(
				`http://localhost:3001/getProfilePopular?page=${page}&userId=${user.userId}`
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

		// Check if user is not null before fetching data
		if (user) fetchMoreData();
	}, [user]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const handleCommentClick = (post, postId, car, user) => {
		console.log(postId);
		setModalPost(post);
		setisCommentModalOpen(true);
		setModalPostId(postId);
		setCar(car);
		setUser(user);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
		setisCommentModalOpen(false);
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
								/>
								<a className="post-user">{user.username}</a>
							</header>
							{car ? (
								<p>
									Brand: {car.brand} - Model: {car.model} - Year: {car.year}
								</p>
							) : (
								<p>No car information available.</p>
							)}
							<p>{post.description}</p>
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
							<LikeButton post={post} />
								<button id="comment-button" className="post-button"
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

export default ProfilePopular;
