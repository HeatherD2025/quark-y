import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { removeToken } from '../utils/tokenService';

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [authenticated, setAuthenticated] = useState(Boolean(token));
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function decodeToken() {
      if (token) {
        try {
          const jwtDecodeModule = await import('jwt-decode');
          console.log('jwtDecodeModule:', jwtDecodeModule);

          // Call jwtDecode function explicitly
          const decoded = jwtDecodeModule.jwtDecode(token);

          setUsername(decoded.username || null);
          setEmail(decoded.email || null);
          setIsAdmin(decoded.isAdmin || false);
          setAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          setAuthenticated(false);
          setUsername(null);
          setEmail(null);
          setIsAdmin(false);
        }
      } else {
        setAuthenticated(false);
        setUsername(null);
        setEmail(null);
        setIsAdmin(false);
      }
    }

    decodeToken();
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    setIsAdmin(false);
    setAuthenticated(false);
    setUsername(null);
    setEmail(null);
  };

  return (
    <userContext.Provider
      value={{ isAdmin, authenticated, username, email, handleLogout }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
