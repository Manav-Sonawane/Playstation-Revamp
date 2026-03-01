import React from "react";
import { Trophy, Award } from "lucide-react";
import { recentAchievements } from "../data/mockData.js";

const Achievements = () => {
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
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            letterSpacing: "-0.3px",
          }}
        >
          <Award size={17} style={{ color: "#f5a623" }} />
          Recent Achievements
        </h3>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {recentAchievements.map((achievement) => (
          <div
            key={achievement.id}
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,166,35,0.35)";
              e.currentTarget.style.background = "rgba(245,166,35,0.06)";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {/* Trophy icon */}
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(245,166,35,0.85), rgba(255,140,0,0.85))",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(245,166,35,0.3)",
              }}
            >
              <Trophy size={18} color="white" />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: "2px",
                }}
              >
                {achievement.name}
              </div>
              <div style={{ fontSize: "11px", color: "#8a9bb5" }}>
                {new Date(achievement.unlockedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* XP Badge */}
            <div
              style={{
                padding: "3px 9px",
                background: "rgba(0,112,209,0.15)",
                border: "1px solid rgba(0,112,209,0.3)",
                backdropFilter: "blur(6px)",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#00d4ff",
                whiteSpace: "nowrap",
              }}
            >
              +{achievement.xp} XP
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <button
        style={{
          width: "100%",
          marginTop: "14px",
          padding: "9px",
          background: "rgba(245,166,35,0.08)",
          border: "1px solid rgba(245,166,35,0.2)",
          backdropFilter: "blur(8px)",
          borderRadius: "10px",
          color: "#f5a623",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 180ms ease",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(245,166,35,0.15)";
          e.currentTarget.style.borderColor = "rgba(245,166,35,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(245,166,35,0.08)";
          e.currentTarget.style.borderColor = "rgba(245,166,35,0.2)";
        }}
      >
        View All Achievements
      </button>
    </div>
  );
};

export default Achievements;
