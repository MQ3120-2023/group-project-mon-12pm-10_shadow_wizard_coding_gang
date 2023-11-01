import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ButtonBarSettings from "../components/ButtonBarSettings";
import SettingsUser from '../components/SettingsUser';
import SettingsProfile from '../components/SettingsProfile';
import SettingsSecurity from '../components/SettingsSecurity';
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

                {activeButton === 1 && <SettingsUser/>}
                {activeButton === 2 && <SettingsProfile/>}
                {activeButton === 3 && <SettingsSecurity/>}
            </section>

            <aside id="info-container">
                <Info infoType="Account Statistics" />
            </aside>
        </main>
    );
};

export default SettingsPage;
