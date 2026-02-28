import React, { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { userProfile } from "../data/mockData.js";

const Navbar = ({ isSidebarCollapsed = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes psPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
          }
          .ps-pulse {
            animation: psPulse 2s infinite;
          }
          .icon-hover {
            transition: color 150ms ease;
            cursor: pointer;
          }
          .icon-hover:hover {
            color: #ffffff;
          }
        `}
      </style>

      <nav
        className="fixed top-0 right-0 h-[56px] flex items-center px-6 gap-4"
        style={{
          left: isSidebarCollapsed ? "72px" : "240px",
          zIndex: 100,
          background: "rgba(10, 14, 26, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1e2d45",
          transition: "left 300ms ease",
        }}
      >
        {/* LEFT - Welcome Message */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontSize: "18px",
              fontWeight: "300",
              color: "#8a9bb5",
            }}
          >
            Good Morning,
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
            }}
          >
            {userProfile.username}
          </span>
        </div>

        {/* MIDDLE - Search bar */}
        <div className="flex-1" style={{ maxWidth: "360px" }}>
          <div
            className="flex items-center h-9 px-[14px] gap-2"
            style={{
              background: "#141824",
              border: isFocused ? "1px solid #0070d1" : "1px solid #1e2d45",
              borderRadius: "24px",
              boxShadow: isFocused
                ? "0 0 0 2px rgba(0, 112, 209, 0.2)"
                : "none",
              transition: "all 150ms ease",
            }}
          >
            <Search size={16} style={{ color: "#8a9bb5" }} />
            <input
              type="text"
              placeholder="Search games, friends, achievements..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-[#8a9bb5]"
            />
          </div>
        </div>

        {/* RIGHT - Icons and User */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Bell icon with notification dot */}
          <div className="relative">
            <Bell
              size={22}
              className="icon-hover"
              style={{ color: "#8a9bb5" }}
            />
            <div
              className="ps-pulse absolute"
              style={{
                top: "-2px",
                right: "-2px",
                width: "8px",
                height: "8px",
                background: "#0070d1",
                borderRadius: "50%",
                border: "2px solid #0a0e1a",
              }}
            />
          </div>

          {/* Settings icon */}
          <Settings
            size={22}
            className="icon-hover"
            style={{ color: "#8a9bb5" }}
          />

          {/* Vertical divider */}
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "#1e2d45",
            }}
          />

          {/* User section */}
          <div className="flex items-center gap-[10px]">
            {/* Avatar with level badge */}
            <div className="relative">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "linear-gradient(135deg, #0070d1, #00d4ff)",
                  borderRadius: "50%",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "white",
                }}
              >
                GP
              </div>
              {/* Level badge */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  bottom: "-2px",
                  right: "-2px",
                  width: "16px",
                  height: "16px",
                  background: "#f5a623",
                  borderRadius: "50%",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {userProfile.level}
              </div>
            </div>

            {/* Username */}
            <span
              style={{
                color: "white",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {userProfile.username}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
