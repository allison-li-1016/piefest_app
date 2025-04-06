import React, { useState } from 'react';
import NavBar from '../components/NavBar';

import { 
    Container, 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper,
    Alert,
    Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: '0 auto',
    marginTop: theme.spacing(4)
}));

function SubmitPie() {
    const [pieName, setPieName] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            let res = await fetch(`/backend/bake-pie/${pieName}`, {method: 'POST'});
            if (res.status != 200) {
                setError(`Failed to submit pie with error code ${res.status}. Please try again.`);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError(`Failed to submit pie. Please try again. Error: ${err.message}`);
        }
    };

    return (
        <div>
        <Container maxWidth="md">
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Submit Your Pie
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Pie Name"
                        value={pieName}
                        onChange={(e) => setPieName(e.target.value)}
                        required
                        margin="normal"
                        variant="outlined"
                    />

                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ 
                            mt: 3,
                            fontWeight: 'bold',
                            boxShadow: 3,
                            '&:hover': {
                                boxShadow: 6,
                            }
                        }}
                    >
                        Submit Pie
                    </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {success && (
                        <Fade in={success}>
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Pie submitted successfully!
                            </Alert>
                        </Fade>
                    )}
                    {error && (
                        <Fade in={!!error}>
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}
                </Box>
            </StyledPaper>
        </Container>
        </div>
    );
}

export default SubmitPie;