import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from"moment";

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

    const SmartText = ({ text, length = 300 }) => {
        const [showLess, setShowLess] = useState(true);
      
        if (text.length < length) {
          return <p className="event-details">{text}</p>;
        }
      
        return (
          <div>
            <p>{ showLess ? `${text.slice(0, length)}...` : text }</p>
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowLess(!showLess)}
            >
              &nbsp;Show {showLess ? "More" : "Less"}
            </a>
          </div>
        );
      };

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
                                <p className="event-name">{event.title}</p>
                                <p className="event-location">{event.location}</p>
                            </header>
                            <p className="event-user">Organised by {user.username}</p>
                            <SmartText text={event.description}/>
                            <aside id="event-info">
                                <p>People Going: {event.attendees}</p>
                                <p id="event-date">Date and Time: {moment(event.date).format('MMMM Do YYYY, h:mm a')}</p>
                            </aside>
                        </section>
                    );
                })}
            </InfiniteScroll>
        </section>
    );
};

export default ExploreEvents;
