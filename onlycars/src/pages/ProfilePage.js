import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Info from "../components/Info";
import Profile from "../components/Profile";
import ButtonBarPosts from "../components/ButtonBarPosts";
import ProfilePosts from "../components/ProfilePosts";
import NewPostButton from "../components/NewPostButton";
import NewEventButton from "../components/NewEventButton";
import NewCarButton from "../components/NewCarButton";

const ProfilePage = () => {
    return (
        <main id="main-container">
            <section id="header"></section>

            <div id="logo-container">
                <div id="text-logo"></div>
            </div>

            <aside id="search-container">
                <SearchBar />
            </aside>

            <nav id="navbar-container">
                <NavBar />
            </nav>

            <section id="mid-container">
                <Profile />

                <ButtonBarPosts/>

                <ProfilePosts path="getProfilePosts"/>
            </section>

            <aside id="info-container">
                <Info infoType="User's Cars" />
                <NewCarButton/>
            </aside>
        </main>
    );
};

export default ProfilePage;
