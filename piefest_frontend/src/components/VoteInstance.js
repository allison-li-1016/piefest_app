import { useState, useEffect } from 'react';
import PieCard from './PieCard';
import { getPieUids, updatePieRating } from './Helpers/Helpers';

// MUI imports
import {
	Box,
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
			updatePieRating(pieId, 'user-uid', value);
		}
	};

	// Render the pie cards
	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<PageHeader>
				<Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
					Vote for Pies
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					Rate your favorite pies on a scale from 1 to 10
				</Typography>
				<Divider sx={{ mt: 2 }} />
			</PageHeader>

			{loading ? (
				<LoadingContainer>
					<CircularProgress />
				</LoadingContainer>
			) : (
				<Grid container spacing={3}>
					{pies.map(pie => (
						<Grid item xs={12} sm={6} md={4} key={pie}>
							<PieCardWrapper elevation={2}>
								<Box sx={{ position: "relative" }}>
									<PieCard uid={pie} />
								</Box>

								<RatingContainer>
									<Typography variant="body1" sx={{ fontWeight: "medium" }}>
										Your Rating (1-10)
									</Typography>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										<TextField
											id={`rating-${pie}`}
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
											sx={{ width: '80px' }}
										/>
									</Box>
								</RatingContainer>
							</PieCardWrapper>
						</Grid>
					))}
				</Grid>
			)}

			{!loading && pies.length === 0 && (
				<Paper sx={{ p: 4, textAlign: "center" }}>
					<Typography variant="h6" gutterBottom>
						No pies found
					</Typography>
					<Typography variant="body2" color="text.secondary">
						There are currently no pies available for voting.
					</Typography>
				</Paper>
			)}
		</Container>
	);
}

export default VoteInstance;