import React, { useEffect, useState } from 'react';
import VoteInstance from '../components/VoteInstance';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Cookies from 'js-cookie';
import { Box, Typography, Alert } from '@mui/material';

function Vote() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const username = Cookies.get('emailUsername');
        const password = Cookies.get('definitelyAnEncryptedPassword');
        // setIsAuthenticated(Boolean(username) && Boolean(password));
        setIsAuthenticated(true);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <div>
            <NavBar />
            {isAuthenticated ? (
                <VoteInstance />
            ) : (
                <Box sx={{ mt: 4 }}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Please log in to vote for pies
                    </Alert>
                    <Login />
                </Box>
            )}
        </div>
    );
}

export default Vote;