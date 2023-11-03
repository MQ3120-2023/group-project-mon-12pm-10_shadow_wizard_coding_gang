import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import PostImageModal from "./PostImageModal";
import { CurrentUserContext } from "../App";

const ProfileLatest = ({ sortType }) => {
	const currentUser = useContext(CurrentUserContext);
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [modalPost, setModalPost] = useState();

	const fetchMoreData = async () => {
		try {
			console.log(currentUser.currentUser)
			const response = await axios.get(
				`http://localhost:3001/getProfileLatest?page=${page}&userId=${currentUser.currentUser.userId}`
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
	}, [sortType]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
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
							<header className="post-header">
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
							<p>
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
													setModalPost(post)
													setIsImageModalOpen(true)
												}}
											/>
										))}
									</Slider>
								)}
							</figure>
							<div className="post-button-container">
								<button id="like-button" className="post-button">
                                    {post.likes.length} Like
								</button>
								<button id="comment-button" className="post-button">
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
		</section>
	);
};

export default ProfileLatest;
