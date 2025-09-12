import React from "react";
import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import Register from '../pages/Register'
import LoginForm from "../components/LoginForm";
// import register when done
import NewsPage from "../pages/NewsPage";
import Account from '../pages/Account';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
        <Routes>
          {/* VISITOR ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/newsPage" element={<NewsPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          {/* USER PROTECTED ROUTES */}
          <Route path="/account" element={<Account />} />
        </Routes>
    </Router>
  );
}

export default App;
