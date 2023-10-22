import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";

const HomePage = () => {
    return (
        
        <main id="main-container">
            
            <section id="header"></section>

            <div id="logo-container">
            </div>

            <aside id="search-container">
                <SearchBar></SearchBar>
            </aside>

            <nav id="profile-container">
            </nav>

            <Posts></Posts>

            <aside id="info-container">
            </aside>

        </main>
    );
};

export default HomePage;