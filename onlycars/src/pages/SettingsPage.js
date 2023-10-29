import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ButtonBarSettings from "../components/ButtonBarSettings";
import UserSettings from '../components/UserSettings';
import ProfileSettings from '../components/ProfileSettings';
import SecuritySettings from '../components/SecuritySettings';
import Info from "../components/Info";

const SettingsPage = () => {
    const [activeButton, setActiveButton] = useState(1);
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

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
                <ButtonBarSettings handleButtonClick={handleButtonClick} />

                {activeButton === 1 && <UserSettings/>}
                {activeButton === 2 && <ProfileSettings/>}
                {activeButton === 3 && <SecuritySettings/>}
            </section>

            <aside id="info-container">
                <Info infoType="Upcoming Events" />
            </aside>
        </main>
    );
};

export default SettingsPage;
