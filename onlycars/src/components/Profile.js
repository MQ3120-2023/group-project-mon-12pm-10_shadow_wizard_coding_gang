import React, { useEffect, useState } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";

const Profile = () => {
    const currentUser = CurrentUserContext;
    const [userData, setUserData] = useState(null); // Declare state variable
    const user = 1;
    const index = 1;

    useEffect(() => {
        const currentUser = async () => {
            const response = await axios.get(
                "/currentUser",
                {
                    timeout: 5000,
                    withCredentials: true,
                }
            );
            console.log("Profile " + response.data);
            setUserData(response.data); // Update state variable
        };

        currentUser();
    }, []);

    return (
        <section>
            {/* {userData &&
                userData.map(
                    (
                        user,
                        index // Check if userData is not null
                    ) => ( */}
            <section className="profile-container" key={index}>
                <img
                    className="profile-banner"
                    src={user.profilepic}
                    alt="Profile Banner"
                />
                <header className="profile-header">
                    <h1 className="profile-user">{user.username}</h1>
                    <sub className="profile-location">{user.location}</sub>
                </header>
                <p>{user.description}</p>
                <aside id="profile-info">
                    <p>Cars Owned: {user.cars}</p>
                    <p>Posts Made: {user.posts}</p>
                </aside>
            </section>
            {/* )
                )} */}
        </section>
    );
};

export default Profile;
