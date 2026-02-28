import React from "react";
import { TrendingUp } from "lucide-react";
import { userStatistics } from "../data/mockData.js";

const CircularProgress = ({ value, label, hours }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div style={{ position: "relative", width: "90px", height: "90px" }}>
        <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            stroke="#1e2d45"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            stroke="url(#blueGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070d1" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#8a9bb5",
              marginBottom: "2px",
            }}
          >
            {value}%
          </div>
        </div>
      </div>

      {/* Label and hours */}
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#8a9bb5",
            textTransform: "capitalize",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#ffffff",
            marginTop: "2px",
          }}
        >
          {hours}
        </div>
      </div>
    </div>
  );
};

const Statistics = () => {
  return (
    <section
      style={{
        padding: "0 8px 16px 8px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center mb-3"
        style={{ letterSpacing: "-0.3px" }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TrendingUp size={18} style={{ color: "#0070d1" }} />
          Your Statistic
        </h2>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          background: "#141824",
          border: "1px solid #1e2d45",
          borderRadius: "12px",
          padding: "20px 16px",
          display: "flex",
          gap: "24px",
          justifyContent: "space-around",
        }}
      >
        <CircularProgress
          value={userStatistics.totalHourPlayPercent}
          label="Total Hour Play"
          hours={`${userStatistics.totalHourPlay.toLocaleString()}h`}
        />
        <CircularProgress
          value={userStatistics.fightingTimePercent}
          label="Fighting Time"
          hours={`${userStatistics.fightingTime.toLocaleString()}h`}
        />
        <CircularProgress
          value={userStatistics.defenceTimePercent}
          label="Defence Time"
          hours={`${userStatistics.defenceTime.toLocaleString()}h`}
        />
      </div>
    </section>
  );
};

export default Statistics;
