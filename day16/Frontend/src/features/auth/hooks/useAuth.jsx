import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";


export function useAuth() {
    const context = useContext(AuthContext)

    const { user, loading, setLoading, setUser } = context; 
    

    const handleRegister = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await register(email, username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    };
    
    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
          const response = await login(email, password);
            setUser(response.user);

        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }  
    }

  
    const handleGetMe = async () => {
      setLoading(true);
      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };
  
  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await logout();
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        handleGetMe();
    }, [])

    return {
      user,
      loading,
      handleRegister,
      handleLogin,
      handleGetMe,
      handleLogout,
    };
}