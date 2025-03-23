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

const PieCard = ({ uid }) => {
    const [pie, setPie] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPieData = async () => {
            try {
                setLoading(true);
                const response = await getPie(uid);
                setPie(response.data || response);
                setError(null);
            } catch (err) {
                console.error('Error fetching pie data:', err);
                setError('Failed to load pie information');
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchPieData();
        }
    }, [uid]);

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
                <Box 
                    sx={{ 
                        height: 160, 
                        bgcolor: 'grey.200', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No image available
                    </Typography>
                </Box>
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
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    {pie.description}
                </Typography>
            </CardContentStyled>
        </Box>
    );
};

export default PieCard;