import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const ExploreUsers = ({ path }) => {
    const [users, setUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMoreData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/getExploreUsers?page=${page}`
            );
            if (response.data.length > 0) {
                setUsers([...users, ...response.data]);
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

    return (
        <section id="posts-container">
            <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="posts-container"
                id="infinite-scroll"
            >
                {users.map((user, index) => (
                    <section className="sub-container" key={index}>
                        <div className="sub-left">
                            <img
                                className="sub-pfp"
                                src={user.profilepic}
                                alt="User's Profile Picture"
                            />
                            <a className="sub-user">{user.username}</a>
                        </div>
                        <div className="sub-right">
                            <p>Posts Made: {user.posts}</p>
                            <p>Subscribers: {user.subscribers}</p>
                            <p>Cars Owned: {user.cars}</p>
                        </div>
                    </section>
                ))}
            </InfiniteScroll>
        </section>
    );
};

export default ExploreUsers;
