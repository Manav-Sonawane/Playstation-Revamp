import React from "react";
import { Trophy, Award } from "lucide-react";
import { recentAchievements } from "../data/mockData.js";

const Achievements = () => {
  return (
    <div
      style={{
        width: "300px",
        minWidth: "280px",
      }}
    >
      {/* Achievements Card */}
      <div
        style={{
          background: "#141824",
          border: "1px solid #1e2d45",
          borderRadius: "16px",
          padding: "20px",
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
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              letterSpacing: "-0.3px",
            }}
          >
            <Award size={18} style={{ color: "#0070d1" }} />
            Recent Achievements
          </h3>
        </div>

        {/* Achievements List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                background: "rgba(10, 14, 26, 0.4)",
                border: "1px solid #1e2d45",
                borderRadius: "10px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0070d1";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e2d45";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, #f5a623 0%, #ff8c00 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Trophy size={22} style={{ color: "#ffffff" }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#ffffff",
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {achievement.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#8a9bb5",
                  }}
                >
                  {new Date(achievement.unlockedDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </div>
              </div>

              {/* XP Badge */}
              <div
                style={{
                  padding: "4px 10px",
                  background: "rgba(0, 112, 209, 0.15)",
                  border: "1px solid rgba(0, 112, 209, 0.3)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#0070d1",
                  whiteSpace: "nowrap",
                }}
              >
                +{achievement.xp} XP
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "10px",
            background: "rgba(0, 112, 209, 0.1)",
            border: "1px solid #1e2d45",
            borderRadius: "8px",
            color: "#0070d1",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 112, 209, 0.2)";
            e.currentTarget.style.borderColor = "#0070d1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 112, 209, 0.1)";
            e.currentTarget.style.borderColor = "#1e2d45";
          }}
        >
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default Achievements;
