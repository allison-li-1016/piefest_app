import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Vote from './pages/Vote.js';
import Rankings from './pages/Rankings.js';
import CreatePie from './pages/CreatePie.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/create-pie" element={<CreatePie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;