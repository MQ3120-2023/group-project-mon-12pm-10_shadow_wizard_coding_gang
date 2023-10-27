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
        <section className="profile-container" key={index}>
          <img className="profile-banner"
              src="http://localhost:3001/images/car01.jpg"
              alt="Profile Banner"
            />
          <header className="profile-header">
            <h1 className="profile-user">{user.username}</h1>
            <sub className="profile-location">{user.location}</sub>
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
