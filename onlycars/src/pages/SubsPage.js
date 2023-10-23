import SearchBar from "../components/SearchBar";
import Subs from "../components/Subs";
import NavBar from "../components/NavBar";
import Info from "../components/Info";

const SubsPage = () => {
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

            <Subs path="credentials"/>

            <aside id="info-container">
                <Info infoType="Manage Payment Details"/>
            </aside>

        </main>
    );
};

export default SubsPage;
