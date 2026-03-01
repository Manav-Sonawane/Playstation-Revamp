import React from "react";
import { Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";
import { personalizedGames } from "../data/mockData.js";
import LogoImage from "./LogoImage.jsx";


const PersonalizedSection = () => {
  return (
    <section style={{ marginBottom: "32px" }}>
      {/* HEADER */}
      <div
        className="flex items-center"
        style={{ gap: "8px", marginBottom: "20px" }}
      >
        <Sparkles size={18} style={{ color: "#0070d1" }} />
        <h2
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
          }}
        >
          Personalized For You
        </h2>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {personalizedGames.map((game) => (
          <div
            key={game.id}
            style={{
              background: "#141824",
              borderRadius: "14px",
              padding: "16px",
              border: "1px solid #1e2d45",
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              gap: "16px",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0070d1";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0, 112, 209, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1e2d45";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* THUMBNAIL */}
            <div
              style={{
                width: "140px",
                height: "100px",
                flexShrink: 0,
                background: game.gradient,
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {game.poster && (
                <img
                  src={game.poster}
                  alt={game.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              )}
              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.6))",
                }}
              />
              {game.logo && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "8px",
                    right: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <LogoImage
                    src={game.logo}
                    alt={game.title}
                    style={{
                      maxHeight: "32px",
                      maxWidth: "110px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* TOP ROW */}
              <div>
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "6px" }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {game.title}
                  </h3>
                  <div
                    style={{
                      background: "rgba(0, 230, 118, 0.15)",
                      color: "#00e676",
                      border: "1px solid rgba(0, 230, 118, 0.3)",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "20px",
                    }}
                  >
                    {game.matchPercent}% Match
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#8a9bb5",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  {game.description}
                </p>
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-[6px]">
                  <Star
                    size={13}
                    style={{ color: "#f5a623", fill: "#f5a623" }}
                  />
                  <span
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {game.rating}
                  </span>
                  <span style={{ color: "#8a9bb5", fontSize: "12px" }}>•</span>
                  <span style={{ color: "#8a9bb5", fontSize: "12px" }}>
                    {game.genre}
                  </span>
                </div>

                {/* Right */}
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "15px",
                  }}
                >
                  ${game.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalizedSection;
