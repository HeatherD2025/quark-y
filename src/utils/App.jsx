import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "../features/auth/authSlice";

import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import News from "../pages/News";
import Account from "../pages/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/index.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
        <Router>
          <Navigation />
            <Routes>
              {/* VISITOR ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              {/* USER PROTECTED ROUTES */}
              <Route 
                path="/account" 
                element={
                <ProtectedRoute>
                  <Account />
                    {/* <Route path="/user/:userId" element={<Account />}/> */}
                </ProtectedRoute>
                } 
              />
            </Routes>
        </Router>
  );
}

export default App;
