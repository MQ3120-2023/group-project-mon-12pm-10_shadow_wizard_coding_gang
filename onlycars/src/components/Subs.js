import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Subs = ({ path }) => {
	const currentUser = useContext(CurrentUserContext);
	const [subs, setSubs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/getUserSubs?userId=${currentUser.currentUser.userId}`)
			.then((response) => {
				setSubs(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, [currentUser]); // Add currentUser as a dependency for the effect

	const handleUserClick = (user) => {
		// Navigate to the ProfilePage with the username as a parameter
		// and pass the user data as state
		navigate(`/profile`, { state: { user } });
	};

	return (
		<section id="posts-container">
			{subs.map((sub, index) => (
				<section className="sub-container" key={index}>
					<div className="subs-left" onClick={() => handleUserClick(sub)}>
						<img
							className="subs-pfp"
							src={sub.profilepic}
							alt="User Profile Picture"
							style={{ cursor: "pointer" }}
						/>
						<a className="subs-user" style={{ cursor: "pointer" }}>
							{sub.username}
						</a>
					</div>
					<div className="subs-right">
						<p>Posts Made: {sub.posts}</p>
						<p>Subscribers: {sub.subscribers.length}</p>
						<p>Cars Owned: {sub.cars}</p>
					</div>
                    <button className="unsubscribe">X</button>
				</section>
			))}
			<p style={{ textAlign: "center" }}>
				<b>No Posts? Go to Explore for more posts!</b>
			</p>
		</section>
	);
};

export default Subs;
