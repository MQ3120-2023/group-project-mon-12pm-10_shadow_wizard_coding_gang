
import React, { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Backend registration logic
        // For demonstration, we'll use the same /login endpoint
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
            alert('Registration failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <label>Confirm Password:</label>
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <br />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;