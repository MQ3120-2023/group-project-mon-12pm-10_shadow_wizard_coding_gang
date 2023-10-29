import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ButtonBarExplore from "../components/ButtonBarExplore";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";
import PostsExplore from "../components/PostsExplore";
import UsersExplore from "../components/UsersExplore";
import CarsExplore from "../components/CarsExplore";
import Info from "../components/Info";

const ExplorePage = () => {
    const [activeButton, setActiveButton] = useState(1);
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
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
                <NewPostButton/>
                <NewEventButton/>
            </nav>

            <section id="mid-container">
                <ButtonBarExplore handleButtonClick={handleButtonClick} />

                {activeButton === 1 && <PostsExplore/>}
                {activeButton === 2 && <UsersExplore/>}
                {activeButton === 3 && <CarsExplore/>}
            </section>

            <aside id="info-container">
                <Info infoType="Advanced Search" />
            </aside>
        </main>
    );
};

export default ExplorePage;
