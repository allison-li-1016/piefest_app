import React, { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Fade
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/backend/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: registerEmail })
            });

            if (!response.ok) throw new Error('Registration failed');
            
            setSuccess('Email Sent to ' + registerEmail + '! Check for your password and login here :)');
            setRegisterEmail('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // TODO: Implement function to send email and password and update UI
            const response = false;
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ 
            //         email: loginEmail, 
            //         password: loginPassword 
            //     })
            // });

            if (!response.ok) throw new Error('API call failed');

            const data = await response.json();
            
            if (!data.validationSuccess) throw new Error('Account and password do not match');
            
            // Set cookie with 7 day expiry
            Cookies.set('emailUsername', loginEmail, { expires: 7 });
            Cookies.set('definitelyAnEncryptedPassword', loginPassword, { expires: 7 });
            
            // Force reload the page
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {/* Register Card */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                Create Account
                            </Typography>
                            <form onSubmit={handleRegister}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Register
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Login Card */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" gutterBottom>
                                Login
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Error/Success Messages */}
            {error && (
                <Fade in={!!error}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                </Fade>
            )}
            {success && (
                <Fade in={!!success}>
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {success}
                    </Alert>
                </Fade>
            )}
        </Container>
    );
}

export default Login;