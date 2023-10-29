import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import Profile from "../components/Profile";
import ButtonBarPosts from "../components/ButtonBarPosts";
import Posts from "../components/Posts";

const ProfilePage = () => {
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
                <Profile />

                <ButtonBarPosts/>

                <Posts path='getPosts'/>
            </section>

            <aside id="info-container">
                <Info infoType="User's Cars" />
            </aside>
        </main>
    );
};

export default ProfilePage;
