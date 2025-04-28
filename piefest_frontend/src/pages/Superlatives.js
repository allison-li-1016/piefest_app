import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Superlatives = () => {
  const [superlatives, setSuperlatives] = useState([]);
  const [votes, setVotes] = useState({});
  const [userId, setUserId] = useState(1); // Replace with actual user ID from authentication

  useEffect(() => {
    // Fetch all superlatives
    axios.get('/superlatives')
      .then(response => setSuperlatives(response.data))
      .catch(error => console.error('Error fetching superlatives:', error));

    // Fetch user's superlative votes
    axios.get(`/superlative-votes/${userId}`)
      .then(response => {
        const votesMap = {};
        response.data.forEach(vote => {
          votesMap[vote.SuperlativeId] = vote.PieId;
        });
        setVotes(votesMap);
      })
      .catch(error => console.error('Error fetching user votes:', error));
  }, [userId]);

  const handleVote = (superlativeId, pieId) => {
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
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Superlatives;