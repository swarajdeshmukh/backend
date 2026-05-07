import { useState, useEffect } from "react";
import axios from "axios";

import "./app.css";

const App = () => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setuser(res.data.user);
    });
  }, []);

  return (
    <div className="main">
      <h1>users</h1>

      <ul>
        {user.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;