import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import React, { useState } from "react";
import Profile from "../components/Profile";
import ButtonBarPosts from "../components/ButtonBarPosts";
import ProfileLatest from "../components/ProfileLatest";
import ProfilePopular from "../components/ProfilePopular";
import NewCarButton from "../components/NewCarButton";
import NewCarModal from "../components/NewCarModal.js";

const ProfilePage = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [isNewCarModalOpen, setIsNewCarModalOpen] = useState(false);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const openNewCarModal = () => {
        setIsNewCarModalOpen(true);
    };
    const closeNewCarModal = () => {
        setIsNewCarModalOpen(false);
    };

    return (
        <main id="main-container">
            <section id="header"></section>

            <div id="logo-container">
                <div id="text-logo"></div>
            </div>

            <aside id="search-container">
                <SearchBar />
            </aside>

            <nav id="navbar-container">
                <NavBar />
            </nav>

            <section id="mid-container">
                <Profile />

                <ButtonBarPosts handleButtonClick={handleButtonClick} />

                {activeButton === 1 && <ProfileLatest />}
                {activeButton === 2 && <ProfilePopular />}
            </section>

            <aside id="info-container">
                <Info infoType="User's Cars" />
                <NewCarButton onClick={openNewCarModal} />
                <NewCarModal
                    isOpen={isNewCarModalOpen}
                    onRequestClose={closeNewCarModal}
                />
            </aside>
        </main>
    );
};

export default ProfilePage;
