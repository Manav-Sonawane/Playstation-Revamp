import React from "react";
import { Home, ShoppingBag, Users, User } from "lucide-react";
import { userProfile } from "../data/mockData.js";

const Sidebar = ({ activeNav = "Home", onNavChange }) => {
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: ShoppingBag, label: "Store" },
    { icon: Users, label: "Social" },
    { icon: User, label: "Profile" },
  ];

  const handleNavClick = (label) => {
    if (onNavChange) {
      onNavChange(label);
    }
  };

  const progressPercent =
    (userProfile.currentXP / userProfile.nextLevelXP) * 100;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[240px] bg-[#0d1117] flex flex-col"
      style={{
        borderRight: "1px solid #1e2d45",
        boxShadow: "2px 0 8px rgba(0, 112, 209, 0.15)",
      }}
    >
      {/* TOP SECTION - Logo */}
      <div
        className="flex items-center gap-[10px] p-5"
        style={{ borderBottom: "1px solid #1e2d45" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "32px",
            height: "32px",
            background: "#0070d1",
            borderRadius: "6px",
          }}
        >
          <span className="text-white font-bold text-[14px]">PS</span>
        </div>
        <span className="text-white font-bold text-[18px]">PlayStation</span>
      </div>

      {/* NAVIGATION */}
      <nav className="p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;

          return (
            <div
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className="flex items-center gap-3 h-12 px-4 cursor-pointer"
              style={{
                borderRadius: "10px",
                background: isActive ? "#0070d1" : "transparent",
                color: isActive ? "#ffffff" : "#8a9bb5",
                boxShadow: isActive
                  ? "0 0 12px rgba(0, 112, 209, 0.4)"
                  : "none",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#141824";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#8a9bb5";
                }
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Bottom Section - Level Progress */}
      <div className="absolute bottom-4 left-3 right-3">
        <div
          className="p-4"
          style={{
            background: "#141824",
            borderRadius: "12px",
            border: "1px solid #1e2d45",
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span style={{ color: "#8a9bb5", fontSize: "12px" }}>
              Level Progress
            </span>
            <span
              style={{ color: "#0070d1", fontSize: "12px", fontWeight: "bold" }}
            >
              {userProfile.level} → {userProfile.nextLevel}
            </span>
          </div>

          {/* XP text */}
          <div style={{ color: "#8a9bb5", fontSize: "11px", marginTop: "8px" }}>
            {userProfile.currentXP} / {userProfile.nextLevelXP} XP
          </div>

          {/* Progress bar */}
          <div
            className="mt-[6px]"
            style={{
              height: "4px",
              background: "#1e2d45",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #0070d1, #00d4ff)",
                borderRadius: "2px",
                boxShadow: "0 0 8px rgba(0, 208, 255, 0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
