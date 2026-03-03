import { Link } from 'react-router';
import '../style/formstyle.scss'
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth()

     if (loading) {
       return <h1>Loading...</h1>;
     }

    async function submitHandler(e) {
        e.preventDefault()

        handleLogin(email, password)
            .then(res => {
                console.log(res)
                navigate('/')
                
        })
    }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-top">
          <h1 className="login-heading">Login</h1>
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
            <button>Login</button>
          </form>
        </div>

        <div className="form-bottom">
          <p className="login-desc">
            Don't have an account <Link to={"/register"}>register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
