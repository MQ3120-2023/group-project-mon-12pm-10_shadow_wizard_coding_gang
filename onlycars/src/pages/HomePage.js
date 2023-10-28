import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import ButtonBarPosts from "../components/ButtonBarPosts";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";
import { useEffect } from 'react';

const HomePage = () => {
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
                <NewPostButton/>
                <NewEventButton/>
            </nav>

            <section id="mid-container">
                <ButtonBarPosts/>

                <Posts path='getPosts'/>
            </section>

            <aside id="info-container">
                <Info infoType="Upcoming Events"/>
            </aside>

        </main>
    );
};

export default HomePage;