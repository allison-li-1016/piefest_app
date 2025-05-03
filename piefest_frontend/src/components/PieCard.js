import React, { useState, useEffect } from 'react';
import { getPie } from './Helpers/Helpers';
import { 
    Box, 
    CardMedia, 
    CardContent, 
    Typography, 
    Skeleton, 
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GARMFIELD_IMG = "/images/pie-placeholder.jpg";  // Note the leading slash

// Styled components to match Rankings.js styling
const CardContentStyled = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const PieImage = styled(CardMedia)(({ theme }) => ({
    height: 160,
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const PieCard = ({ name, description, image }) => {
    const [pie, setPie] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Process image if it's a base64 string without data URL prefix
        const imageUrl = image 
            ? image
            : GARMFIELD_IMG;
            
        setPie({
            name: name || 'Unknown Pie',
            description: description || 'No description available',
            image: imageUrl
        });
        
        setLoading(false);
    }, [name, description, image]);

    if (loading) return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Skeleton variant="rectangular" height={160} animation="wave" />
            <CardContentStyled>
                <Skeleton variant="text" height={30} width="70%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="60%" />
            </CardContentStyled>
        </Box>
    );
    
    if (error) return (
        <Box sx={{ height: '100%', bgcolor: '#ffebee', p: 2 }}>
            <Typography color="error" variant="body1" sx={{ fontWeight: 'medium' }}>
                {error}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {pie.image ? (
                <PieImage
                    component="img"
                    image={pie.image}
                    alt={pie.name}
                />
            ) : (
                <PieImage
                    component="img"
                    image={GARMFIELD_IMG}
                    alt={pie.name}
                />
            )}
            <CardContentStyled>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div" 
                    sx={{ fontWeight: 'bold', mb: 1 }}
                >
                    {pie.name}
                </Typography>
            </CardContentStyled>
        </Box>
    );
};

export default PieCard;