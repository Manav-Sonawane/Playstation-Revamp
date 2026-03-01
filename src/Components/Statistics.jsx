import React, { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { userStatistics } from "../data/mockData.js";

const CircularStat = ({ value, label, hours, color = "#0070d1", gradientId }) => {
  const radius = 38;
  const stroke = 7;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const circleRef = useRef(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    el.style.strokeDashoffset = circ;
    const t = setTimeout(() => {
      el.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)";
      el.style.strokeDashoffset = offset;
    }, 100);
    return () => clearTimeout(t);
  }, [circ, offset]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 8px",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 220ms ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* SVG ring */}
      <div style={{ position: "relative", width: "96px", height: "96px" }}>
        <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx="48" cy="48" r={radius}
            stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} fill="none"
          />
          {/* Progress */}
          <circle
            ref={circleRef}
            cx="48" cy="48" r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ}
          />
        </svg>

        {/* Center: % badge */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}>
          <div style={{
            background: `${color}22`,
            border: `1px solid ${color}55`,
            borderRadius: "20px",
            padding: "2px 7px",
            fontSize: "11px",
            fontWeight: 700,
            color: color,
          }}>
            +{value}%
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        fontSize: "11px",
        color: "#8a9bb5",
        marginTop: "10px",
        textTransform: "capitalize",
        textAlign: "center",
        letterSpacing: "0.2px",
      }}>
        {label}
      </div>

      {/* Value */}
      <div style={{
        fontSize: "18px",
        fontWeight: 800,
        color: "#ffffff",
        marginTop: "3px",
        letterSpacing: "-0.5px",
      }}>
        {hours}
      </div>
    </div>
  );
};

const Statistics = () => {
  return (
    <section style={{ padding: "0 8px 16px 8px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
        letterSpacing: "-0.3px",
      }}>
        <TrendingUp size={18} style={{ color: "#0070d1" }} />
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
          Your Statistic
        </h2>
      </div>

      {/* Card */}
      <div
        style={{
          background: "rgba(10,14,26,0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px",
          display: "flex",
          gap: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <CircularStat
          value={userStatistics.totalHourPlayPercent}
          label="Total Hour Play"
          hours={`${userStatistics.totalHourPlay.toLocaleString()}h`}
          color="#0070d1"
          gradientId="grad-total"
        />
        <CircularStat
          value={userStatistics.fightingTimePercent}
          label="Fighting Time"
          hours={`${userStatistics.fightingTime.toLocaleString()}h`}
          color="#f5a623"
          gradientId="grad-fight"
        />
        <CircularStat
          value={userStatistics.defenceTimePercent}
          label="Defence Time"
          hours={`${userStatistics.defenceTime.toLocaleString()}h`}
          color="#00e676"
          gradientId="grad-def"
        />
      </div>
    </section>
  );
};

export default Statistics;
