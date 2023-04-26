import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../utils/api';


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit executed");
    try {
        console.log("Submitting registration with values:", { username, email, password });

      await api.register(username, email, password);
      history.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
