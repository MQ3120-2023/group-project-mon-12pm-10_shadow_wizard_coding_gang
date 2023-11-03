import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import React, { useState } from "react";
import Profile from "../components/Profile";
import ButtonBarPosts from "../components/ButtonBarPosts";
import ProfilePosts from "../components/ProfilePosts";
import NewCarButton from "../components/NewCarButton";
import NewCarModal from "../components/NewCarModal.js";

const ProfilePage = () => {
    const [isNewCarModalOpen, setIsNewCarModalOpen] = useState(false);
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

                <ButtonBarPosts />

                <ProfilePosts path="getProfilePosts" />
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
