// components/Home.jsx
import React from 'react';
import TrainSearch from "../components/TrainSearch";
import { useNavigate } from "react-router-dom";
import { useTrain } from '../context/TrainContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { selectedTrain, setSelectedTrain } = useTrain();
  const navigate = useNavigate();

  const goToLiveTrack = () => {
    if (selectedTrain) {
      navigate("/track");
    }
  };

  const goToDelayHistory = () => {
    if (selectedTrain) {
      navigate("/history", { state: { selectedTrain } });
    }
  };

  return (
   <div
  className="relative w-full h-screen bg-cover  bg-no-repeat p-6"
  style={{ backgroundImage: "url('/ntes.jpg')", backgroundSize: "100%" }}>
      <div className="bg-gray-800 bg-opacity-60 p-5 rounded-xl max-w-3xl mx-auto text-white">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Train Status Dashboard
        </motion.h1>

        {/* Keep TrainSearch exactly as before */}
        <TrainSearch onTrainSelect={setSelectedTrain} />

        {selectedTrain && (
          <div className="mt-4 space-y-2">
            <div className="text-green-300 font-semibold">
              Selected Train: {selectedTrain.number} - {selectedTrain.name}
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={goToLiveTrack}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Live Tracking
              </button>
              <button
                onClick={goToDelayHistory}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Delay History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}