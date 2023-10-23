import React, { useEffect, useState } from "react";
import axios from "axios";

const Subs = ({path}) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/" + path)
      .then((response) => {
        setSubs(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <section id="posts-container">
    {subs.map((sub, index) => (
        <section class="sub-container" key={index}>
          <header class="sub-header">
            <img class="sub-pfp"
              src={`http://localhost:3001/images/${sub.userPFP}`}
              alt="User Profile Picture"
            />
            <a class="sub-user">{sub.username}</a>
          </header>
            <p>
              {sub.carManufacturer} - {sub.carModel} - {sub.carYear}
            </p>
            <p>{sub.description}</p>
            <p>{sub.date}</p>
          <figure class="sub-images">
          {sub.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={`http://localhost:3001/images/${image}`} alt={`Post image ${imgIndex + 1}`} />
                  ))}
          </figure>
        </section>
      ))}
    </section>
  );
}

export default Subs;
