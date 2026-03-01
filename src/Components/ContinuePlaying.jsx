import React, { useState, useEffect } from "react";
import { Clock, Play } from "lucide-react";
import { continuePlayingGames } from "../data/mockData.js";
import LogoImage from "./LogoImage.jsx";

const ContinuePlaying = () => {
  const [progressWidths, setProgressWidths] = useState({});

  useEffect(() => {
    const t = setTimeout(() => {
      const widths = {};
      continuePlayingGames.forEach((g) => { widths[g.id] = g.progress; });
      setProgressWidths(widths);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ marginBottom: "0" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} style={{ color: "#0070d1" }} />
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px" }}>
            Continue Playing
          </h2>
        </div>
        <a
          href="#"
          style={{ color: "#0070d1", fontSize: "12px", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
        >
          View All
        </a>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {continuePlayingGames.map((game) => (
          <div
            key={game.id}
            style={{
              background: "rgba(10,14,26,0.6)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "all 220ms ease",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,112,209,0.4)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 14px 36px rgba(0,0,0,0.5), 0 0 20px rgba(0,112,209,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)";
            }}
          >
            {/* Poster area */}
            <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
              {game.poster && (
                <img
                  src={game.poster}
                  alt={game.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              )}
              {/* Glass gradient overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(10,14,26,0.95) 100%)",
              }} />
              {/* Logo */}
              {game.logo && (
                <div style={{ position: "absolute", bottom: "12px", left: "14px", zIndex: 2, display: "inline-flex" }}>
                  <LogoImage
                    src={game.logo}
                    alt={game.title}
                    style={{ maxHeight: "40px", maxWidth: "130px", objectFit: "contain", objectPosition: "left center", display: "block" }}
                  />
                </div>
              )}
              {/* Genre tag */}
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                color: "#8a9bb5",
                fontSize: "10px",
                padding: "3px 9px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                zIndex: 2,
              }}>
                {game.genre}
              </div>
              {/* Play overlay button */}
              <div style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "rgba(0,112,209,0.8)",
                backdropFilter: "blur(6px)",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                boxShadow: "0 2px 10px rgba(0,112,209,0.5)",
              }}>
                <Play size={13} fill="white" color="white" style={{ marginLeft: "1px" }} />
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#8a9bb5", fontSize: "11px", fontWeight: 500 }}>Progress</span>
                <span style={{ color: "#0070d1", fontSize: "12px", fontWeight: 700 }}>
                  {game.progress}%
                </span>
              </div>
              {/* Progress bar */}
              <div style={{
                height: "3px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "2px",
                overflow: "hidden",
              }}>
                <div style={{
                  width: progressWidths[game.id] ? `${progressWidths[game.id]}%` : "0%",
                  height: "100%",
                  background: "linear-gradient(90deg, #0070d1, #00d4ff)",
                  borderRadius: "2px",
                  boxShadow: "0 0 8px rgba(0,208,255,0.5)",
                  transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinuePlaying;
