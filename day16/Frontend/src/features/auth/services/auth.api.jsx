import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(email, username, password) {
  try {
    const { data } = await api.post("/register", {
      email,
      username,
      password,
    });

    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;

    console.error("Register Error:", message);
    throw new Error(message);
  }
}

export async function login(email, password) {
    try {
        const { data } = await api.post("/login", {
          email,
          password,
        });
        return data;
    } catch (error) {
        console.log(error)
    }
    
}
