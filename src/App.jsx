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
import RecentlyPlayed from "./Components/RecentlyPlayed";
import Statistics from "./Components/Statistics";
import GroupChat from "./Components/GroupChat";
import Achievements from "./Components/Achievements";

function HomePage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
          backgroundImage:
            "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.03'/></svg>\")",
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          animation: "psSlideIn 300ms ease-out",
        }}
      >
        <Sidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: isSidebarCollapsed ? "72px" : "240px",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 300ms ease",
        }}
      >
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />

        <main
          style={{
            marginTop: "56px",
            overflowY: "auto",
            height: "calc(100vh - 56px)",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              padding: "20px 24px",
              alignItems: "flex-start",
              maxWidth: "100%",
            }}
          >
            {/* Main Content Area */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0",
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
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    animation: "psFadeUp 500ms ease-out",
                  }}
                >
                  <RecentlyPlayed />
                </div>

                <div
                  style={{
                    animation: "psFadeUp 600ms ease-out",
                  }}
                >
                  <Statistics />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Group Chat & Achievements */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                animation: "psFadeUp 700ms ease-out",
              }}
            >
              <GroupChat />
              <Achievements />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StorePage() {
  const [activeNav, setActiveNav] = useState("Store");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
          backgroundImage:
            "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.03'/></svg>\")",
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          animation: "psSlideIn 300ms ease-out",
        }}
      >
        <Sidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: isSidebarCollapsed ? "72px" : "240px",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 300ms ease",
        }}
      >
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />

        <main
          style={{
            marginTop: "56px",
            overflowY: "auto",
            height: "calc(100vh - 56px)",
            overflowX: "hidden",
          }}
        >
          <PSStoreUI />
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
        <Route path="/store" element={<StorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
