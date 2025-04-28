import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            let formData = new FormData();
            console.log('Submitting pie:', pieName);
            let bakePieRes = await fetch(`/backend/bake-pie/${pieName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: Cookies.get('userId')})
            });
            if (bakePieRes.status != 200) {
                setError(`Failed to submit pie with error code ${bakePieRes.status}. Please try again.`);
                return;
            }
            console.log('Pie submitted subcessfully');
            let bakePieResJson = await bakePieRes.json();
            console.log(bakePieResJson);
            if (selectedImage) {
                // Use Promise to handle the async FileReader operation
                // const base64Data = await new Promise((resolve, reject) => {
                //     const reader = new FileReader();
                //     reader.onload = () => resolve(reader.result.split(',')[1]);
                //     reader.onerror = reject;
                //     reader.readAsDataURL(selectedImage);
                // });
                console.log("Selected image:", selectedImage);
                console.log("Adding Image");
                var url = `/backend/add-image/${bakePieResJson.pieId}/filename/${selectedImage.name}`;
                console.log(url);
                let res = await fetch(url, { method: 'POST' } );
                console.log(res);
                if (!res.ok) {
                    setError(`Failed to submit pie image with error code ${res.status}. Please try again.`);
                    return
                }

                console.log("Bacend call successfull")
                let resJson = await res.json();
                console.log(resJson);
                let sasUrl = resJson.imageUrl
                console.log("SAS URL:", sasUrl);

                // Step 3: Upload the image directly to the SAS URL
                const uploadResponse = await fetch(sasUrl, {
                    method: 'PUT',
                    headers: {
                        'x-ms-blob-type': 'BlockBlob',
                        'Content-Type': selectedImage.type,
                    },
                    body: selectedImage,  // Send the raw file
                });
                
                if (!uploadResponse.ok) {
                    setError(`Failed to upload image with status ${uploadResponse.status}. Please try again.`);
                    return;
                }
                
                // formData.append('image', base64Data);
                
                // Get SAS URL

                // Upload to SAS URL
            }
            setSuccess(true);


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

                {/* Image Upload */}
                <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Upload an image of your pie (camera only!):
                    </Typography>
                    <input
                        accept="image/jpg, image/jpeg"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setSelectedImage(file);
                                
                                // Create a preview
                                const reader = new FileReader();
                                reader.onload = (e) => setImagePreview(e.target.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="outlined"
                            component="span"
                            sx={{ mr: 2 }}
                        >
                            Select Image
                        </Button>
                    </label>
                    {selectedImage && (
                        <Typography variant="body2" component="span">
                            {selectedImage.name}
                        </Typography>
                    )}
                    
                    {/* Image Preview */}
                    {imagePreview && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <img 
                                src={imagePreview} 
                                alt="Pie preview" 
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    )}
                </Box>

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