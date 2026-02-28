import React, { useState, useEffect } from "react";
import { Sparkles, Star, Play } from "lucide-react";
import { heroGame } from "../data/mockData.js";

// Pre-generated star positions to avoid Math.random() during render
const STAR_POSITIONS = [
  { x: 12, y: 15, size: 1.2, opacity: 0.5 },
  { x: 25, y: 8, size: 1.8, opacity: 0.6 },
  { x: 38, y: 22, size: 1.5, opacity: 0.4 },
  { x: 45, y: 12, size: 2.1, opacity: 0.7 },
  { x: 52, y: 28, size: 1.3, opacity: 0.5 },
  { x: 61, y: 18, size: 1.9, opacity: 0.6 },
  { x: 68, y: 35, size: 1.4, opacity: 0.4 },
  { x: 75, y: 10, size: 2.3, opacity: 0.8 },
  { x: 82, y: 25, size: 1.6, opacity: 0.5 },
  { x: 88, y: 15, size: 1.7, opacity: 0.6 },
  { x: 15, y: 45, size: 1.4, opacity: 0.5 },
  { x: 28, y: 52, size: 2.0, opacity: 0.7 },
  { x: 35, y: 48, size: 1.5, opacity: 0.4 },
  { x: 42, y: 58, size: 1.8, opacity: 0.6 },
  { x: 55, y: 50, size: 1.3, opacity: 0.5 },
  { x: 65, y: 62, size: 2.2, opacity: 0.7 },
  { x: 72, y: 55, size: 1.6, opacity: 0.5 },
  { x: 85, y: 48, size: 1.9, opacity: 0.6 },
  { x: 92, y: 58, size: 1.4, opacity: 0.4 },
  { x: 8, y: 32, size: 1.7, opacity: 0.5 },
  { x: 18, y: 68, size: 1.5, opacity: 0.6 },
  { x: 32, y: 75, size: 2.1, opacity: 0.7 },
  { x: 48, y: 72, size: 1.3, opacity: 0.4 },
  { x: 58, y: 82, size: 1.8, opacity: 0.6 },
  { x: 70, y: 78, size: 1.6, opacity: 0.5 },
  { x: 78, y: 85, size: 2.0, opacity: 0.7 },
  { x: 88, y: 75, size: 1.4, opacity: 0.5 },
  { x: 5, y: 62, size: 1.9, opacity: 0.6 },
  { x: 95, y: 38, size: 1.5, opacity: 0.5 },
  { x: 50, y: 5, size: 2.2, opacity: 0.7 },
];

const HeroBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "320px",
        background: heroGame.gradient,
      }}
    >
      {/* Blue ambient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,112,209,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Star field effect */}
      <div className="absolute inset-0 z-0">
        {STAR_POSITIONS.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "white",
              borderRadius: "50%",
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #0a0e1a)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="absolute"
        style={{
          bottom: "24px",
          left: "32px",
          zIndex: 3,
          maxWidth: "640px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 500ms ease 100ms, transform 500ms ease 100ms",
        }}
      >
        {/* Badge row */}
        <div className="flex items-center gap-[10px] mb-4">
          <div className="flex items-center gap-1">
            <Sparkles size={14} style={{ color: "#0070d1" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#0070d1",
                letterSpacing: "1.5px",
              }}
            >
              AI RECOMMENDED
            </span>
          </div>
          <div
            style={{
              background: "#00e676",
              color: "#000",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {heroGame.matchPercent}% Match
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "58px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            marginBottom: "12px",
            textShadow: "0 2px 20px rgba(0, 112, 209, 0.3)",
          }}
        >
          {heroGame.title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            color: "#a0b4cc",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {heroGame.description}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-0 mb-7">
          <div className="flex items-center gap-1">
            <Star size={16} style={{ color: "#f5a623", fill: "#f5a623" }} />
            <span style={{ color: "white", fontWeight: 600 }}>
              {heroGame.rating}/5
            </span>
          </div>
          <span style={{ color: "#8a9bb5", margin: "0 10px" }}>•</span>
          <span style={{ color: "#8a9bb5" }}>{heroGame.genre}</span>
          <span style={{ color: "#8a9bb5", margin: "0 10px" }}>•</span>
          <span style={{ color: "#8a9bb5" }}>{heroGame.players}</span>
        </div>

        {/* Buttons row */}
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2"
            style={{
              background: "#0070d1",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              userSelect: "none",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0088ff";
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(0, 112, 209, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0070d1";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Play size={16} fill="white" />
            Play Now
          </button>

          <button
            style={{
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              userSelect: "none",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            Add to Library
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
