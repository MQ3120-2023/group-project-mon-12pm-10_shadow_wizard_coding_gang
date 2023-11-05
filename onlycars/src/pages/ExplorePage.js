import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ButtonBarExplore from "../components/ButtonBarExplore";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";
import ExplorePosts from "../components/ExplorePosts";
import ExploreUsers from "../components/ExploreUsers";
import ExploreCars from "../components/ExploreCars";
import ExploreEvents from "../components/ExploreEvents";
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
            </aside>

            <nav id="navbar-container">
                <NavBar />
            </nav>

            <section id="mid-container">
                <ButtonBarExplore handleButtonClick={handleButtonClick} />

                {activeButton === 1 && <ExplorePosts/>}
                {activeButton === 2 && <ExploreUsers/>}
                {activeButton === 3 && <ExploreCars/>}
                {activeButton === 4 && <ExploreEvents/>}
            </section>

            <aside id="info-container">
            </aside>
        </main>
    );
};

export default ExplorePage;
