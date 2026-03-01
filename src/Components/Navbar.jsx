import React, { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { userProfile } from "../data/mockData.js";

const Navbar = ({ isSidebarCollapsed = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning,";
    if (h < 18) return "Good Afternoon,";
    return "Good Evening,";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: isSidebarCollapsed ? "72px" : "240px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
        zIndex: 100,
        background: "rgba(8, 11, 22, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        transition: "left 300ms ease",
      }}
    >
      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: "16px", fontWeight: 300, color: "#8a9bb5" }}>
          {getTimeGreeting()}
        </span>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>
          {userProfile.username}
        </span>
      </div>

      {/* Search bar */}
      <div style={{ flex: 1, maxWidth: "380px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "36px",
            padding: "0 14px",
            gap: "8px",
            background: isFocused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: isFocused ? "1px solid rgba(0,112,209,0.7)" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            boxShadow: isFocused ? "0 0 0 3px rgba(0,112,209,0.12), 0 0 20px rgba(0,112,209,0.1)" : "none",
            transition: "all 200ms ease",
          }}
        >
          <Search size={15} style={{ color: "#8a9bb5", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search games, friends, achievements..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "13px",
            }}
          />
        </div>
      </div>

      {/* Right icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px", marginLeft: "auto" }}>
        {/* Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Bell size={20} style={{ color: "#8a9bb5" }} />
          <div style={{
            position: "absolute",
            top: "-3px",
            right: "-3px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#0070d1",
            border: "2px solid #0a0e1a",
            animation: "psPulse 2s infinite",
          }} />
        </div>

        {/* Settings */}
        <Settings size={20} style={{ color: "#8a9bb5", cursor: "pointer" }} />

        {/* Divider */}
        <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.1)" }} />

        {/* User avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0070d1, #00d4ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "12px",
              color: "white",
              border: "2px solid rgba(255,255,255,0.15)",
            }}>
              GP
            </div>
            <div style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: "#f5a623",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: 700,
              color: "#000",
              border: "2px solid #0a0e1a",
            }}>
              {userProfile.level}
            </div>
          </div>
          <span style={{ color: "white", fontWeight: 600, fontSize: "13px" }}>
            {userProfile.username}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes psPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
