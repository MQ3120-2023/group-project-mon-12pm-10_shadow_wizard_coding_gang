import React from "react";

const Profile = ({ user }) => {
    return (
        <section>
            <section className="profile-container">
                <img
                    className="profile-banner"
                    src={user?.profilepic}
                    alt="Profile Banner"
                />
                <header className="profile-header">
                    <h1 className="profile-user">{user?.username}</h1>
                    <sub className="profile-location">{user?.location}</sub>
                </header>
                <p>{user?.description}</p>
                <aside id="profile-info">
                    <p>Cars Owned: {user?.cars}</p>
                    <p>Posts Made: {user?.posts}</p>
                </aside>
            </section>
            {/* )
                )} */}
        </section>
    );
};

export default Profile;
