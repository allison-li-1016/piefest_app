import { useState, useEffect } from 'react';
import PieCard from './PieCard';
import { getPieUids, updatePieRating } from './Helpers/Helpers';

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
        <div className="rankings-container">
            <h2>Pie Rankings</h2>
            
            {loading ? (
                <p>Loading pies...</p>
            ) : (
                <div className="pie-cards">
                    {pies.map(pie => (
                        <div key={pie}>
                            <PieCard uid={pie} />
                            <div className="rating-input">
                                <label htmlFor={`rating-${pie}`}>Rating (1-10):</label>
                                <input
                                    id={`rating-${pie}`}
                                    type="number"
                                    min="1"
                                    max="10"
                                    step="0.5"
                                    value={ratings[pie]}
                                    onChange={(e) => handleRatingChange(pie, e.target.value)}
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