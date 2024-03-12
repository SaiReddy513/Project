import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file

const Login = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();

 const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(`Username: ${username}, Password: ${password}`);
    // Example navigation after successful login
    navigate('/dashboard');
 };

 return (
    <div className="login-container"> {/* Apply class name */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
 );
};

export default Login;
