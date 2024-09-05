import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Image as ImageIcon,
  Brush as BrushIcon,
  Cached as GenerateIcon,
  Edit as EditIcon,
  Expand as ExpandIcon,
  BarChart as BarChartIcon,
  MonetizationOn as MonetizationOnIcon,
  Texture as TextureIcon,
  NewReleases as NewReleasesIcon,
  Api as ApiIcon,
  Settings as SettingsIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import '../../styles/Sidebar.css';
import coinLogo from '../../assets/coin-logo2.png';
import logo from '../../assets/logo.png';

const Sidebar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/v1/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success) {
              setUser(data.user);
            } else {
              console.error('Failed to fetch user data');
            }
          } else {
            const text = await response.text();
            console.error(`Expected JSON but received: ${contentType}. Response text: ${text}`);
          }
        } else {
          const errorText = await response.text();
          console.error(`Failed to fetch user data. Status: ${response.status}. Response: ${errorText}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpgradeClick = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement click
    navigate('/subscription');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
            <h1><span>V</span>ermeerlize</h1>
          </Link>
        </div>
        <hr className="line-side"></hr>
        {user && (
          <div className="profile" onClick={handleMenuClick} style={{ cursor: 'pointer' }}>
            <div className="profile-pic">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-info">
              <div className="profile-name">
                <h2>{user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name}</h2>
                <button className="upgrade" onClick={handleUpgradeClick}>Upgrade</button>
              </div>
              <div className="points-container">
                <img src={coinLogo} alt="Coin Logo" className="coin-logo" />
                <span className="badge">{user.money || 0}</span>
              </div>
            </div>
          </div>
        )}

        {user && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/subscription">Change Subscription</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/settings">Change Profile</MenuItem>
            <MenuItem onClick={() => { handleClose(); onLogout(); }}>Logout</MenuItem>
          </Menu>
        )}

<ul className="menu">
        <li onClick={() => navigate('/')}><p className="list-side"><HomeIcon />Home</p></li>
        <li onClick={() => navigate('/personal-feed')}><p className="list-side"><PersonIcon />Personal Feed</p></li>
        <li className="onclickNone"><span>AI Tools</span></li>
        <li onClick={() => navigate('/create-post')}><p className="list-side"><ImageIcon />Image Creation</p></li>
        <li onClick={() => navigate('/realtime-canvas')}><p className="list-side"><BrushIcon />Realtime Canvas</p></li>
        <li onClick={() => navigate('/realtime-generation')}><p className="list-side"><GenerateIcon />Realtime Generation</p></li>
        <li onClick={() => navigate('/canvas-editor')}><p className="list-side"><EditIcon />Canvas Editor</p></li>
        <li onClick={() => navigate('/universal-upscaler')}><p className="list-side"><ExpandIcon />Universal Upscaler</p></li>
      </ul>

      <ul className="menu">
        <li className="onclickNone"><span>More</span></li>
        <li onClick={() => navigate('/stats')}><p className="list-side"><BarChartIcon />Statistics</p></li>
        <li onClick={() => navigate('/texture-generation')}><p className="list-side"><TextureIcon />Texture Generation <span className="alpha">Alpha</span></p></li>
      </ul>
        <hr className="line-side"></hr>
      <ul className="menu">
        <li onClick={() => navigate('/subscription')}><p className="list-side"><MonetizationOnIcon />Premium Plans</p></li>
        <li onClick={() => navigate('/whats-new')}><p className="list-side"><NewReleasesIcon />What's New</p></li>
        <li onClick={() => navigate('/api-access')}><p className="list-side"><ApiIcon />API Access</p></li>
        <li onClick={() => navigate('/settings')}><p className="list-side"><SettingsIcon />Settings</p></li>
      </ul>
        {!user && (
          <>
            <hr className="custom-divider" />
            <div className="login-section">
              <li><Link to="/login"><LoginIcon />Login</Link></li>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
