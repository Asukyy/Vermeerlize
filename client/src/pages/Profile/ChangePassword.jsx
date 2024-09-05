import React, { useState } from 'react';
import '../../styles/Profile.css';
import Header from '../../components/Header/HeaderProfile';
import { CircularProgress } from '@mui/material';
import Modal from '../../components/Modal';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState(''); // 'success' ou 'error'
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setStatusMessage('Passwords do not match');
            setStatusType('error');
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ newPassword }),
            });

            if (response.ok) {
                setStatusMessage('Password changed successfully');
                setStatusType('success');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const result = await response.json();
                setStatusMessage(result.message || 'Failed to change password');
                setStatusType('error');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setStatusMessage('Failed to change password');
            setStatusType('error');
        } finally {
            setLoading(false);
            setModalVisible(true);
        }
    };

    return (
        <div className="container-profile">
            <Header />
            <div className="content-profile">
                <form onSubmit={handlePasswordChange}>
                    <div className="form-group54">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group54">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="save-button" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Change Password'}
                    </button>
                </form>

                <Modal
                    message={statusMessage}
                    type={statusType}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                />
            </div>
        </div>
    );
};

export default ChangePassword;
