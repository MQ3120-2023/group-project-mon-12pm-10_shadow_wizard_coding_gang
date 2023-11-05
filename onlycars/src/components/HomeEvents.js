import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

const HomeEvents = () => {
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/getExploreEvents?page=${page}`
            );
            if (response.data.length > 0) {
                setEvents([...events, ...response.data]);
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

    useEffect(() => {
        axios
            .get("/getExploreEvents")
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
            <InfiniteScroll
                dataLength={events.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="posts-container"
                id="infinite-scroll"
                endMessage={
					<p style={{ textAlign: "center" }}>
						<b>No Events? Find more in Explore!</b>
					</p>
				}
            >
                {events.map((event, index) => {
                    const user = event.user;
                    return (
                        <section className="info-card-container" key={index}>
                            <img
                                className="info-card-image"
                                src={event.banner}
                                alt="Event Banner"
                            />
                            <section className="info-card-right">
                                <header className="info-card-header">
                                    <p className="info-card-name">
                                        <b>{event.title}</b>{" "}<br />
                                        {moment(event.date).format('DD/MM/YYYY')}
                                    </p>
                                </header>
                            </section>
                        </section>
                    );
                })}
            </InfiniteScroll>
    );
};

export default HomeEvents