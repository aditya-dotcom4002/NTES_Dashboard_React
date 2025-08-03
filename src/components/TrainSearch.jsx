import React, { useState } from "react";

const trainList = [
  { number: "12345", name: "Rajdhani Express", type: "Express", region: "North" },
  { number: "67890", name: "Shatabdi Express", type: "Superfast", region: "West" },
  { number: "11015", name: "Kushinagar Express", type: "Mail", region: "North" },
  { number: "12951", name: "Mumbai Rajdhani", type: "Rajdhani", region: "West" },
  { number: "22888", name: "Duronto Express", type: "Superfast", region: "East" },
];

export default function TrainSearch({ onTrainSelect }) {
  const [query, setQuery] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");

  const filteredTrains = trainList.filter((train) => {
    const matchesQuery =
      train.name.toLowerCase().includes(query.toLowerCase()) ||
      train.number.includes(query);
    const matchesType = typeFilter ? train.type === typeFilter : true;
    return matchesQuery && matchesType;
  });

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setQuery(`${train.number} - ${train.name}`);
    if (onTrainSelect) onTrainSelect(train);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 max-w-xl mx-auto relative text-black">
      <h2 className="text-xl font-semibold mb-4">🔍 Search Train</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter train name or number"
          aria-label="Search train"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          aria-label="Filter by type"
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Types</option>
          <option value="Express">Express</option>
          <option value="Superfast">Superfast</option>
          <option value="Rajdhani">Rajdhani</option>
          <option value="Mail">Mail</option>
        </select>
      </div>

      {query.length > 0 && filteredTrains.length > 0 && (
        <ul className="absolute left-5 right-5 mt-2 bg-white text-black border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredTrains.map((train) => (
            <li
              key={train.number}
              onClick={() => handleTrainSelect(train)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              <strong>{train.number}</strong> – {train.name} ({train.type}, {train.region})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}