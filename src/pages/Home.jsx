import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div className="min-h-screen">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <Navbar />

      {/* Main content area */}
      <main
        className="pt-[56px] pl-[240px]"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to PlayStation Home
          </h1>
          <p className="text-ps-textSecondary text-lg">
            Your gaming dashboard is under construction...
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
