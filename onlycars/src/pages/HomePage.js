import React, { useState } from "react";
import Modal from 'react-modal';
import SearchBar from "../components/SearchBar";
import HomeLatest from "../components/HomeLatest";
import HomePopular from "../components/HomePopular";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import ButtonBarPosts from "../components/ButtonBarPosts";
import NewEventButton from "../components/NewEventButton";
import NewEventModal from "../components/NewEventModal";

Modal.setAppElement('#root'); // Add this line to avoid accessibility errors

const HomePage = () => {
    const [activeButton, setActiveButton] = useState(1);
    // const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false); // State to manage modal visibility

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    // const openNewPostModal = () => {
    //     setIsNewPostModalOpen(true);
    // };
    // const closeNewPostModal = () => {
    //     setIsNewPostModalOpen(false);
    // };

    const openNewEventModal = () => {
        setIsNewEventModalOpen(true);
    };
    const closeNewEventModal = () => {
        setIsNewEventModalOpen(false);
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
                
                <NewEventButton onClick={openNewEventModal} />
            </nav>

            <section id="mid-container">
                <ButtonBarPosts handleButtonClick={handleButtonClick} />
                {activeButton === 1 && <HomeLatest />}
                {activeButton === 2 && <HomePopular />}
            </section>

            <aside id="info-container">
                <Info infoType="Upcoming Events" />
            </aside>
            <NewEventModal isOpen={isNewEventModalOpen} onRequestClose={closeNewEventModal} />
            {/* <NewPostModal isOpen={isNewPostModalOpen} onRequestClose={closeNewPostModal} /> */}
        </main>
    );
};

export default HomePage;
