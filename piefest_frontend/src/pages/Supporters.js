import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button, 
    Modal
} from '@mui/material';
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom';
function Supporters() {
    // List of supporters - you can modify this as needed
    const supporters = [
        { name: "Ning Wan", tier: "Merch Sponsors" },
        { name: "M Lin", tier: "Merch Sponsors" },
        { name: "Han Feng", tier: "Merch Sponsors" },
        { name: "Vivian Li", tier: "Merch Sponsors" },
        { name: "Gireesh Mahajan", tier: "Merch Sponsors" },
        { name: "Daniel Lahn", tier: "Merch Sponsors" },
        { name: "Catherine Do", tier: "Merch Sponsors" },
        { name: "Taleb Ahsan", tier: "Merch Sponsors" },
        { name: "Ryan Chrome", tier: "Merch Sponsors" },
        { name: "Kate Burke", tier: "Merch Sponsors" },
        { name: "Emily Hao", tier: "Merch Designer" },
        { name: "Dylan Geva", tier: "Merch Designer" },
        { name: "Aiden Lowery", tier: "Merch Sponsors" },
        { name: "Braeden Hunt", tier: "Merch Sponsors" },
        { name: "Emma Sadjo", tier: "Merch Sponsors" },
        { name: "Benjamin Brusniak", tier: "Merch Sponsors" },
        { name: "Jude Mortensen", tier: "Merch Sponsors" },
        { name: "Gill Gill", tier: "Merch Sponsors" },
        { name: "Han Feng", tier: "Monetary Donors" },
        { name: "Kai Bailey", tier: "Monetary Donors" },
        { name: "Nicco Garafalo", tier: "Public Enemy #1" }
    ];

    const navigate = useNavigate();
    const [showAnimation, setShowAnimation] = useState(false);
    const [donationModalOpen, setDonationModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

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

    // Group supporters by tier
    const supportersByTier = supporters.reduce((acc, supporter) => {
        if (!acc[supporter.tier]) {
            acc[supporter.tier] = [];
        }
        acc[supporter.tier].push(supporter);
        return acc;
    }, {});

    return (
        <div>
        <NavBar />
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Our Supporters
                </Typography>

                <Typography variant="h4" paragraph align="center">
                    PieFest wouldn't be possible without the generous support of these amazing people.
                </Typography>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h5" gutterBottom>
                        Support PieFest
                    </Typography>

                    <Typography variant="body1">
                        Want to see your name on this list? Consider donating to support PieFest!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        PieFest is a community-driven event. Your donations help us create a better experience for everyone!
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2 }}>
      
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',  // Center horizontally
                        width: '100%' 
                    }}>
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
                    </Box>
                            
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
                <Divider sx={{ my: 3 }} />          
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Thank You to Our Supporters!
                    </Typography>
                    
                    {Object.entries(supportersByTier).map(([tier, tierSupporters]) => (
                        <Box key={tier} sx={{ mb: 4 }}>
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                gutterBottom 
                                sx={{ 
                                    color: 'primary.main',
                                    borderBottom: 1,
                                    pb: 1,
                                    borderColor: 'divider'
                                }}
                            >
                                {tier}
                            </Typography>
                            
                            <List>
                                {tierSupporters.map((supporter, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemText 
                                                primary={supporter.name} 
                                            />
                                        </ListItem>
                                        {index < tierSupporters.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    ))}
                </Paper>
            </Box>

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

        </Container>
        </div>
    );
}

export default Supporters;