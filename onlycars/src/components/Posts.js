import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getPosts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    return (
        <div>
          {posts.map((post, index) => (
            <div key={index}>
                <p>{post.user}</p>
                <p>{post.carManufacturer} - {post.carModel} - {post.carYear}</p>
                <p>{post.description}</p>
                <p>{post.date}</p>
                {post.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={`http://localhost:3001/images/${image}`} alt={`Post image ${imgIndex + 1}`} />
                ))}
            </div>
          ))}
        </div>
    );
}

export default Posts; 