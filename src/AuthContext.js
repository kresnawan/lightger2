    import React, { createContext, useContext, useState } from 'react';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [isAuthenticated, setIsAuthenticated] = useState(false); // Or get from local storage/API
      const [user, setUser] = useState({});

      const login = () => setIsAuthenticated(true);
      const logout = () => setIsAuthenticated(false);
      const setUserLog = (obj) => {
        setUser(obj);
      }

      return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUserLog }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };