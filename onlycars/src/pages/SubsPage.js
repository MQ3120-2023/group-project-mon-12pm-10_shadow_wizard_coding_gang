import SearchBar from "../components/SearchBar";
import Subs from "../components/Subs";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import { useEffect } from 'react';

const SubsPage = () => {

    const username = localStorage.getItem('username');
    
      useEffect(() => {
        if (!username) {
          // Redirect to login page if not logged in
          window.location.href = '/login';
        }
      }, []);

    return (
        <main id="main-container">
            
            <section id="header"/>

            <div id="logo-container"/>

            <aside id="search-container">
                <SearchBar/>
            </aside>

            <nav id="navbar-container">
                <NavBar/>
            </nav>

            <Subs path="getUser"/>

            <aside id="info-container">
                <Info infoType="Manage Payment Details"/>
            </aside>

        </main>
    );
};

export default SubsPage;
