import React from "react";
import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import News from "../pages/News";
import Account from "../pages/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ContextProvider from "../components/ContextProvider";
import "../styles/index.css";

function App() {
  return (
    <Router>
      <ContextProvider>
        <Navigation />
        <Routes>
          {/* VISITOR ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/newsPage" element={<News />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          {/* USER PROTECTED ROUTES */}
          <Route 
            path="/account" 
            element={
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
            } 
          />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
