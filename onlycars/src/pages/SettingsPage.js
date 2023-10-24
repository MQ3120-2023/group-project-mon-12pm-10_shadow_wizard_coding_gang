import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import { useEffect } from 'react';

const SettingsPage = () => {

    const username = localStorage.getItem('username');

    return (
        <main id="main-container">
            
            <section id="header"></section>

            <div id="logo-container">
            </div>

            <aside id="search-container">
                <SearchBar/>
            </aside>

            <nav id="navbar-container">
                <NavBar/>
            </nav>

            <Posts path='getPosts'/>

            <aside id="info-container">
                <Info infoType="Upcoming Events"/>
            </aside>

        </main>
    );
};

export default SettingsPage;
