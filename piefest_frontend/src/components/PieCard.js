import React, { useState, useEffect } from 'react';
import { getPie } from './Helpers/Helpers';
// import './PieCard.css';

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
                // Replace with your actual API endpoint
                const response = await getPie(uid);
                // Check if response has data property or is the data itself
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

    if (loading) return <div className="pie-card loading">Loading...</div>;
    if (error) return <div className="pie-card error">{error}</div>;

    return (
        <div className="pie-card">
            {pie.image && (
                <div className="pie-image">
                    <img src={pie.image} alt={pie.name} />
                </div>
            )}
            <div className="pie-info">
                <h3 className="pie-name">{pie.name}</h3>
                <p className="pie-description">{pie.description}</p>
            </div>
        </div>
    );
};

export default PieCard;