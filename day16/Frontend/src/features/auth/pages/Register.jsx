import React, { useState } from 'react'
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router";

const Register = () => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  async function submitHandler(e) {
    e.preventDefault()

    handleRegister(email, username, password)
      .then(res => {
        console.log(res)
        navigate('/')
        
    })
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-top">
          <h1 className="register-heading">Register</h1>
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onInput={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="username">Username</label>
            <input
              value={username}
              type="username"
              name="username"
              id="username"
              placeholder="Enter username"
              required
              onInput={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="text"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              onInput={(e) => setPassword(e.target.value)}
            />
            <button>Register</button>
          </form>
        </div>

        <div className="form-bottom">
          <p className="register-desc">
            Already have an account <Link to={"/login"}>login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register
