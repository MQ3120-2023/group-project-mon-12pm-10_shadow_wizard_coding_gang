import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import React, { useState, useEffect, useContext } from "react";
import Profile from "../components/Profile";
import ButtonBarPosts from "../components/ButtonBarPosts";
import ProfileLatest from "../components/ProfileLatest";
import ProfilePopular from "../components/ProfilePopular";
import NewCarButton from "../components/NewCarButton";
import NewCarModal from "../components/NewCarModal.js";
import SubButton from "../components/SubButton";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../App";

const ProfilePage = () => {
	const location = useLocation();
	const { currentUser } = useContext(CurrentUserContext);
	console.log(currentUser.currentuser);
	const [profileUser, setProfileUser] = useState(null);
	const [activeButton, setActiveButton] = useState(1);
	const [isNewCarModalOpen, setIsNewCarModalOpen] = useState(false);

	useEffect(() => {
		// If there is user data passed in the location state, use that
		// Otherwise, use the currentUser from context
		setProfileUser(location.state?.user || currentUser);
	}, [location, currentUser]);

	// Function to determine if the profile being viewed is the current user's profile
	const isCurrentUserProfile = () => {
		if (
			profileUser !== null &&
			profileUser !== undefined &&
			currentUser !== null &&
			currentUser !== undefined &&
			profileUser.userId === currentUser.userId
		) {
			return true;
		}
		return false;
	};

	const handleButtonClick = (buttonId) => {
		setActiveButton(buttonId);
	};

	const openNewCarModal = () => {
		setIsNewCarModalOpen(true);
	};
	const closeNewCarModal = () => {
		setIsNewCarModalOpen(false);
	};

	// profileUser.subscribers.map((user) => {
	// 	if (
	// 		currentUser !== null ||
	// 		currentUser !== undefined
	// 	) {
	// 		if (currentUser.currentUser.userId == user) {
	// 			setIsSubscribed(true);
	// 		}
	// 	}
	// });



	return (
		<main id="main-container">
			<section id="header"></section>

			<div id="logo-container">
				<div id="text-logo"></div>
			</div>

			<aside id="search-container">
			</aside>

			<nav id="navbar-container">
				<NavBar />
			</nav>

			<section id="mid-container">
				<Profile user={profileUser} />

				{!isCurrentUserProfile() && <SubButton user={profileUser} />}

				<ButtonBarPosts handleButtonClick={handleButtonClick} />

				{activeButton === 1 && <ProfileLatest user={profileUser} />}
				{activeButton === 2 && <ProfilePopular user={profileUser} />}
			</section>

			<aside id="info-container">
				<Info infoType="User's Cars" user={profileUser} />
                

				{isCurrentUserProfile() && <NewCarButton onClick={openNewCarModal} />}
				<NewCarModal
					isOpen={isNewCarModalOpen}
					onRequestClose={closeNewCarModal}
				/>
			</aside>
		</main>
	);
};

export default ProfilePage;
