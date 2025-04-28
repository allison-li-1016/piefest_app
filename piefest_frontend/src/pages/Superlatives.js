import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Typography, Alert } from '@mui/material';

const Superlatives = () => {
  const [superlatives, setSuperlatives] = useState([]);
  const [votes, setVotes] = useState({});
  const [userId, setUserId] = useState(null); // Default to null for unauthenticated users
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const username = Cookies.get('emailUsername');
    const password = Cookies.get('definitelyAnEncryptedPassword');
    setIsAuthenticated(Boolean(username) && Boolean(password));
    if (isAuthenticated) {
      setUserId(1); // Replace with actual user ID from authentication
    }

    // Fetch all superlatives
    axios.get('/backend/superlatives')
      .then(response => {
        console.log('Fetched data:', response.data);
        setSuperlatives(response.data);
      })
      .catch(error => console.error('Error fetching superlatives:', error));

    // Log superlatives
    console.log('Superlatives:', superlatives);

    // Fetch user's superlative votes if authenticated
    if (isAuthenticated) {
      axios.get(`/superlative-votes/${userId}`)
        .then(response => {
          const votesMap = {};
          response.data.forEach(vote => {
            votesMap[vote.SuperlativeId] = vote.PieId;
          });
          setVotes(votesMap);
        })
        .catch(error => console.error('Error fetching user votes:', error));
    }
  }, [isAuthenticated, userId]);

  const handleVote = (superlativeId, pieId) => {
    if (!isAuthenticated) {
      alert('Please log in to vote.');
      return;
    }

    axios.post('/vote-superlative', { userId, pieId, superlativeId })
      .then(() => {
        setVotes(prevVotes => ({
          ...prevVotes,
          [superlativeId]: pieId
        }));
      })
      .catch(error => console.error('Error casting vote:', error));
  };

  return (
    <div>
      <h1>Superlatives</h1>
      {!isAuthenticated && (
        <Box sx={{ mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please log in to vote for superlatives.
          </Alert>
        </Box>
      )}
      <ul>
        {superlatives.map(superlative => (
          <li key={superlative.SuperlativeId}>
            <h2>{superlative.Title}</h2>
            <p>{superlative.Description}</p>
            <label>
              Vote for Pie ID:
              <input
                type="number"
                value={votes[superlative.SuperlativeId] || ''}
                onChange={(e) => handleVote(superlative.SuperlativeId, parseInt(e.target.value, 10))}
                disabled={!isAuthenticated}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Superlatives;