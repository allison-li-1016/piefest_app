import React from "react";
import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    List, 
    ListItem, 
    Paper,
    Stack 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Welcome to Piefest!
                </Typography>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        About Piefest
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Piefest is an annual event celebrating all things pie. Join us for a day of delicious pies, fun activities, and great company!
                    </Typography>
                    
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
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Event Schedule
                    </Typography>
                    <List>
                        <ListItem>10:00 AM - Opening Ceremony</ListItem>
                        <ListItem>11:00 AM - Pie Tasting</ListItem>
                        <ListItem>1:00 PM - Pie Eating Contest</ListItem>
                        <ListItem>3:00 PM - Award Ceremony</ListItem>
                        <ListItem>11:00 PM - After Party @ Ben's Mom's House</ListItem>
                    </List>
                </Paper>

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