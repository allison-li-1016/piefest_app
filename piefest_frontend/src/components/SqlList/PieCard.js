import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PieCard.css';  // You'll need to create this CSS file

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
                const response = "TODO";
                setPie(response.data);
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