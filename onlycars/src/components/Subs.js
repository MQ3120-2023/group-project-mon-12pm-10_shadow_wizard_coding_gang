import React, { useEffect, useState } from "react";
import axios from "axios";

const Subs = ({ path }) => {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/" + path)
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
                <section class="sub-container" key={index}>
                    <div class="sub-left">
                        <img
                            class="sub-pfp"
                            src={`http://localhost:3001/images/${sub.userPFP}`}
                            alt="User Profile Picture"
                        />
                        <a class="sub-user">{sub.username}</a>
                    </div>
                    <div class="sub-right">
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