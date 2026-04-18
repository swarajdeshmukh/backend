import { RouterProvider } from "react-router"
import { routes } from "../app/app.routes";
import "./App.css";

import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";

const App = () => {

  const { handleGetMe } = useAuth();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    handleGetMe()
  },[])

  console.log(user)
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
