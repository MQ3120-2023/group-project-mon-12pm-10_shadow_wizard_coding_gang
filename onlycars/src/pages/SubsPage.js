import SearchBar from "../components/SearchBar";
import Subs from "../components/Subs";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";

const SubsPage = () => {
    return (
        <main id="main-container">
            
            <section id="header"/>

            <div id="logo-container">
                <div id="text-logo"></div>
            </div>

            <aside id="search-container">
                <SearchBar/>
            </aside>

            <nav id="navbar-container">
                <NavBar/>
            </nav>

            <Subs path="getAllUsers"/>

            <aside id="info-container">
                <Info infoType="Manage Payment Details"/>
            </aside>

        </main>
    );
};

export default SubsPage;
