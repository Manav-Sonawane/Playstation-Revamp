import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ShoppingBag, Users, User } from "lucide-react";
import PSLogo from "./PSLogo.jsx";

/* Sidebar — always collapsed (icon-only, no expand toggle) */
const Sidebar = ({ activeNav = "Home", onNavChange }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: ShoppingBag, label: "Store", path: "/store" },
    { icon: Users, label: "Social", path: "/home" },
    { icon: User, label: "Profile", path: "/home" },
  ];

  const handleNavClick = (label, path) => {
    if (onNavChange) onNavChange(label);
    navigate(path);
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: "72px",          /* always collapsed */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(8, 11, 22, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "4px 0 32px rgba(0, 0, 0, 0.4), 2px 0 0 rgba(0,112,209,0.06)",
        zIndex: 200,
      }}
    >
      {/* PS Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          width: "100%",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <PSLogo size={32} />
      </div>

      {/* Nav icons */}
      <nav style={{ padding: "12px 8px", flex: 1, width: "100%" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;
          return (
            <div
              key={item.label}
              onClick={() => handleNavClick(item.label, item.path)}
              title={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "46px",
                borderRadius: "10px",
                marginBottom: "4px",
                cursor: "pointer",
                background: isActive
                  ? "linear-gradient(90deg, rgba(0,112,209,0.3), rgba(0,112,209,0.1))"
                  : "transparent",
                color: isActive ? "#ffffff" : "#8a9bb5",
                borderLeft: isActive ? "2.5px solid #0070d1" : "2.5px solid transparent",
                transition: "all 180ms ease",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
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
              <Icon size={19} />
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
