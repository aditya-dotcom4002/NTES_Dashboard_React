import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TrainProvider } from './context/TrainContext'; // if using context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrainProvider>
        <App />
      </TrainProvider>
    </BrowserRouter>
  </React.StrictMode>
);