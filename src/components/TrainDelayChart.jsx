// TrainDelayChart.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";

export default function TrainDelayChart({ selectedTrain: propSelectedTrain }) {
  const location = useLocation();
  const selectedTrain = propSelectedTrain || location.state?.selectedTrain;
  const [view, setView] = useState("daily");

  const mockTrainData = {
    "12345 - Rajdhani Express": {
      daily: [
        { date: "Mon", delay: 5 },
        { date: "Tue", delay: 2 },
        { date: "Wed", delay: 7 },
        { date: "Thu", delay: 3 },
        { date: "Fri", delay: 6 },
        { date: "Sat", delay: 4 },
        { date: "Sun", delay: 8 },
      ],
      weekly: [
        { week: "Week 1", delay: 4 },
        { week: "Week 2", delay: 6 },
        { week: "Week 3", delay: 3 },
        { week: "Week 4", delay: 7 },
      ],
      monthly: [
        { month: "Jan", delay: 5 },
        { month: "Feb", delay: 4 },
        { month: "Mar", delay: 6 },
        { month: "Apr", delay: 3 },
      ],
    },
    "67890 - Shatabdi Express": {
      daily: [
        { date: "Mon", delay: 3 },
        { date: "Tue", delay: 1 },
        { date: "Wed", delay: 4 },
        { date: "Thu", delay: 2 },
        { date: "Fri", delay: 5 },
        { date: "Sat", delay: 2 },
        { date: "Sun", delay: 6 },
      ],
      weekly: [
        { week: "Week 1", delay: 2 },
        { week: "Week 2", delay: 4 },
        { week: "Week 3", delay: 1 },
        { week: "Week 4", delay: 5 },
      ],
      monthly: [
        { month: "Jan", delay: 3 },
        { month: "Feb", delay: 2 },
        { month: "Mar", delay: 4 },
        { month: "Apr", delay: 1 },
      ],
    },
    "11015 - Kushinagar Express": {
      daily: [
        { date: "Mon", delay: 6 },
        { date: "Tue", delay: 4 },
        { date: "Wed", delay: 5 },
        { date: "Thu", delay: 7 },
        { date: "Fri", delay: 3 },
        { date: "Sat", delay: 6 },
        { date: "Sun", delay: 5 },
      ],
      weekly: [
        { week: "Week 1", delay: 5 },
        { week: "Week 2", delay: 6 },
        { week: "Week 3", delay: 4 },
        { week: "Week 4", delay: 7 },
      ],
      monthly: [
        { month: "Jan", delay: 6 },
        { month: "Feb", delay: 5 },
        { month: "Mar", delay: 7 },
        { month: "Apr", delay: 6 },
      ],
    },
    "12951 - Mumbai Rajdhani": {
      daily: [
        { date: "Mon", delay: 2 },
        { date: "Tue", delay: 3 },
        { date: "Wed", delay: 1 },
        { date: "Thu", delay: 2 },
        { date: "Fri", delay: 3 },
        { date: "Sat", delay: 2 },
        { date: "Sun", delay: 4 },
      ],
      weekly: [
        { week: "Week 1", delay: 3 },
        { week: "Week 2", delay: 2 },
        { week: "Week 3", delay: 4 },
        { week: "Week 4", delay: 3 },
      ],
      monthly: [
        { month: "Jan", delay: 2 },
        { month: "Feb", delay: 3 },
        { month: "Mar", delay: 2 },
        { month: "Apr", delay: 4 },
      ],
    },
    "22888 - Duronto Express": {
      daily: [
        { date: "Mon", delay: 4 },
        { date: "Tue", delay: 5 },
        { date: "Wed", delay: 3 },
        { date: "Thu", delay: 6 },
        { date: "Fri", delay: 5 },
        { date: "Sat", delay: 4 },
        { date: "Sun", delay: 6 },
      ],
      weekly: [
        { week: "Week 1", delay: 5 },
        { week: "Week 2", delay: 4 },
        { week: "Week 3", delay: 6 },
        { week: "Week 4", delay: 5 },
      ],
      monthly: [
        { month: "Jan", delay: 4 },
        { month: "Feb", delay: 6 },
        { month: "Mar", delay: 5 },
        { month: "Apr", delay: 6 },
      ],
    },
  };

  if (!selectedTrain) {
    return (
     
      <div className="text-center text-red-600 mt-4">
        No Train Selected
        <div className="text-center text-blue-600">
          Please select a train from the Home page
          and click the <strong>Delay History</strong> button beneath it.
        </div>
      </div>
      
    );
  }

  const trainKey = `${selectedTrain.number} - ${selectedTrain.name}`;
  const trainData = mockTrainData[trainKey];

  if (!trainData) {
    return (
      <div className="text-center text-red-600 mt-4">
        No delay data available for this train.
      </div>
    );
  }

  const data = trainData[view] || [];
  const xKey = view === "daily" ? "date" : view === "weekly" ? "week" : "month";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Historical Delay Trends</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="space-x-2">
          <button
            onClick={() => setView("daily")}
            className={`px-3 py-1 rounded ${view === "daily" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Daily
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1 rounded ${view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1 rounded ${view === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Monthly
          </button>
        </div>
      </div>
      

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis label={{ value: "Delay (mins)", angle: -90, position: "insideLeft" }} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload && payload.length ? (
                <div className="bg-white border border-gray-300 p-2 rounded shadow">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-600">
                    Delay: {payload[0].value} mins
                  </p>
                </div>
              ) : null
            }
          />
          <Line type="monotone" dataKey="delay" stroke="#1D4ED8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  
  );
}
