import { createContext, useContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await register(email, username, password);

      setUser(response.user);
      return response;
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
            return response;
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }  
    }

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
