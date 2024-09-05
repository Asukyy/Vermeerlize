import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import '../../styles/Profile.css';
import Header from '../../components/Header/HeaderProfile';
import Modal from '../../components/Modal';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        showExplicitContent: false,
        interests: [], // Liste des IDs d'intérêts
        profilePicture: '',
    });

    const [interests, setInterests] = useState([]); // Liste complète des intérêts {id, name}
    const [selectedFile, setSelectedFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [statusType, setStatusType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        username: data.user.name || '',
                        email: data.user.email || '',
                        showExplicitContent: data.user.showExplicitContent || false,
                        interests: data.user.interests.map(interest => interest.toString()) || [], // Assurez-vous que c'est une chaîne de caractères
                        profilePicture: data.user.profilePicture || '',
                    });
                } else {
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchInterests = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/interest', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setInterests(data.data); // Stocker l'objet complet {id, name}
                } else {
                    console.error('Failed to fetch interests:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        fetchProfile();
        fetchInterests();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setUserData(prev => ({ ...prev, [name]: checked }));
        } else {
            setUserData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('showExplicitContent', userData.showExplicitContent.toString()); // Convertir en chaîne pour le backend
        formData.append('interests', JSON.stringify(userData.interests)); // Enregistrement des IDs d'intérêts

        if (selectedFile) {
            formData.append('profilePicture', selectedFile);
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setUserData(prev => ({ ...prev, ...result.user }));
                setStatusMessage('Profile updated successfully');
                setStatusType('success');
            } else {
                console.error('Failed to update profile:', result);
                setStatusMessage(result.message || 'Failed to update profile');
                setStatusType('error');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setStatusMessage('Failed to update profile');
            setStatusType('error');
        } finally {
            setLoading(false);
            setModalVisible(true); // Afficher la modal après la soumission
        }
    };

    const handleInterestChange = (interestId) => {
        setUserData(prev => {
            const updatedInterests = prev.interests.includes(interestId)
                ? prev.interests.filter(i => i !== interestId)
                : [...prev.interests, interestId];
            return { ...prev, interests: updatedInterests };
        });
    };

    return (
        <div className="container-profile">
            <Header />
            <div className="content-profile">
                <form onSubmit={handleSubmit}>
                    <div className="form-group54">
                        <label>Your email</label>
                        <input type="email" name="email" value={userData.email || ''} readOnly />
                    </div>

                    <div className="form-group54">
                        <label>Your username</label>
                        <input type="text" name="username" value={userData.username || ''} onChange={handleChange} />
                    </div>

                    <div className="form-group54">
                        <label>Profile Picture</label>
                        <div className="upload-container">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="upload-placeholder">
                                {selectedFile || userData.profilePicture ? (
                                    <img
                                        src={
                                            selectedFile
                                                ? URL.createObjectURL(selectedFile)
                                                : userData.profilePicture
                                        }
                                        alt="Profile"
                                        className="profile-img"
                                    />
                                ) : (
                                    <div className="upload-placeholder-text">
                                        <span>+</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="form-group54 interests">
                        <label>What are your interests?</label>
                        <div className="interests-options">
                            {interests.map((interest) => {
                                const isActive = userData.interests.includes(interest._id.toString()); // Assurez-vous que c'est une chaîne de caractères
                                return (
                                    <button
                                        type="button"
                                        key={interest._id}
                                        className={isActive ? 'active' : ''}
                                        onClick={() => handleInterestChange(interest._id.toString())}
                                    >
                                        {interest.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group54">
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="showExplicitContent"
                                checked={userData.showExplicitContent || false}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                        <span>I confirm that I am over 18 and want to show explicit content by default</span>
                    </div>

                    <button type="submit" className="save-button" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </button>

                    <Modal
                        message={statusMessage}
                        type={statusType}
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Profile;
