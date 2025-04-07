import { useState, useEffect } from "react"
import PieCard from "../components/PieCard"
import { getRankings, getAllPies, getTopPies} from "../components/Helpers/Helpers"
import NavBar from "../components/NavBar"

// MUI imports
import {
	Box,
	Typography,
	Container,
	Grid,
	Paper,
	CircularProgress,
	Rating,
	Chip,
	Alert,
	AlertTitle,
	Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"

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

function Rankings() {
	const [pies, setPies] = useState([])
	const [ratings, setRatings] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	// Fetch pies on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const allPies = await getAllPies();
				const topResults = await getTopPies()

				const filteredPies = allPies.filter(pie => 
					topResults.some(topPie => topPie.PieId === pie.id)
				);
				
				setPies(filteredPies);

				// Initialize ratings object
				getRankings().then((r) => {
					setRatings(r)
					setLoading(false)
				})
			} catch (error) {
				console.error("Error fetching pies:", error)
				setLoading(false)
				setError(true)
			}
		}

		fetchData()
	}, [])

	// Render the pie cards
	return (
		<div>
		<NavBar />
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<PageHeader>
				<Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
					Pie Rankings
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					Discover and explore our collection of delicious pies ranked by rating
				</Typography>
				<Divider sx={{ mt: 2 }} />
			</PageHeader>

			{error && (
				<Alert severity="error" sx={{ mb: 4 }}>
					<AlertTitle>Error</AlertTitle>
					Unable to load pies. Please try again later.
				</Alert>
			)}

			{loading ? (
				<LoadingContainer>
					<CircularProgress />
				</LoadingContainer>
			) : (
				<Grid container spacing={3}>
					{pies
						.sort((a, b) => {
							// Sort by rating in descending order
							const ratingA = ratings[a.id] ? Number.parseFloat(ratings[a.id]) : 0;
							const ratingB = ratings[b.id] ? Number.parseFloat(ratings[b.id]) : 0;
							return ratingB - ratingA;
						})
						.map((pie, index) => (
							<Grid item xs={12} sm={6} md={4} key={pie}>
								<PieCardWrapper elevation={2}>
								<Box sx={{ position: "relative" }}>
									<PieCard name={pie.name} description={''} image={pie.image} />
									<Chip
										label={`#${index + 1}`}
										sx={{
											position: "absolute",
											top: 12,
											right: 12,
											fontWeight: "bold",
											backgroundColor: index === 0 
												? "#FFD700" // Gold
												: index === 1 
												? "#C0C0C0" // Silver
												: index === 2
												? "#CD7F32" // Bronze
												: "#E0E0E0", // Grey for remaining rankings
											color: index < 3 ? "#000000" : "#666666",
										}}
									/>
								</Box>

									<RatingContainer>
										<Typography variant="body1" sx={{ fontWeight: "medium" }}>
											Rating
										</Typography>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<Typography variant="body1" sx={{ fontWeight: "bold" }}>
												{ratings && ratings[pie.id] ? Number.parseFloat(ratings[pie.id]).toFixed(2) : "N/A"}
											</Typography>
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
						There are currently no pies available in the rankings.
					</Typography>
				</Paper>
			)}
		</Container>
		</div>
	)
}

export default Rankings
