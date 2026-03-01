import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredGames } from "../data/mockData.js";
import LogoImage from "./LogoImage.jsx";

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const activeIndexRef = useRef(0); // keep ref in sync for interval closure
  const isTransitioningRef = useRef(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const activeGame = featuredGames[activeIndex];

  // Animate content in on mount
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const switchGame = useCallback((index) => {
    if (index === activeIndexRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setContentVisible(false);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      isTransitioningRef.current = false;
      setTimeout(() => setContentVisible(true), 80);
    }, 550);
  }, []);

  const goNext = useCallback(() => {
    const next = (activeIndexRef.current + 1) % featuredGames.length;
    switchGame(next);
  }, [switchGame]);

  const goPrev = useCallback(() => {
    const prev =
      (activeIndexRef.current - 1 + featuredGames.length) %
      featuredGames.length;
    switchGame(prev);
  }, [switchGame]);

  // Auto-rotate — stable interval, no deps needed since we use refs
  useEffect(() => {
    intervalRef.current = setInterval(goNext, 6000);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [goNext]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "380px",
        overflow: "hidden",
      }}
    >
      {/* ── Background Poster Layers (crossfade) ── */}
      {featuredGames.map((game, i) => (
        <div
          key={game.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${game.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Dark directional gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: activeGame.overlayGradient,
          zIndex: 1,
          transition: "background 700ms ease",
        }}
      />

      {/* ── Bottom fade into page background ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "150px",
          background: "linear-gradient(to bottom, transparent, #0a0e1a)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ── Accent colour glow (top-left) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "500px",
          height: "380px",
          background: `radial-gradient(circle at 15% 50%, ${activeGame.accentColor}25 0%, transparent 65%)`,
          zIndex: 1,
          transition: "background 700ms ease",
          pointerEvents: "none",
        }}
      />

      {/* ── Content (left side) ── */}
      <div
        style={{
          position: "absolute",
          bottom: "34px",
          left: "36px",
          zIndex: 4,
          maxWidth: "520px",
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 450ms ease, transform 450ms ease",
        }}
      >
        {/* Game Logo — canvas strips dark background */}
        <div style={{ marginBottom: "12px", minHeight: "72px", display: "flex", alignItems: "flex-end" }}>
          <LogoImage
            src={activeGame.logo}
            alt={activeGame.title}
            style={{
              maxHeight: "72px",
              maxWidth: "280px",
              objectFit: "contain",
              objectPosition: "left bottom",
              display: "block",
            }}
          />
        </div>

        {/* Rating · Genre · Players · Match */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Star size={13} style={{ color: "#f5a623", fill: "#f5a623" }} />
            <span style={{ color: "white", fontWeight: 700, fontSize: "13px" }}>
              {activeGame.rating}
            </span>
          </div>
          <span style={{ color: "#4a6080", margin: "0 8px" }}>•</span>
          <span style={{ color: "#b0c4d8", fontSize: "13px" }}>
            {activeGame.genre}
          </span>
          <span style={{ color: "#4a6080", margin: "0 8px" }}>•</span>
          <span style={{ color: "#b0c4d8", fontSize: "13px" }}>
            {activeGame.players}
          </span>
          <span
            style={{
              marginLeft: "12px",
              background: "rgba(0,230,118,0.15)",
              color: "#00e676",
              border: "1px solid rgba(0,230,118,0.3)",
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 9px",
              borderRadius: "20px",
              letterSpacing: "0.3px",
            }}
          >
            {activeGame.matchPercent}% Match
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            color: "#8aa4bf",
            lineHeight: 1.7,
            marginBottom: "22px",
            maxWidth: "460px",
          }}
        >
          {activeGame.description}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: activeGame.accentColor,
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "11px 26px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "filter 200ms ease, transform 200ms ease",
              boxShadow: `0 4px 22px ${activeGame.accentColor}55`,
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.18)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Play size={15} fill="white" />
            Play Now
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.07)",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderRadius: "10px",
              padding: "11px 26px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 200ms ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.13)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <Plus size={15} />
            Add to Library
          </button>
        </div>
      </div>

      {/* ── Game Selector Thumbnail Cards (bottom-right) ── */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          right: "28px",
          display: "flex",
          gap: "10px",
          zIndex: 4,
        }}
      >
        {featuredGames.map((game, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={game.id}
              onClick={() => switchGame(i)}
              style={{
                width: "94px",
                height: "62px",
                borderRadius: "9px",
                overflow: "hidden",
                border: isActive
                  ? `2.5px solid ${game.accentColor}`
                  : "2.5px solid rgba(255,255,255,0.18)",
                cursor: "pointer",
                position: "relative",
                transition: "all 250ms ease",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                boxShadow: isActive
                  ? `0 0 18px ${game.accentColor}55`
                  : "0 2px 10px rgba(0,0,0,0.5)",
                padding: 0,
                background: "#0a0e1a",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {/* Mini poster */}
              <img
                src={game.poster}
                alt={game.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              {/* Dimming overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isActive
                    ? "rgba(0,0,0,0.15)"
                    : "rgba(0,0,0,0.52)",
                  transition: "background 250ms ease",
                  zIndex: 1,
                }}
              />
              {/* Game name label (fallback since logos may be complex) */}
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zIndex: 2,
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  textShadow: "0 1px 4px rgba(0,0,0,1)",
                  padding: "0 4px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {game.title}
              </div>
              {/* Active indicator bar */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: game.accentColor,
                    zIndex: 3,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Prev Arrow ── */}
      <button
        onClick={goPrev}
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 200ms ease",
          backdropFilter: "blur(8px)",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.8)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.5)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronLeft size={20} color="white" />
      </button>

      {/* ── Next Arrow ── */}
      <button
        onClick={goNext}
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 200ms ease",
          backdropFilter: "blur(8px)",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.8)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.5)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronRight size={20} color="white" />
      </button>

      {/* ── Progress Dots ── */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          zIndex: 4,
        }}
      >
        {featuredGames.map((_, i) => (
          <button
            key={i}
            onClick={() => switchGame(i)}
            style={{
              width: i === activeIndex ? "24px" : "7px",
              height: "7px",
              borderRadius: "4px",
              background:
                i === activeIndex
                  ? activeGame.accentColor
                  : "rgba(255,255,255,0.28)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                i === activeIndex
                  ? `0 0 8px ${activeGame.accentColor}`
                  : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
