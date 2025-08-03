// App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Track from "./pages/LiveTrack";
import History from "./pages/History";
import LiveMap from "./pages/LiveMap";
import TrainDashboard from './pages/TrainDashboard';
import LiveTrack from './pages/LiveTrack';
import DelayReportForm from './components/DelayReportForm';

function App() {
  const [selectedTrain, setSelectedTrain] = useState(null);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-80">
        <Routes>
          <Route path="/" element={<TrainDashboard />} />
          <Route path="/track" element={<LiveTrack selectedTrain={selectedTrain} />} />
          <Route path="/history" element={<History selectedTrain={selectedTrain} />} />
          <Route path="/map" element={<LiveMap selectedTrain={selectedTrain} />} />
          <Route path="/home" element={<Home setSelectedTrain={setSelectedTrain} />} />
          <Route path="/delayreportform" element={<DelayReportForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;