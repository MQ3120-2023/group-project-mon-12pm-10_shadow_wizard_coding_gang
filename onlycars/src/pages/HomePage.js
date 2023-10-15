import SearchBar from "../components/SearchBar";

const HomePage = () => {
    return (
        <div id="main-container">
            <div id="header"></div>

            <div id="logo-container"></div>

            <div id="search-container">
                <SearchBar></SearchBar>
            </div>

            <div id="profile-container"></div>

            <div id="posts-container">

                <div id="sorting-container">
                    <button type="button">Latest Posts</button>
                    <button type="button">Popular posts</button>
                </div>

                

            </div>

            <div id="info-container"></div>
        </div>
    );
};

export default HomePage;
