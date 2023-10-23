import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import ButtonBarExplore from "../components/ButtonBarExplore";
import { useEffect } from 'react';

const ExplorePage = () => {
    
    const username = localStorage.getItem('username');
    
      useEffect(() => {
        if (!username) {
          // Redirect to login page if not logged in
          window.location.href = '/login';
        }
      }, []);

    return (
        <main id="main-container">
            <section id="header"></section>

            <div id="logo-container"></div>

            <aside id="search-container">
                <SearchBar />
            </aside>

            <nav id="navbar-container">
                <NavBar />
            </nav>

            <section id="mid-container">
                <ButtonBarExplore/>

                <Posts path='getPosts'/>
            </section>

            <aside id="info-container">
                <Info infoType="Advanced Search" />
            </aside>
        </main>
    );
};

export default ExplorePage;
