import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthProvider';
import './styles/App.css';
import './styles/components.css';

function App() {
  // State for user authentication
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch user data on initial load or after login
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout');
      if (response.ok) {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthProvider currentUser={currentUser} setCurrentUser={setCurrentUser}>
      <Router>
        <div className="app">
          <Navbar currentUser={currentUser} handleLogout={handleLogout} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={currentUser ? <MovieList /> : <Navigate to="/login" />} />
            <Route path="/movie/:id" element={currentUser ? <MovieDetails /> : <Navigate to="/login" />} />
            <Route path="/profile" element={currentUser ? <UserProfile /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;