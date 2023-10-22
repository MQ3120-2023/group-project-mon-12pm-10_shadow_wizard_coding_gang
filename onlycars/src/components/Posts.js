import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPosts")
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
        <section class="post-container" key={index}>
          <header class="post-header">
            <img class="post-pfp"
              src={`http://localhost:3001/images/${post.userPFP}`}
              alt="User Profile Picture"
            />
            <a class="post-user">{post.user}</a>
          </header>
            <p>
              {post.carManufacturer} - {post.carModel} - {post.carYear}
            </p>
            <p>{post.description}</p>
            <p>{post.date}</p>
          <figure class="post-images">
          {post.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={`http://localhost:3001/images/${image}`} alt={`Post image ${imgIndex + 1}`} />
                  ))}
          </figure>
        </section>
      ))}
    </section>
  );
}

export default Posts;
