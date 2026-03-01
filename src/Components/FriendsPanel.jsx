import React from "react";
import { Users } from "lucide-react";
import { onlineFriends } from "../data/mockData.js";

const avatarColors = [
  "linear-gradient(135deg, #3a4a6b, #1e2d45)",
  "linear-gradient(135deg, #2a4a3a, #1a3028)",
  "linear-gradient(135deg, #4a3a6b, #2d1e45)",
  "linear-gradient(135deg, #4a3a2a, #3a2a1a)",
];

const FriendsPanel = () => {
  const getInitials = (username) => username.substring(0, 1).toUpperCase();
  const onlineCount = onlineFriends.filter(
    (f) => f.status === "online" || f.status === "in-game"
  ).length;

  return (
    <div
      style={{
        background: "rgba(10, 14, 26, 0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.3px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Users size={17} style={{ color: "#0070d1" }} />
          Friends
        </h3>
        <div
          style={{
            background: "rgba(0,230,118,0.12)",
            border: "1px solid rgba(0,230,118,0.25)",
            color: "#00e676",
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "20px",
            letterSpacing: "0.3px",
          }}
        >
          {onlineCount} Online
        </div>
      </div>

      {/* Friends list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {onlineFriends.map((friend, idx) => (
          <div
            key={friend.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 10px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 180ms ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,112,209,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Avatar circle with initial */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: avatarColors[idx % avatarColors.length],
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0",
                }}
              >
                {getInitials(friend.username)}
              </div>
              {/* Status dot */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1px",
                  right: "1px",
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background:
                    friend.status === "in-game"
                      ? "#0070d1"
                      : "#00e676",
                  border: "2px solid rgba(10,14,26,0.9)",
                  boxShadow:
                    friend.status === "in-game"
                      ? "0 0 6px rgba(0,112,209,0.7)"
                      : "0 0 6px rgba(0,230,118,0.7)",
                }}
              />
            </div>

            {/* Name + subtitle */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "2px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {friend.username}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color:
                    friend.currentGame
                      ? "#8a9bb5"
                      : "#00e676",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: friend.currentGame ? 400 : 500,
                }}
              >
                {friend.currentGame || "Online"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all */}
      <button
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "9px",
          background: "rgba(0,112,209,0.08)",
          border: "1px solid rgba(0,112,209,0.2)",
          borderRadius: "10px",
          color: "#0070d1",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 180ms ease",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,112,209,0.18)";
          e.currentTarget.style.borderColor = "rgba(0,112,209,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,112,209,0.08)";
          e.currentTarget.style.borderColor = "rgba(0,112,209,0.2)";
        }}
      >
        View All Friends
      </button>
    </div>
  );
};

export default FriendsPanel;
