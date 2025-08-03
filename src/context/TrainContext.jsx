// src/context/TrainContext.jsx
import React, { createContext, useContext, useState } from 'react';

const TrainContext = createContext();

export const TrainProvider = ({ children }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  return (
    <TrainContext.Provider value={{ selectedTrain, setSelectedTrain }}>
      {children}
    </TrainContext.Provider>
  );
};

export const useTrain = () => useContext(TrainContext);