import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import Info from "../components/Info";

const HomePage = () => {
    return (
        
        <main id="main-container">
            
            <section id="header"></section>

            <div id="logo-container">
            </div>

            <aside id="search-container">
                <SearchBar/>
            </aside>

            <nav id="profile-container">
                <Profile/>
            </nav>

            <Posts/>

            <aside id="info-container">
                <Info infoType="Upcoming Events"/>
            </aside>

        </main>
    );
};

export default HomePage;