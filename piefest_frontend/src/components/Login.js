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
import CryptoJS from 'crypto-js';


const hashUserId = (userId) => {
  const userIdStr = String(userId);
  const encrypted = CryptoJS.AES.encrypt(userIdStr, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
};

const unhashUserId = (hashedId) => {
  try {
    const decoded = decodeURIComponent(hashedId);
    const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Failed to unhash userId:", error);
    return null;
  }
};

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
            
            setSuccess('Email Sent to ' + registerEmail + '! Check for your password and login there :)');
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
            console.log('Login attempt with:', loginEmail, loginPassword);
            const response = await fetch('/backend/verify-user', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: loginEmail, 
                    password: loginPassword 
                })
            });

            if (response.status / 100 !== 2) {
                setError(response.statusText);
                return;
            }

            const data = await response.json();
            const hashedUserId = hashUserId(data.userId);
            
            if (!data.verificationResult) {
                throw new error(data.message);
            } else {
                // set cookie with 7 day expiry
                Cookies.set('emailUsername', data.username, { expires: 7 });
                Cookies.set('definitelyAnEncryptedPassword', data.password, { expires: 7 });
                Cookies.set('userId', hashedUserId, { expires: 7 });
            }
            
            // force reload the page
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

export { hashUserId, unhashUserId };
export default Login;