// pages/LiveTrack.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon (for Vite/CRA)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

// Train data with paths
const trains = [
  {
    number: "12345",
    name: "Rajdhani Express",
    type: "Express",
    region: "North",
    path: [
      [28.6139, 77.2090], // New Delhi
      [27.1767, 78.0081], // Agra
      [25.5941, 85.1376], // Patna
      [23.3441, 85.3096], // Ranchi
      [22.5726, 88.3639], // Kolkata
    ],
    locationNames: ["New Delhi", "Agra", "Patna", "Ranchi", "Kolkata"],
    status: ["On Time", "Delayed", "On Time", "Slight Delay", "Reached"]
  },
  {
    number: "54321",
    name: "Duronto Express",
    type: "Superfast",
    region: "East",
    path: [
      [22.5726, 88.3639], // Kolkata
      [24.2335, 88.0031], // Malda
      [26.1445, 91.7362], // Guwahati
    ],
    locationNames: ["Kolkata", "Malda", "Guwahati"],
    status: ["On Time", "On Time", "Reached"]
  },
  {
    number: "11015",
    name: "Kushinagar Express",
    type: "Mail",
    region: "North",
    path: [
      [28.7041, 77.1025], // Delhi
      [26.8467, 80.9462], // Lucknow
      [26.7588, 83.3732], // Gorakhpur
    ],
    locationNames: ["Delhi", "Lucknow", "Gorakhpur"],
    status: ["On Time", "On Time", "Reached"]
  },
  {
    number: "12951",
    name: "Mumbai Rajdhani",
    type: "Rajdhani",
    region: "West",
    path: [
      [19.0760, 72.8777], // Mumbai
      [23.0225, 72.5714], // Ahmedabad
      [28.6139, 77.2090], // New Delhi
    ],
    locationNames: ["Mumbai", "Ahmedabad", "New Delhi"],
    status: ["On Time", "Slight Delay", "Reached"]
  },
  {
    number: "22888",
    name: "Duronto Express",
    type: "Superfast",
    region: "East",
    path: [
      [22.5726, 88.3639], // Kolkata
      [19.7515, 75.7139], // Aurangabad
      [18.5204, 73.8567], // Pune
      [19.0760, 72.8777], // Mumbai
    ],
    locationNames: ["Kolkata", "Aurangabad", "Pune", "Mumbai"],
    status: ["On Time", "Delayed", "On Time", "Reached"]
  }
];

function UpdateMapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 6);
  }, [position]);
  return null;
}

function interpolateCoords(start, end, t) {
  const lat = start[0] + (end[0] - start[0]) * t;
  const lng = start[1] + (end[1] - start[1]) * t;
  return [lat, lng];
}

export default function LiveTrack() {
  const [selectedTrainIndex, setSelectedTrainIndex] = useState(0);
  const selectedTrain = trains[selectedTrainIndex];

  const [segmentIndex, setSegmentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(selectedTrain.path[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.0001;
        if (next >= 1) {
          const nextSegment = (segmentIndex + 1) % (selectedTrain.path.length - 1);
          setSegmentIndex(nextSegment);
          return 0;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [segmentIndex, selectedTrain]);

  useEffect(() => {
    const current = interpolateCoords(
      selectedTrain.path[segmentIndex],
      selectedTrain.path[segmentIndex + 1],
      progress
    );
    setPosition(current);
  }, [progress, segmentIndex, selectedTrain]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live Train Tracking</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Train:</label>
        <select
          className="p-2 border rounded-md"
          value={selectedTrainIndex}
          onChange={(e) => {
            setSelectedTrainIndex(Number(e.target.value));
            setSegmentIndex(0);
            setProgress(0);
          }}
        >
          {trains.map((train, index) => (
            <option key={train.number} value={index}>
              {train.number} - {train.name}
            </option>
          ))}
        </select>
      </div>

      <MapContainer center={position} zoom={6} style={{ height: "400px", width: "100%" }}>
        <UpdateMapCenter position={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Polyline positions={selectedTrain.path} color="blue" />
        <Marker position={position} />
      </MapContainer>

      <div className="mt-6 bg-blue-100 p-4 rounded-md border border-blue-400">
        <h3 className="text-lg font-semibold">Now Tracking:</h3>
        <p className="text-blue-900">
          {selectedTrain.number} - {selectedTrain.name} ({selectedTrain.type}, {selectedTrain.region})
        </p>

        <div className="mt-4 bg-white border rounded-md p-4 text-center">
          <p>
            🚆 Current Location: <strong>Near {selectedTrain.locationNames[segmentIndex]}</strong>
          </p>
          <p>
            Status: <span className="text-green-600">{selectedTrain.status[segmentIndex]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}