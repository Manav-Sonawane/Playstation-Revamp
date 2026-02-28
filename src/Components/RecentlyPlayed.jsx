import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";
import { recentlyPlayedGames } from "../data/mockData.js";

const RecentlyPlayed = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById("recently-played-carousel");
    const scrollAmount = 350;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  return (
    <section
      style={{
        padding: "0 8px 16px 8px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3"
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
          <Gamepad2 size={18} style={{ color: "#0070d1" }} />
          Recently Played
        </h2>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#141824",
              border: "1px solid #1e2d45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e2d45";
              e.currentTarget.style.borderColor = "#0070d1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#141824";
              e.currentTarget.style.borderColor = "#1e2d45";
            }}
          >
            <ChevronLeft size={20} style={{ color: "#f5a623" }} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#141824",
              border: "1px solid #1e2d45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e2d45";
              e.currentTarget.style.borderColor = "#0070d1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#141824";
              e.currentTarget.style.borderColor = "#1e2d45";
            }}
          >
            <ChevronRight size={20} style={{ color: "#f5a623" }} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        id="recently-played-carousel"
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {recentlyPlayedGames.map((game) => (
          <div
            key={game.id}
            style={{
              minWidth: "260px",
              height: "240px",
              background: game.gradient,
              borderRadius: "12px",
              border: "1px solid #1e2d45",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0070d1";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1e2d45";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                right: "-20%",
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle, rgba(0,112,209,0.2) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#f5a623",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {game.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8a9bb5",
                  marginTop: "4px",
                }}
              >
                {game.genre}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                gap: "12px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "rgba(20, 24, 36, 0.6)",
                  borderRadius: "6px",
                  padding: "8px 10px",
                  border: "1px solid rgba(30, 45, 69, 0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: "#8a9bb5",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Hours Played
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginTop: "2px",
                  }}
                >
                  {game.hoursPlayed}h
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(20, 24, 36, 0.6)",
                  borderRadius: "6px",
                  padding: "8px 10px",
                  border: "1px solid rgba(30, 45, 69, 0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: "#8a9bb5",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Last Played
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff",
                    marginTop: "2px",
                  }}
                >
                  {game.lastPlayed}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          #recently-played-carousel::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default RecentlyPlayed;
