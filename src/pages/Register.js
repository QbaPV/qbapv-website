// src/pages/Register.js
import React from 'react';

function Register() {
  return (
    <div>
      <h1>Register Page</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
