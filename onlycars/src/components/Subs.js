import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from "../App";

const Subs = ({ path }) => {
	const currentUser = useContext(CurrentUserContext);
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        axios
            .get(`/getUserSubs?userId=${currentUser.currentUser.userId}`)
            .then((response) => {
                setSubs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [currentUser]); // Add currentUser as a dependency for the effect
    

    return (
        <section id="posts-container">
            {subs.map((sub, index) => (
                <section className="sub-container" key={index}>
                    <div className="sub-left">
                        <img
                            className="sub-pfp"
                            src={sub.profilepic}
                            alt="User Profile Picture"
                        />
                        <a className="sub-user">{sub.username}</a>
                    </div>
                    <div className="sub-right">
                        <p>Posts Made: {sub.posts}</p>
                        <p>Subscribers: {sub.subscribers}</p>
                        <p>Cars Owned: {sub.cars}</p>
                    </div>
                </section>
            ))}
        </section>
    );
};

export default Subs;