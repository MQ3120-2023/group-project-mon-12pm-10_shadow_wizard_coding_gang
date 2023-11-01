import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePosts = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/getHomePosts?page=${page}`
            );
            if (response.data.length > 0) {
                setPosts([...posts, ...response.data]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    };

    useEffect(() => {
        fetchMoreData(); // Initial fetch
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
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="posts-container"
                id="infinite-scroll"
            >
                {posts.map((post, index) => {
                    const car = post.car;
                    const user = post.user;
                    return (
                        <section className="post-container" key={index}>
                            <header className="post-header">
                                <img
                                    className="post-pfp"
                                    src={user.profilepic}
                                    alt="User Profile Picture"
                                />
                                <a className="post-user">{user.username}</a>
                            </header>
                            {car ? (
                                <p>
                                    Brand: {car.brand} - Model: {car.model} -
                                    Year: {car.year}
                                </p>
                            ) : (
                                <p>No car information available.</p>
                            )}
                            <p>{post.description}</p>
                            <p>{post.date}</p>
                            <figure className="post-images">
                                <Slider {...settings}>
                                    {post.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Post image ${imgIndex + 1}`}
                                        />
                                    ))}
                                </Slider>
                            </figure>
                            <div className="post-button-container">
                                <button id="like-button" className="post-button">
                                    Like
                                </button>
                                <button id="comment-button" className="post-button">
                                    Comment
                                </button>
                            </div>
                        </section>
                    );
                })}
            </InfiniteScroll>
        </section>
    );
};

export default HomePosts;
