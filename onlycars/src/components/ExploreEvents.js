import React, { useEffect, useState } from "react";
import axios from "axios";

const ExploreEvents = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios
            .get("/CarsExplore")
            .then((response) => {
                setCars(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <section id="posts-container">
            {cars.map((car, index) => (
                <section className="sub-container" key={index}>
                    <div className="sub-left">
                        <img
                            className="sub-pfp"
                            src={car.img}
                            alt="User's Profile Picture"
                        />
                        <a className="sub-user">{car.username}</a>
                    </div>
                    <div className="sub-right">
                        <p>Posts Made: {car.posts}</p>
                        <p>Subscribers: {car.subscribers}</p>
                        <p>Cars Owned: {car.cars}</p>
                    </div>
                </section>
            ))}
        </section>
    );
};

export default ExploreEvents;
