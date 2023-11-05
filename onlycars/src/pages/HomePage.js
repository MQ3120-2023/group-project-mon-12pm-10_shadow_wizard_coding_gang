import React, { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import HomeLatest from "../components/HomeLatest";
import HomePopular from "../components/HomePopular";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import ButtonBarPosts from "../components/ButtonBarPosts";
import { CurrentUserContext } from "../App";

const HomePage = () => {
	const currentUser = useContext(CurrentUserContext);
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
                <ButtonBarPosts handleButtonClick={handleButtonClick} />
                {activeButton === 1 && <HomeLatest user={currentUser} />}
                {activeButton === 2 && <HomePopular user={currentUser} />}
            </section>

            <aside id="info-container">
                <Info infoType="Upcoming Events" />
            </aside>
        </main>
    );
};

export default HomePage;
