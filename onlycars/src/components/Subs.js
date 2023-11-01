import React, { useEffect, useState } from "react";
import axios from "axios";

const Subs = ({ path }) => {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        axios
            .get("/" + path)
            .then((response) => {
                setSubs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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