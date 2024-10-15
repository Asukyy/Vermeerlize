import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CreatePost, Home, Login, Register, Subscribe, Stats, Payment, PaymentSuccess,
   PaymentCancel, Profile, ChangePassword, AccountManagement, PersonalFeed, UniversalUpscaler,
  CanvasEditor, RealtimeGeneration } from './pages';
import Sidebar from './components/Sidebar/Sidebar';
import CreatePostSidebar from './components/Sidebar/CreatePostSidebar';

import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Ajout d'un état de chargement

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Une fois la vérification terminée, on arrête le chargement
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
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <MainApp user={user} onLogout={handleLogout} onLogin={handleLogin} />
    </BrowserRouter>
  );
};

const MainApp = ({ user, onLogout, onLogin }) => {
  const location = useLocation();

  const publicRoutes = ['/login', '/register'];

  const hideSidebarRoutes = ['/login', '/register', '/payment', '/payment-success', '/payment-cancel', '/canvas-editor'];
  const isCreatePostPage = location.pathname === '/create-post';

  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {shouldShowSidebar && (
        isCreatePostPage ? (
          <CreatePostSidebar user={user} />
        ) : (
          <Sidebar user={user} onLogout={onLogout} />
        )
      )}
      <main style={{ flex: 1, padding: shouldShowSidebar ? '16px' : '0', backgroundColor: '#171b25' }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute user={user} />}>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/create-post" element={<CreatePost user={user} />} />
              <Route path="/subscription" element={<Subscribe />} />
              <Route path="/settings" element={<Profile />} />
              <Route path="/settings/change-password" element={<ChangePassword />} />
              <Route path="/settings/account-management" element={<AccountManagement />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/personal-feed" element={<PersonalFeed user={user} />} />
              <Route path="/universal-upscaler" element={<UniversalUpscaler />} />
              <Route path="/canvas-editor" element={<CanvasEditor />} />
              <Route path="/realtime-generation" element={<RealtimeGeneration />} />
            </Route>
          </Routes>
        </main>
      </div>
    );
  };

export default App;
