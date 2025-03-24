import { useState, useEffect } from 'react';
import PieCard from './PieCard';
import { getPieUids, updatePieRatings } from './Helpers/Helpers';
import { useNavigate } from 'react-router-dom';

// MUI imports
import {
	Box,
	Button,
	Typography,
	Container,
	Grid,
	Paper,
	CircularProgress,
	Divider,
	TextField,
	Rating
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const RatingContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: theme.spacing(2),
	borderTop: `1px solid ${theme.palette.divider}`,
}))

const PieCardWrapper = styled(Paper)(({ theme }) => ({
	overflow: "hidden",
	transition: "all 0.3s ease",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	"&:hover": {
		boxShadow: theme.shadows[6],
		transform: "translateY(-4px)",
	},
}))

const PageHeader = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(4),
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(8),
}))

function VoteInstance() {
	const [pies, setPies] = useState([]);
	const [ratings, setRatings] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const handleHomeClick = () => {
		navigate('/');
	}


	// Fetch pies on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const uids = await getPieUids();
				setPies(uids);
				
				// Initialize ratings object
				const initialRatings = {};
				uids.forEach(uid => {
					initialRatings[uid] = '';
				});
				setRatings(initialRatings);
				
				setLoading(false);
			} catch (error) {
				console.error("Error fetching pies:", error);
				setLoading(false);
			}
		};
		
		fetchData();
	}, []);

	// Handle rating change
	const handleRatingChange = (pieId, value) => {
		// Only allow valid numbers between 1-10 with half steps
		if (value === '' || (parseFloat(value) >= 1 && 
			parseFloat(value) <= 10 && 
			(parseFloat(value) * 2) % 1 === 0)) {
			setRatings(prev => ({
				...prev,
				[pieId]: value
			}));
		}
	};

	// Handle submit function
	const handleSubmit = async () => {
		try {
			await updatePieRatings(pies, ratings);
			alert('Ratings submitted successfully!');
		} catch (error) {
			console.error("Error submitting ratings:", error);
			alert('Failed to submit ratings.');
		}
	};

	// Render the pie cards
	const [showAnimation, setShowAnimation] = useState(false);

	// Handle submit function
	const handleSubmitWithAnimation = async () => {
		setShowAnimation(true);
		try {
			await updatePieRatings(pies, ratings);
			setTimeout(() => {
				alert('Ratings submitted successfully!');
				setShowAnimation(false);
			}, 2000);
		} catch (error) {
			console.error("Error submitting ratings:", error);
			alert('Failed to submit ratings.');
			setShowAnimation(false);
		}
	};

	return (
		<div>
		<Container maxWidth="lg" sx={{ py: 2 }}>
			{/* Sticky header */}
			<Box sx={{ 
				position: 'sticky', 
				top: 0, 
				zIndex: 10, 
				backgroundColor: 'background.paper',
				pb: 1,
				pt: 1,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginRight: 2
			}}>
				<Box>
					<Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
						Vote for Pies
					</Typography>
				</Box>

				<Box>
				<Button 
						variant="contained" 
						color="success"
						onClick={handleHomeClick}
						sx={{ 
							py: 1, 
							px: 2,
							fontWeight: 'bold',
							boxShadow: 3,
							'&:hover': {
								boxShadow: 6,
							}
						}}
					>
						Home
					</Button>
				</Box>
				
				<Box sx={{ position: 'relative' }}>
					<Button 
						variant="contained" 
						color="success"
						onClick={handleSubmitWithAnimation}
						sx={{ 
							py: 1, 
							px: 2,
							fontWeight: 'bold',
							boxShadow: 3,
							'&:hover': {
								boxShadow: 6,
							}
						}}
					>
						SUBMIT RATINGS
					</Button>
					{showAnimation && (
						<>
							{
							[...Array(6)].map((_, i) => {
								// Generate angle between 180 (left) and 270 (down) degrees
								const angle = 90 + Math.random() * 90;
								return (
									<Box
										key={i}
										component="span"
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											fontSize: '3rem',
											animation: `pieConfetti${i} 1.5s ease-out forwards`,
											opacity: 0,
											pointerEvents: 'none',
											zIndex: 100,
											[`@keyframes pieConfetti${i}`]: {
												'0%': {
													transform: 'translate(-50%, -50%) rotate(0deg) scale(1.5)',
													opacity: 1
												},
												'100%': {
													transform: `translate(${Math.cos(angle * Math.PI/180) * 300}px, ${Math.sin(angle * Math.PI/180) * 300}px) rotate(${Math.random() * 720 - 360}deg) scale(0.2)`,
													opacity: 0
												}
											}
										}}
									>
										🥧
									</Box>
								);
							})}
						</>
					)}
				</Box>
			</Box>
			
			<Divider sx={{ mt: 1, mb: 2 }} />

			{loading ? (
				<LoadingContainer>
					<CircularProgress />
				</LoadingContainer>
			) : (
				<Grid container spacing={2}>
					{pies.map(pie => (
						<Grid item xs={12} sm={6} md={4} key={pie}>
							<PieCardWrapper elevation={2}>
								<Box sx={{ position: "relative" }}>
									<PieCard uid={pie} />
								</Box>

								<RatingContainer sx={{ py: 1 }}>
									<Typography variant="body2" sx={{ fontWeight: "medium" }}>
										Rating (1-10)
									</Typography>
									<TextField
										type="number"
										inputProps={{
											min: 1,
											max: 10,
											step: 0.5
										}}
										value={ratings[pie]}
										onChange={(e) => handleRatingChange(pie, e.target.value)}
										placeholder="1-10"
										size="small"
										sx={{ width: '100px' }}
									/>
								</RatingContainer>
							</PieCardWrapper>
						</Grid>
					))}
				</Grid>
			)}

			{!loading && pies.length === 0 && (
				<Paper sx={{ p: 3, textAlign: "center" }}>
					<Typography variant="h6" gutterBottom>
						No pies found
					</Typography>
					<Typography variant="body2" color="text.secondary">
						There are currently no pies available for voting.
					</Typography>
				</Paper>
			)}
		</Container>
		</div>
	);
}

export default VoteInstance;