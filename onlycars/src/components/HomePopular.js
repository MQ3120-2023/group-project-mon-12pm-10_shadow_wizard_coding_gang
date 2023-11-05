import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";

const HomePopular = ({ user }) => {
    const { currentUser } = useContext(CurrentUserContext);
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const fetchMoreData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3001/getHomePopular?page=${page}&userId=${currentUser?.userId}`
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

		// Fetch initial data based on new sortType
		fetchMoreData();
	}, [user]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
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
								<button id="comment-button" className="post-button">
									Comment
								</button>
							</div>
						</section>
					);
				})}
			</InfiniteScroll>
		</section>
	);
};

export default HomePopular;
