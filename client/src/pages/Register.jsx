import React from "react";

export default function Register() {
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder="Enter your name...." />
        <label>Email</label>
        <input type="email" placeholder="Enter Email" />
        <label>Password</label>
        <input type="password" placeholder="Enter Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
