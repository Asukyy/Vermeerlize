import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
            <h2 className="titre-spe">Settings</h2>
            <div className="tabs24">
                <Link to="/settings" className="tab36">Profile</Link>
                <Link to="/settings/change-password" className="tab36">Change Password</Link>
                <Link to="/settings/account-management" className="tab36">Account Management</Link>
            </div>
    </div>
  )
}

export default Header
