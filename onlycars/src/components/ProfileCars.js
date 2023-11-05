import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileCars = ({ user }) => {
	const [cars, setCars] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const fetchMoreData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3001/getUserCars?page=${page}&userId=${user.userId}`
			);
			if (response.data.length > 0) {
				setCars([...cars, ...response.data]);
				setPage(page + 1);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching more data:", error);
		}
	};

	useEffect(() => {
		if (user) {
			fetchMoreData(); // Call only if user is not null
		}
	}, [user]); // Add user to the dependency array

	return (
		<InfiniteScroll
			dataLength={cars.length}
			next={fetchMoreData}
			hasMore={hasMore}
			loader={<h4>Loading...</h4>}
			scrollableTarget="posts-container"
			id="infinite-scroll"
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>No Cars? Add more!</b>
				</p>
			}
		>
			{cars.map((car, index) => {
				return (
					<section className="info-card-container" key={index}>
						<img
							className="info-card-image"
							key={0}
							src={car.images[0]}
							alt={`Car Image 1`}
						/>

						<div className="sub-right">
							<p>
								Brand/Model: {car.brand} {car.model}
							</p>
							<p>Year: {car.year}</p>
							<p>Modifications: {car.modifications}</p>
						</div>
					</section>
				);
			})}
		</InfiniteScroll>
	);
};

export default ProfileCars;
