import { Route, Routes } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/register";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello home</h1>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes
