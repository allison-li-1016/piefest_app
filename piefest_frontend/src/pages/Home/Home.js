import React, { useState } from "react";
import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    Paper,
    Stack ,
    Avatar,
    Grid,
    Divider,
    Modal
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [showAnimation, setShowAnimation] = useState(false);
    const [donationModalOpen, setDonationModalOpen] = useState(false);

    // Functions to handle modal and animation
    const handleOpenModal = () => {
        // Show the animation when opening modal
        setShowAnimation(true);
        setDonationModalOpen(true);
        
        // Reset animation after it plays
        setTimeout(() => {
            setShowAnimation(false);
        }, 3600); // Match this to your animation duration
    };
    
    const handleCloseModal = () => setDonationModalOpen(false);

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Welcome to Piefest!
                </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate('/vote')}
                        >
                            Vote Now
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={() => navigate('/rankings')}
                        >
                            View Rankings
                        </Button>
                        <Button 
                            variant="contained" 
                            color="success"
                            onClick={() => navigate('/create-pie')}
                        >
                            Submit a Pie
                        </Button>
                    </Stack>
                </Box>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        About Piefest
                    </Typography>
                    <Box 
                        sx={{ 
                            bgcolor: '#e1eaf8', // Changed from pink (#f8e1e8) to light blue
                            borderRadius: 2, 
                            p: 3, 
                            mt: 2,
                            mb: 3,
                            boxShadow: 2,
                            color: '#333333',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Optional decorative elements */}
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                top: -20, 
                                right: -20, 
                                fontSize: '7rem', 
                                opacity: 0.2, 
                                transform: 'rotate(15deg)',
                                pointerEvents: 'none'
                            }}
                        >
                            🥧
                        </Box>

                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2351a3' }}>  {/* Changed from pink (#d23369) to blue */}
                            Save the Date!
                        </Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="overline" component="p" sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#2351a3', display: 'flex', alignItems: 'center' }}> {/* Changed to blue */}
                                        <Box component="span" sx={{ mr: 1 }}>📅</Box>
                                        WHEN
                                    </Typography>
                                    <Typography variant="h5" component="p" sx={{ fontWeight: 'medium', color: '#2351a3' }}> {/* Changed to blue */}
                                        Saturday, May 3rd, 2025
                                    </Typography>
                                    <Typography variant="h6" component="p" sx={{ color: '#2351a3' }}> {/* Changed to blue */}
                                        3:00 PM
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Typography variant="overline" component="p" sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#2351a3', display: 'flex', alignItems: 'center' }}> {/* Changed to blue */}
                                        <Box component="span" sx={{ mr: 1 }}>📍</Box>
                                        WHERE
                                    </Typography>
                                    <Typography variant="h5" component="p" sx={{ fontWeight: 'medium', color: '#2351a3' }}> {/* Changed to blue */}
                                        Rooster Apartments 
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ fontWeight: 'medium', color: '#2351a3' }}> {/* Changed to blue */}
                                        839 NE 66th Street
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5, color: '#2351a3' }}> {/* Changed to blue */}
                                        <Box component="span" sx={{ mr: 0.5, fontWeight: 'bold', color: '#2351a3' }}> {/* Changed to blue */}
                                            PARKING:
                                        </Box>
                                        Greenlake Park & Ride
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            <Button 
                                variant="contained" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1,
                                    boxShadow: 3,
                                    bgcolor: '#ffffff',
                                    color: '#333333',
                                    '&:hover': {
                                        bgcolor: '#f0f0f0',
                                        boxShadow: 6
                                    }
                                }}
                                onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=PieFest%202025&dates=20250503T220000Z/20250503T240000Z&details=Join%20us%20for%20PieFest%202025!&location=839%20NE%2066th%20Street,%20Seattle,%20WA', '_blank')}
                            >
                                Add to Calendar
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                <Divider sx={{ my: 3 }} />

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Meet the PieFest Team!
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h5" gutterBottom>
                        Event Organizers
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Honestly the glue holding piefest together!
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/tansy.jpeg" // Path to your image
                                            alt="Tansy Huang"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                            }}
                                        />
                                <Box>
                                    <Typography variant="h6">Tansy Huang</Typography>
                                    <Typography variant="body2" color="text.secondary">Designer, Event Scheduling</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Sweet Potato Pie 🍠.
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/arielle.jpeg" // Path to your image
                                            alt="Arielle Perreault"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                            }}
                                        />
                                <Box>
                                    <Typography variant="h6">Arielle Perreault</Typography>
                                    <Typography variant="body2" color="text.secondary">Event Planning</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Peanut Butter Pie 🥜.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h5" gutterBottom>
                        Developers
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                        Piefest's app was created by a team of passionate developers who love both code and pie!
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/benjamin.jpeg" // Path to your image
                                            alt="Benjamin Brusniak"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                            }}
                                        />
                                <Box>
                                    <Typography variant="h6">Benjamin Brusniak</Typography>
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Pepto Bismol Pie 🤮.
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    component="img"
                                    src="/images/allison.jpeg" // Path to your image
                                    alt="Allison Li"
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mr: 2,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid',
                                        borderColor: 'secondary.main',
                                    }}
                                />
                                <Box>
                                    <Typography variant="h6">Allison Li</Typography>
                                    <Typography variant="body2" color="text.secondary">Backend Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite pie: Strawberry Pie 🍓. 
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                        component="img"
                                        src="/images/default.jpg" // Path to your image
                                        alt="Nicholas Lumiere"
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            mr: 2,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid',
                                            borderColor: 'secondary.main',
                                        }}
                                    />
                                <Box>
                                    <Typography variant="h6">Nicholas Lumiere</Typography>
                                    <Typography variant="body2" color="text.secondary">Front End Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: TBD.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/nicco.jpeg" // Path to your image
                                            alt="Nicco Garofalo"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                            }}
                                        />
                                <Box>
                                    <Typography variant="h6">Nicco Garofalo</Typography>
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Arielle’s 2023 Key Lime Pie which won 2nd 🥈 place at the inaugural Piefest.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/default.jpeg" // Path to your image
                                            alt="Gireesh Mahajan"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid',
                                                borderColor: 'secondary.main',
                                            }}
                                        />
                                <Box>
                                    <Typography variant="h6">Nicco Garofalo</Typography>
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Arielle’s 2023 Key Lime Pie which won 2nd 🥈 place at the inaugural Piefest.
                            </Typography>
                        </Grid>

                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h5" gutterBottom>
                        Support PieFest
                    </Typography>

                    <Typography variant="body1" paragraph>
                        PieFest is a community-driven event. Your donations help us create a better experience for everyone!
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2 }}>
                        <Box sx={{ position: 'relative' }}> {/* Add this wrapper */}
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    px: 4,
                                    fontWeight: 'bold',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                        bgcolor: 'primary.dark',
                                    }
                                }}
                                onClick={handleOpenModal}
                            >
                                Show Donation QR Code
                            </Button>
                            
                            {/* Add the animation elements here */}
                            {showAnimation && (
                                <>
                                    {[...Array(6)].map((_, i) => {
                                        const angle = Math.random() * 360;
                                        return (
                                            <Box
                                                key={i}
                                                component="span"
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    fontSize: '1.5rem',
                                                    animation: `pieConfetti${i} 1.5s ease-out forwards`,
                                                    opacity: 0,
                                                    pointerEvents: 'none',
                                                    zIndex: 100,
                                                    [`@keyframes pieConfetti${i}`]: {
                                                        '0%': {
                                                            transform: 'translate(-50%, -50%) rotate(0deg)',
                                                            opacity: 1
                                                        },
                                                        '100%': {
                                                            transform: `translate(${Math.cos(angle * Math.PI/180) * 100}px, ${Math.sin(angle * Math.PI/180) * 100}px) rotate(${Math.random() * 720 - 360}deg)`,
                                                            opacity: 0
                                                        }
                                                    }
                                                }}
                                            >
                                                💸
                                            </Box>
                                        );
                                    })}
                                </>
                            )}
                        </Box>
                    </Box>
                </Paper>

                <Modal
                    open={donationModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="donation-modal-title"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 'auto' },
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxWidth: 400,
                        textAlign: 'center'
                    }}>
                        <Typography id="donation-modal-title" variant="h6" component="h2" gutterBottom>
                            Donate to PieFest
                        </Typography>
                        
                        {/* QR Code Image */}
                        <Box
                            component="img"
                            src="/images/donation-qr.jpeg"
                            alt="Donation QR Code"
                            sx={{
                                width: '100%',
                                maxWidth: 300,
                                height: 'auto',
                                mb: 2,
                                border: '1px solid #eee',
                                p: 2
                            }}
                            onError={(e) => {
                                // Fallback if image doesn't exist
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                // Create a placeholder instead
                                const placeholder = document.createElement('div');
                                placeholder.style.width = '100%';
                                placeholder.style.height = '200px';
                                placeholder.style.backgroundColor = '#f5f5f5';
                                placeholder.style.display = 'flex';
                                placeholder.style.alignItems = 'center';
                                placeholder.style.justifyContent = 'center';
                                placeholder.innerHTML = '<p style="color: #999;">QR Code Image<br>(Coming Soon)</p>';
                                e.target.parentNode.appendChild(placeholder);
                            }}
                        />
                        
                        <Typography variant="body1" paragraph>
                            Scan this QR code with your phone's camera to donate
                        </Typography>
                        
                        <Button 
                            variant="contained"
                            onClick={handleCloseModal}
                            sx={{ mt: 1 }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>


                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2025 Piefest. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;