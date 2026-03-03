import { Route, Routes } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/register";
import Protected from "../features/auth/components/Protected";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Protected><h1>Home</h1></Protected>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes
