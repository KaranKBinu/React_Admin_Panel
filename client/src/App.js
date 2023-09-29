import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser'; // Add CreateUser component
import ReadUsers from './components/ReadUsers'; // Add ReadUsers component
import UpdateUser from './components/UpdateUser'; // Add UpdateUser component
import DeleteUser from './components/DeleteUser'; // Add DeleteUser component
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'; // Import 'Router' instead of 'BrowserRouter'

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(null);

  // Check for a saved login state in localStorage when the component mounts
  useEffect(() => {
    const savedAdminLoginState = localStorage.getItem('adminLoggedIn');
    if (savedAdminLoginState === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isAdminLoggedIn) {
      // Fetch user data when admin is logged in
      axios
        .get('http://localhost:5000/api/getUserData/')
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogin = () => {
    setAdminError(null);

    // Replace with your admin login authentication logic
    axios
      .post('http://localhost:5000/api/admin/login', {
        username: adminUsername,
        password: adminPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          // Save the login state to localStorage
          localStorage.setItem('adminLoggedIn', 'true');
          setIsAdminLoggedIn(true);
        } else {
          setAdminError('Admin login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        setAdminError('Admin login failed. Please try again later.');
      });
  };

  const handleAdminLogout = () => {
    // Clear the login state from localStorage
    localStorage.removeItem('adminLoggedIn');
    setIsAdminLoggedIn(false);
    setAdminUsername('');
    setAdminPassword('');
    setUserData(null);
  };

  return (
    <div className="App">
   
      <Navbar isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />

        <Routes>
          <Route
            path="/login"
            element={
              isAdminLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login
                  adminUsername={adminUsername}
                  adminPassword={adminPassword}
                  adminError={adminError}
                  handleAdminLogin={handleAdminLogin}
                  setAdminUsername={setAdminUsername}
                  setAdminPassword={setAdminPassword}
                />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAdminLoggedIn ? (
                <Dashboard userData={userData} handleAdminLogout={handleAdminLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        {/* Create route */}
        <Route
          path="/create"
          element={
            isAdminLoggedIn ? (
              <CreateUser />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Read route */}
        <Route
          path="/read"
          element={
            isAdminLoggedIn ? (
              <ReadUsers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Update route */}
        <Route
          path="/update/:id"
          element={
            isAdminLoggedIn ? (
              <UpdateUser />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Delete route */}
        <Route
          path="/delete/:id"
          element={
            isAdminLoggedIn ? (
              <DeleteUser />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default App;
