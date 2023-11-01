import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";

const Profile = () => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <section>
            <section className="profile-container">
                <img
                    className="profile-banner"
                    src={currentUser?.currentUser?.profilepic}
                    alt="Profile Banner"
                />
                <header className="profile-header">
                    <h1 className="profile-user">{currentUser?.currentUser?.username}</h1>
                    <sub className="profile-location">{currentUser?.currentUser?.location}</sub>
                </header>
                <p>{currentUser?.currentUser?.description}</p>
                <aside id="profile-info">
                    <p>Cars Owned: {currentUser?.currentUser?.cars}</p>
                    <p>Posts Made: {currentUser?.currentUser?.posts}</p>
                </aside>
            </section>
            {/* )
                )} */}
        </section>
    );
};

export default Profile;
