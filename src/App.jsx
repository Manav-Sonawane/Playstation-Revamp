import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PSStoreUI from "./Components/StoreUI";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import HeroBanner from "./Components/HeroBanner";
import ContinuePlaying from "./Components/ContinuePlaying";
import PersonalizedSection from "./Components/PersonalizedSection";
import FriendsPanel from "./Components/FriendsPanel";

function HomePage() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0e1a",
        display: "flex",
        position: "relative",
      }}
    >
      {/* Noise/grain texture overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.03'/></svg>\")",
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          animation: "psSlideIn 300ms ease-out",
        }}
      >
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <main
          style={{
            marginTop: "56px",
            overflowY: "auto",
            height: "calc(100vh - 56px)",
          }}
        >
          <div
            style={{
              animation: "psFadeUp 400ms ease-out",
            }}
          >
            <HeroBanner />
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
              padding: "32px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <div
                style={{
                  animation: "psFadeUp 500ms ease-out",
                }}
              >
                <ContinuePlaying />
              </div>
              
              <div
                style={{
                  animation: "psFadeUp 600ms ease-out",
                }}
              >
                <PersonalizedSection />
              </div>
            </div>

            <div
              style={{
                animation: "psFadeUp 700ms ease-out",
              }}
            >
              <FriendsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/store" element={<PSStoreUI />} />
      </Routes>
    </Router>
  );
}

export default App;
