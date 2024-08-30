import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreatePost, Home, Login, Register, Subscribe, Stats, Payment, PaymentSuccess, PaymentCancel, Profile } from './pages';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token); // Stocker le token JWT
  };


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Sidebar user={user} onLogout={handleLogout} />
      <main style={{ marginLeft: 240, padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/create-post" element={<PrivateRoute user={user}><CreatePost user={user} /></PrivateRoute>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscription" element={<PrivateRoute user={user}><Subscribe /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute user={user}><Profile /></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute user={user}><Stats /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute user={user}><Payment /></PrivateRoute>} />
          <Route path="/payment-success" element={<PrivateRoute user={user}><PaymentSuccess /></PrivateRoute>} />
          <Route path="/payment-cancel" element={<PrivateRoute user={user}><PaymentCancel /></PrivateRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
