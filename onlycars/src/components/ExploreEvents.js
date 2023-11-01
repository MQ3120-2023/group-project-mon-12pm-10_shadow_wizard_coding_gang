import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const ExploreEvents = () => {
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
        <section id="posts-container">
            <InfiniteScroll
                dataLength={events.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="posts-container"
                id="infinite-scroll"
            >
                {events.map((event, index) => {
                    const user = event.user;
                    return (
                        <section className="event-container" key={index}>
                            <img
                                className="event-banner"
                                src={event.banner}
                                alt="Event Banner"
                            />
                            <header className="event-header">
                                <h1 className="event-user">{user.username}</h1>
                                <sub className="event-location">
                                    {event.location}
                                </sub>
                            </header>
                            <p>{event.description}</p>
                            <aside id="event-info">
                                <p>People Going: {event.attendees}</p>
                                <p>Date and Time: {event.date}</p>
                            </aside>
                        </section>
                    );
                })}
            </InfiniteScroll>
        </section>
    );
};

export default ExploreEvents;
