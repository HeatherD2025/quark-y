import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { userContext } from "./ContextProvider";

const ProtectedRoute = ({children}) => {
  const { authenticated } = useContext(userContext);

  if (!authenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;