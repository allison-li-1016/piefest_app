import { useState } from 'react';
import PieCard from './PieCard';

function VoteInstance() {
    // Gets pie uids
    const getPies = async () => {

    }

    const [pies, setPies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch pies on component mount
    useState(() => {
        const fetchData = async () => {
            try {
                const pieData = await getPies();
                setPies(pieData);
                
                // Initialize ratings object
                const initialRatings = {};
                pieData.forEach(pie => {
                    initialRatings[pie.uid] = '';
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

    // Render the pie cards
    return (
        <div className="rankings-container">
            <h2>Pie Rankings</h2>
            
            {loading ? (
                <p>Loading pies...</p>
            ) : (
                <div className="pie-cards">
                    {pies.map(pie => (
                        <div key={pie.uid}>
                            <PieCard uid={pie.uid} />
                            <div className="rating-input">
                                <label htmlFor={`rating-${pie.uid}`}>Rating (1-10):</label>
                                <input
                                    id={`rating-${pie.uid}`}
                                    type="number"
                                    min="1"
                                    max="10"
                                    step="0.5"
                                    value={ratings[pie.uid]}
                                    onChange={(e) => handleRatingChange(pie.uid, e.target.value)}
                                    placeholder="Enter 1-10"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default VoteInstance;