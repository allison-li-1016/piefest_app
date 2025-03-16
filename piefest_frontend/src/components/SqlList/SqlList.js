import { useState } from 'react';

function SqlList() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSqlResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/sqltest');
      const data = await response.json();
      setResults(data.sqlRes);
    } catch (err) {
      setError('Failed to fetch SQL results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>SQL Results</h2>
      <button 
        onClick={fetchSqlResults}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Results'}
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SqlList;