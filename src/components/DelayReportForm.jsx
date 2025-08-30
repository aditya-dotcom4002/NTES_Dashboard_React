// components/DelayReportForm.jsx
import React, { useState } from "react";

export default function DelayReportForm() {
  const [trainNumber, setTrainNumber] = useState("");
  const [station, setStation] = useState("");
  const [delayMinutes, setDelayMinutes] = useState("");
  const [comment, setComment] = useState("");
  const [submittedReports, setSubmittedReports] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      trainNumber,
      station,
      delayMinutes,
      comment,
      timestamp: new Date().toLocaleString()
    };
    setSubmittedReports((prev) => [newReport, ...prev]);

    // Clear form
    setTrainNumber("");
    setStation("");
    setDelayMinutes("");
    setComment("");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center responsive-bg"
      style={{
        backgroundImage: "url('/report.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f9fafb"
      }}
    >
      <h1 className="text-5xl text-black font-semibold mb-10 mx-w-xl p-4" >Crowd-Sourced Delay Report</h1>
  <div className="bg-gray-300 shadow-md rounded max-w-2xl w-full mx-auto px-6 py-4">
      <h2 className="text-xl font-bold mb-4">Submit Delay Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Train Number:</label>
          <input
            type="text"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Station:</label>
          <input
            type="text"
            value={station}
            onChange={(e) => setStation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Delay (in minutes):</label>
          <input
            type="number"
            value={delayMinutes}
            onChange={(e) => setDelayMinutes(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Comment (optional):</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>

      {submittedReports.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Submitted Reports</h3>
          <ul className="space-y-2">
            {submittedReports.map((report, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded border">
                <p><strong>Train:</strong> {report.trainNumber}</p>
                <p><strong>Station:</strong> {report.station}</p>
                <p><strong>Delay:</strong> {report.delayMinutes} min</p>
                {report.comment && <p><strong>Note:</strong> {report.comment}</p>}
                <p className="text-sm text-gray-600"><strong>Reported at:</strong> {report.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}