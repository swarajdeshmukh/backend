import { createContext, useState } from "react";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  return (
    <AuthContext.Provider
      value={{ user, loading, setLoading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
