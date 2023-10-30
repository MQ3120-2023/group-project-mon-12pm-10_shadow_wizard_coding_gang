import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Posts = ({ path }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/getAllPosts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section id="posts-container">
            {posts.map((post, index) => (
                <section className="post-container" key={index}>
                    <header className="post-header">
                        <img
                            className="post-pfp"
                            src={`https://res.cloudinary.com/dv8lielzo/image/upload/v1698653910/ProfileTest.png`}
                            alt="User Profile Picture"
                        />
                        <a className="post-user">{post.user}User</a>
                    </header>
                    <p>
                        {post.carManufacturer}Car Manu - {post.carModel}Model -{" "}
                        {post.carYear}Year
                    </p>
                    <p>{post.description}</p>
                    <p>{post.date}</p>
                    <figure className="post-images">
                        <Slider {...settings}>
                            {/* {post.images.map((image, imgIndex) => ( */}
                                <img
                                    // key={imgIndex}
                                    src={`https://res.cloudinary.com/dv8lielzo/image/upload/v1698653910/ProfileTest.png`}
                                    // alt={`Post image ${imgIndex + 1}`}
                                />
                            {/* ))} */}
                        </Slider>
                    </figure>
                </section>
            ))}
        </section>
    );
};

export default Posts;
