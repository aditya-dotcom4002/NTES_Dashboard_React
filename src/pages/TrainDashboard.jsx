// TrainDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TrainDashboard() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/home");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8 },
    }),
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white scroll-smooth"
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/6/67/Train_india.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen px-4 py-10 flex flex-col items-center justify-center space-y-10">
        <motion.h1
          className="text-5xl font-extrabold text-center drop-shadow-lg leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Enhanced Train Status Dashboard for NTES
        </motion.h1>

        <motion.button
          onClick={handleExplore}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-500 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚆 Explore Home page
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mt-10">
          {[
            {
              title: "About Indian Railways",
              text:
                "Indian Railways is one of the world’s largest and busiest rail networks, transporting over 23 million passengers daily. It serves as the backbone of national integration, economic growth, and mass transportation.",
            },
            {
              title: "About CRIS",
              text:
                "CRIS (Centre for Railway Information Systems) is the tech wing of Indian Railways. It develops and maintains mission-critical applications like Passenger Reservation, Freight Management, and Train Operations.",
            },
            {
              title: "About NTES",
              text:
                "NTES (National Train Enquiry System) provides real-time train information — schedules, current location, and delay stats — for millions of users every day. It improves passenger convenience and planning.",
            },
            {
              title: "Project Overview",
              text:
                "This dashboard revamps the NTES interface with live train tracking, historical delay charts, and crowd-sourced delay reports. Built with React, Leaflet, Recharts, and Tailwind CSS.",
            },
            {
              title: "Technology Stack",
              text:
                "React.js (Vite), Tailwind CSS, Leaflet.js, Recharts, Appwrite (optional), Firebase or LocalStorage for crowd data. Designed for speed, responsiveness, and interactivity.",
            },
            {
              title: "About the Developer",
              text:
                "Built by Aditya Prakash Gupta, Intern at CRIS – NTES Group (June 2025). Passionate about combining data with design to solve real-world railway problems.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-xl"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>
              <p className="text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
