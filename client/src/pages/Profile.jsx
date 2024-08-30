import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',  // Le mot de passe sera vide par défaut
        avatar: ''
    });
    const [profileData, setProfileData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        name: data.user.name,
                        email: data.user.email,
                        password: '',  // Le mot de passe n'est pas récupéré
                        avatar: data.user.avatar
                    });
                    setProfileData(data.user);
                } else {
                    console.error('Failed to fetch profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        if (name === 'password') {
            if (!validatePassword(value)) {
                setErrors({ ...errors, password: 'Password must be at least 6 characters long, with one uppercase letter, one number, and one special character.' });
            } else {
                setErrors({ ...errors, password: '' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (result.success) {
                alert('Profile updated successfully');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 5,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: deepPurple[500],
                        width: 72,
                        height: 72,
                        mb: 3,
                    }}
                    src={userData.avatar}
                >
                    {userData.name[0]}
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Update Profile
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                        helperText={errors.password}
                        error={!!errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Avatar URL"
                        name="avatar"
                        value={userData.avatar}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Changes
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Profile;
