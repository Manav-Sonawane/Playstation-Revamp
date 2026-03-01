import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Gamepad2, Clock, Play } from "lucide-react";
import { recentlyPlayedGames } from "../data/mockData.js";
import LogoImage from "./LogoImage.jsx";

const GameCard = ({ game }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: "190px",
        height: "260px",
        borderRadius: "16px",
        border: hovered
          ? `1.5px solid ${game.accentColor || "#0070d1"}80`
          : "1.5px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 280ms cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-7px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.6), 0 0 28px ${game.accentColor || "#0070d1"}30`
          : "0 4px 16px rgba(0,0,0,0.35)",
        flexShrink: 0,
      }}
    >
      {/* Poster */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${game.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)",
          zIndex: 0,
        }}
      />

      {/* Glassmorphism dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0) 10%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.92) 100%)",
          zIndex: 1,
        }}
      />

      {/* Accent glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${game.accentColor || "#0070d1"}${hovered ? "22" : "00"} 0%, transparent 65%)`,
          zIndex: 1,
          transition: "background 300ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Logo — canvas removes dark background */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "inline-flex",
          maxWidth: "130px",
        }}
      >
        <LogoImage
          src={game.logo}
          alt={game.title}
          style={{
            maxWidth: "115px",
            maxHeight: "50px",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Play button on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: game.accentColor || "#0070d1",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 24px ${game.accentColor || "#0070d1"}80`,
            animation: "popIn 220ms cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <Play size={18} fill="white" color="white" style={{ marginLeft: "2px" }} />
        </div>
      )}

      {/* Bottom info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px",
          zIndex: 2,
          background: "rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: game.accentColor || "#0070d1",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "6px",
          }}
        >
          {game.genre}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              borderRadius: "8px",
              padding: "5px 8px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Gamepad2 size={11} color="#8a9bb5" />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "12px" }}>
              {game.hoursPlayed}h
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              borderRadius: "8px",
              padding: "5px 8px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Clock size={11} color="#8a9bb5" />
            <span style={{ color: "#a0b4cc", fontSize: "11px", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {game.lastPlayed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentlyPlayed = () => {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = (dir) => {
    const el = document.getElementById("recently-played-carousel");
    const amt = 220;
    const next = dir === "left" ? scrollPos - amt : scrollPos + amt;
    el.scrollTo({ left: next, behavior: "smooth" });
    setScrollPos(next);
  };

  return (
    <section style={{ padding: "0 8px 16px 8px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", letterSpacing: "-0.3px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
          <Gamepad2 size={18} style={{ color: "#0070d1" }} />
          Recently Played
        </h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {[{ dir: "left", Icon: ChevronLeft }, { dir: "right", Icon: ChevronRight }].map(({ dir, Icon }) => (
            <button
              key={dir}
              onClick={() => handleScroll(dir)}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,112,209,0.2)";
                e.currentTarget.style.borderColor = "rgba(0,112,209,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <Icon size={18} style={{ color: "#f5a623" }} />
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div
        id="recently-played-carousel"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "6px",
        }}
      >
        {recentlyPlayedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <style>{`
        #recently-played-carousel::-webkit-scrollbar { display: none; }
        @keyframes popIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default RecentlyPlayed;
