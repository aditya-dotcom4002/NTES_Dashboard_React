// src/pages/LiveMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LiveMap() {
  // Dummy train coordinates (somewhere in India)
  const trainPosition = {
    lat: 25.3176,
    lng: 82.9739,
  };

  useEffect(() => {
    document.title = "Live Train Map | NTES Dashboard";
  }, []);

  return (
    <div className="h-screen w-full">
      <h1 className="text-2xl font-bold text-center my-4">
        Live Train Tracking
      </h1>
      <MapContainer
        center={[trainPosition.lat, trainPosition.lng]}
        zoom={6}
        scrollWheelZoom={true}
        className="h-[80vh] w-[90%] mx-auto rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[trainPosition.lat, trainPosition.lng]}>
          <Popup>
            Train is currently here (simulated data).
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}