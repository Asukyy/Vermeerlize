import React, { useState } from 'react';
import '../../styles/Profile.css';
import Header from '../../components/Header/HeaderProfile';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountManagement = () => {
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setStatusMessage('Account deleted successfully');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/signup');
                }, 2000);
            } else {
                const result = await response.json();
                setStatusMessage(result.message || 'Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setStatusMessage('Failed to delete account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-profile">
            <Header />
            <div className="content-profile-account">
                <p>
                    Deleting your account will remove all your data permanently. This action is irreversible.
                    If you're sure you want to proceed, click the button below.
                </p>
                <button
                    className="delete-button"
                    onClick={handleDeleteAccount}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Delete Account'}
                </button>

                {statusMessage && (
                    <div className={`status-message ${statusMessage.includes('successfully') ? 'success' : 'error'}`}>
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountManagement;
