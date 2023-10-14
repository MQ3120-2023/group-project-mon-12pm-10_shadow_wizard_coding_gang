
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend authentication logic
      console.log('Sending request:', { email, password });
        fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Login successful') {
            // Redirect to home page or dashboard
                        window.location.href = '/';
          } else {
            alert('Invalid credentials');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;