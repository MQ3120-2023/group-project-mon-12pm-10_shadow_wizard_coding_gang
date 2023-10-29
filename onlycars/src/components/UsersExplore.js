import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersExplore = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/UsersExplore")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <section id="posts-container">
            {users.map((user, index) => (
                <section className="sub-container" key={index}>
                    <div className="sub-left">
                        <img
                            className="sub-pfp"
                            src={user.profilepic}
                            alt="User's Profile Picture"
                        />
                        <a className="sub-user">{user.username}</a>
                    </div>
                    <div className="sub-right">
                        <p>Posts Made: {user.posts}</p>
                        <p>Subscribers: {user.subscribers}</p>
                        <p>Cars Owned: {user.cars}</p>
                    </div>
                </section>
            ))}
        </section>
    );
};

export default UsersExplore;
