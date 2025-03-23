import { useState, useEffect } from "react";
import PieCard from "../components/PieCard";
import { getRankings, getPieUids } from "../components/Helpers/Helpers";

function Rankings() {

    const [pies, setPies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch pies on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const uids = await getPieUids();
                setPies(uids);
                
                // Initialize ratings object
                getRankings().then(r => {;
                    setRatings(r);
                    console.log(r);
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error fetching pies:", error);
                setLoading(false);
                setError(true);
            }
        };
        
        fetchData();
    }, []);

    // Removed handleRatingChange as it's no longer needed

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
                            <div className="rating-display">
                                <label>Rating: </label>
                                <span className="rating-value">
                                    {ratings && ratings[pie] ? parseFloat(ratings[pie]).toFixed(2) : 'N/A'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
}
export default Rankings;
