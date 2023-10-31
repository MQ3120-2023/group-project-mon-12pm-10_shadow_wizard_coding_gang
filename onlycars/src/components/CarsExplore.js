import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarsExplore = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getCarData");
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchCarData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section id="posts-container">
            {cars.map((car, index) => {
                const user = car.user;
                return (
                <section className="sub-container" key={index}>
                    <div className="sub-left">
                        <Slider {...settings}>
                            {car.images.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={image}
                                    alt={`Car Image ${imgIndex + 1}`}
                                />
                            ))}
                        </Slider>
                        <a className="sub-user">{user.username}</a>
                    </div>
                    <div className="sub-right">
                        <p>Brand/Model: {car.brand} {car.model}</p>
                        <p>Year: {car.year}</p>
                        <p>Modifications: {car.modifications}</p>
                    </div>
                </section>
                );
            })}
        </section>
    );
};

export default CarsExplore;