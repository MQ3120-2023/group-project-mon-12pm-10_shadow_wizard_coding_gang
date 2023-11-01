import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getExploreCars?page=${page}`
      );
      if (response.data.length > 0) {
        setCars([...cars, ...response.data]);
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="posts-container">
      <InfiniteScroll
        dataLength={cars.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="posts-container"
        id="infinite-scroll"
      >
        {cars.map((car, index) => {
          const user = car.user;
          return (
            <section className="explore-car-container" key={index}>
              <div className="sub-left">
                <Slider {...settings}>
                  {car.images.map((image, imgIndex) => (
                    <img
                      className="explore-car-img"
                      key={imgIndex}
                      src={image}
                      alt={`Car Image ${imgIndex + 1}`}
                    />
                  ))}
                </Slider>
                <a className="sub-user">{user.username}</a>
              </div>
              <div className="sub-right">
                <p>
                  Brand/Model: {car.brand} {car.model}
                </p>
                <p>Year: {car.year}</p>
                <p>Modifications: {car.modifications}</p>
              </div>
            </section>
          );
        })}
      </InfiniteScroll>
    </section>
  );
};

export default ExploreCars;
