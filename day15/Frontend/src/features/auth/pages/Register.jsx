import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const { handleRegister } = useAuth();

    async function submitHandler(e) {
        e.preventDefault();

        handleRegister(username, email, password)
            .then(res => {
                console.log(res)
            });

        setUsername('');
        setEmail('');
        setPassword('');
    }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
          <input
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
          <input
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
