import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el proveedor que envolverá nuestra app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usarlo fácilmente
export const useAuth = () => useContext(AuthContext);