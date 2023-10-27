import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = ({path}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/" + path)
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <section id="posts-container">
    {posts.map((post, index) => (
        <section className="post-container" key={index}>
          <header className="post-header">
            <img className="post-pfp"
              src={`http://localhost:3001/images/car01.jpg`}
              alt="User Profile Picture"
            />
            <a className="post-user">{post.user}</a>
          </header>
            <p>
              {post.carManufacturer} - {post.carModel} - {post.carYear}
            </p>
            <p>{post.description}</p>
            <p>{post.date}</p>
          <figure className="post-images">
          {post.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={`http://localhost:3001/images/car01.jpg`} alt={`Post image ${imgIndex + 1}`} />
                  ))}
          </figure>
        </section>
      ))}
    </section>
  );
}

export default Posts;
