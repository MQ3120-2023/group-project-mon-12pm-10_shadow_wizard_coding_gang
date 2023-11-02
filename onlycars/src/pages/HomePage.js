import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import HomePosts from "../components/HomePosts";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import ButtonBarPosts from "../components/ButtonBarPosts";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";

const HomePage = () => {
    const [sortType, setSortType] = useState('latest'); // Add this line

    const handleSortChange = (newSortType) => { // Add this function
        setSortType(newSortType);
    };

    return (
        
        <main id="main-container">

            <section id="header"></section>

            <div id="logo-container">
                <div id="text-logo"></div>
            </div>

            <aside id="search-container">
                <SearchBar/>
            </aside>

            <nav id="navbar-container">
                <NavBar/>
                <NewPostButton/>
                <NewEventButton/>
            </nav>

            <section id="mid-container">
            <ButtonBarPosts onSortChange={handleSortChange}/> {/* Modify this line */}

            <HomePosts sortType={sortType}/> {/* Modify this line */}
        </section>

            <aside id="info-container">
                <Info infoType="Upcoming Events"/>
            </aside>

        </main>
    );
};

export default HomePage;