// components/Navbar.jsx
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex gap-6 items-center">
      <Link to="/" className="font-bold text-lg hover:text-yellow-400 mr-auto">NTES Dashboard</Link>
     <Link to="/home" className="hover:text-yellow-300 mx-2">Home</Link>
<Link to="/track" className="hover:text-yellow-300 mx-2">Live Track</Link>
<Link to="/history" className="hover:text-yellow-300 mx-2">Delay History</Link>
      <Link to="/delayreportform" className="hover:text-yellow-300 mx-2">Delay Report</Link>
      
    </nav>
  );
}