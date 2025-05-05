import React, { useState, useEffect } from "react";
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
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slideshow images
    const slides = [
        "/images/slideshow_images/3.jpeg",
        "/images/slideshow_images/1.jpeg",
        "/images/slideshow_images/2.jpeg",
        "/images/slideshow_images/4.jpeg",
        "/images/slideshow_images/5.jpeg",
        "/images/slideshow_images/6.jpeg"
    ];

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);


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
                    Welcome to PieFest!
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
                        <Button 
                            variant="contained" 
                            color="info"
                            onClick={() => navigate('/supporters')}
                        >
                            Our Supporters
                        </Button>
                    </Stack>
                </Box>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                    Thanks for coming to PieFest 2025!
                    </Typography>
                    <Box 
                        sx={{ 
                            bgcolor: '#e1eaf8',
                            borderRadius: 2, 
                            p: 4, // Increased padding
                            mt: 2,
                            mb: 3,
                            boxShadow: 2,
                            color: '#333333',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center',
                            minHeight: '450px', // Added minimum height to ensure it's bigger
                        }}
                    >
                        {/* Image slideshow */}
                        <Box sx={{ 
                            width: '100%', 
                            height: '600px', // Increased height from 250px to 350px
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 2,
                            mb: 4, // Increased bottom margin for better spacing
                            '& img': {
                                transition: 'opacity 1s ease-in-out'
                            }
                        }}>
                            {slides.map((slide, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={slide}
                                    alt={`PieFest 2025 Memories - ${index + 1}`}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        opacity: currentSlide === index ? 1 : 0,
                                        zIndex: currentSlide === index ? 2 : 1,
                                    }}
                                    onError={(e) => {
                                        e.target.src = "/images/slideshow_images/2.jpeg";
                                    }}
                                />
                            ))}
                            
                            {/* Slideshow indicator dots */}
                            <Box sx={{ 
                                position: 'absolute', 
                                bottom: 15, 
                                left: 0,
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center',
                                zIndex: 3
                            }}>
                                {slides.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                                            borderRadius: '50%',
                                            mx: 0.5,
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
                                        }}
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                ))}
                            </Box>
                        </Box>
                        
                        {/* Thanks message below slideshow */}
                        <Typography 
                            variant="h3" // Increased from h4 to h3 for better visibility
                            sx={{ 
                                fontWeight: 'bold', 
                                color: '#2351a3',
                                mb: 2
                            }}
                        >
                            We'll see you again next year!
                        </Typography>
                        
                        {/* Post PieFest Activities Section */}
                        <Box 
                            sx={{ 
                                mt: 4,
                                pt: 3,
                                borderTop: '1px dashed #95b3e8',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ 
                                    color: '#2351a3',
                                    mb: 2
                                }}
                            >
                            </Typography>
                            
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 3,
                                width: '100%',
                                justifyContent: 'center'
                            }}>
    
                                {/* Survey Section */}
                                <Paper
                                    elevation={2}
                                    sx={{ 
                                        p: 2, 
                                        flex: 1, 
                                        minWidth: { xs: '100%', sm: '200px' }, 
                                        maxWidth: { sm: '45%' },
                                        textAlign: 'center',
                                        bgcolor: 'white',
                                        borderRadius: 2
                                    }}
                                >
                                    <Box 
                                        component="img"
                                        src="/images/survey-icon.png"
                                        alt="Survey Icon"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            mb: 1
                                        }}
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%232351a3' d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E";
                                        }}
                                    />
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Help Us Improve
                                    </Typography>
                                    
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        Your feedback matters! Help us make next year's PieFest even better.
                                    </Typography>
                                    
                                    <Button 
                                        variant="contained" 
                                        color="secondary"
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSdfp6S9pF7w5lmw3mLB2uKjEZUbF9aGAuATGoXlIkmzQa_5zQ/viewform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ 
                                            minWidth: '180px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Fill Out Survey
                                    </Button>
                                </Paper>
                            </Box>
                        </Box>

                        <Typography 
                            variant="h4" // Increased from h5 to h4 for better visibility 
                            sx={{ 
                                color: '#2351a3'
                            }}
                        >
                        </Typography>
                        
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: '#2351a3'
                            }}
                        >
                        </Typography>
                        
                        {/* Optional decorative element */}
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                bottom: -25, 
                                right: -25, 
                                fontSize: '7rem', 
                                opacity: 0.2, 
                                transform: 'rotate(-15deg)',
                                pointerEvents: 'none'
                            }}
                        >
                            🥧
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
                        Honestly the glue holding PieFest together!
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
                        PieFest's app was created by a team of passionate developers who love both code and pie!
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                            component="img"
                                            src="/images/benjamin.jpg" // Path to your image
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
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
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
                                        src="/images/nick.jpg" // Path to your image
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
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Pickle Pie 🥒.
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
                                            src="/images/gireesh.jpg" // Path to your image
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
                                    <Typography variant="h6">Gireesh Mahajan</Typography>
                                    <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">
                                Favorite Pie: Lemon Tart 🍋.
                            </Typography>
                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h5" gutterBottom>
                        Cleanup Crew
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                        PieFest would not be possible without our amazing volunteers who help clean up after the event!
                    </Typography>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                                component="img"
                                                src="/images/james.jpeg" // Path to your image
                                                alt="James Liu"
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
                                        <Typography variant="h6">James Liu</Typography>
                                        <Typography variant="body2" color="text.secondary">Absolute Tank</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2">
                                    Favorite Pie: Hotpot Pie 🔥.
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
                        © 2025 PieFest. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default Home;