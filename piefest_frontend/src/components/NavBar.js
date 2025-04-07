import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Container
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookieUsername, setCookieUsername] = useState('');
    
    useEffect(() => {
        const username = Cookies.get('emailUsername');
        const password = Cookies.get('definitelyAnEncryptedPassword');
        const areWeAuthRn = Boolean(username) && Boolean(password);
        setIsAuthenticated(areWeAuthRn);
        if (areWeAuthRn) {
            setCookieUsername(username);
        }
    }, []);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/vote', label: 'Vote Now' },
        { path: '/rankings', label: 'View Rankings' },
        { path: '/create-pie', label: 'Submit a Pie' }
    ];

    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                width: '100%',
                left: 0
            }}
        >
            <Container maxWidth="xl">
                <Toolbar 
                    disableGutters
                    sx={{
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        py: 1
                    }}
                >
                    <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: isAuthenticated ? 1 : 0
                    }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ 
                                flexGrow: isMobile ? 0 : 1, 
                                mr: isMobile ? 2 : 0,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            PieFest
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 2,
                            flexWrap: isMobile ? 'wrap' : 'nowrap',
                            justifyContent: isMobile ? 'center' : 'flex-end',
                            width: isMobile ? '100%' : 'auto'
                        }}>
                            {navItems.map((item) => (
                                <Button
                                key={item.path}
                                color="inherit"
                                onClick={() => navigate(item.path)}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                    borderBottom: location.pathname === item.path ? 
                                        '2px solid white' : '2px solid transparent',
                                    borderRadius: 0,
                                    px: 2,
                                    '&:hover': {
                                        borderBottom: '2px solid white',
                                    }
                                }}
                                >
                                {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {isAuthenticated && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                whiteSpace: 'nowrap',
                                textAlign: 'right'
                            }}
                        >
                            Logged in as: {cookieUsername}
                        </Typography>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;