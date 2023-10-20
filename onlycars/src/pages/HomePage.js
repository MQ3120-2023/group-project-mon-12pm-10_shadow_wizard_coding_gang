import SearchBar from "../components/SearchBar";
import Posts from "../components/Posts";

const HomePage = () => {
    return (
        
        <div id="main-container">
            
            <div id="header"></div>

            <div id="logo-container">
            </div>

            <div id="search-container">
                <SearchBar></SearchBar>
            </div>

            <div id="profile-container">
            </div>

            <div id="posts-container">
                <Posts></Posts>
            </div>

            <div id="info-container">
            </div>

        </div>
    );
};

export default HomePage;