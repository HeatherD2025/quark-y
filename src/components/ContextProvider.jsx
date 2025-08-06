import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { removeToken } from "../utils/tokenService";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [authenticated, setAuthenticated] = useState(Boolean(token));
  const [isAdmin, setIsAdmin] = useState(true); 

  useEffect(() => {
    setAuthenticated(Boolean(token));
  }, [token]); 

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    setIsAdmin(false);
    setAuthenticated(false);
  };

  return (
    <userContext.Provider value={{ isAdmin, authenticated, handleLogout }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
