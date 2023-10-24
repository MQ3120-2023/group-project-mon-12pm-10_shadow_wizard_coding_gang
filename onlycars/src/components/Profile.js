import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [Profile, setProfile] = useState([]);

  const username = localStorage.getItem('username');

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCurrentUser", {
        params: {
          username: username
        }
      })
      .then((response) => {
        setProfile(response.data)
        console.log(Profile);
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <section>
    {Profile.map((user, index) => (
        <section class="profile-container" key={index}>
          <img class="profile-banner"
              src="http://localhost:3001/images/car1.jpg"
              alt="Profile Banner"
            />
          <header class="profile-header">
            <h1 class="profile-user">{user.username}</h1>
            <sub class="profile-location">{user.location}</sub>
          </header>
            <p>{user.description}</p>
            <p>Cars Owned: {user.cars}</p>
            <p>Posts Made: {user.posts}</p>
        </section>
      ))}
    </section>
  );
}

export default Profile;
