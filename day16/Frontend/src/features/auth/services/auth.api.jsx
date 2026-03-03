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

export async function login(email, username, password) {
  try {
    const { data } = await api.post("/login", {
      email,
      username,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const { data } = await api.get("/getMe");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const { data } = await api.get("/logout");
    return data;
  } catch (error) {
    console.log(error);
  }
}