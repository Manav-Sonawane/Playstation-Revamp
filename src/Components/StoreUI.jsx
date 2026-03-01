/**
 * StoreUI.jsx — Merged PlayStation Store
 *
 * Combines:
 *  • YouTube cinematic video backgrounds + framer-motion from the Store project
 *  • Full 8-game library (Valorant, God of War, Ghost of Tsushima, FC24, GTA V, TLOU, RDR2, Cyberpunk)
 *  • Glassmorphism design language from Playstation-Revamp
 *  • LogoImage canvas processing for local logo assets (no separate sidebar — main app handles that)
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoImage from "./LogoImage.jsx";

/* ─────────────────────────────────────────────────────────────
   GAME LIBRARY — merged from Store/gameLibrary.js
   Local logos use /store-logos/ path; others use null (text fallback)
───────────────────────────────────────────────────────────── */
const gameLibrary = [
  {
    id: 1,
    title: "VALORANT",
    logo: "/store-logos/valo2.png",
    logoLocal: true,
    sub: "DEFY THE LIMITS",
    accent: "#ff4655",
    description:
      "Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities.",
    videoUrl: "https://youtu.be/e_E9W2vsRbQ?si=PMd4YpMti0eH-1Iv",
    thumb:
      "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg",
    price: "Free",
    rating: "4.7",
    reviews: "1.2M",
    platforms: ["PS5"],
    features: [
      "In-game purchases optional",
      "Online play required",
      "5v5 Tactical Shooter",
      "Free to Play",
    ],
    editions: [
      { name: "Standard Edition", price: "Free" },
      { name: "Radiant Entertainment System", price: "₹5,400" },
    ],
  },
  {
    id: 2,
    title: "GOD OF WAR",
    logo: "/store-logos/god_of_war_logo.png",
    logoLocal: true,
    sub: "RAGNARÖK",
    accent: "#c0392b",
    description:
      "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives. Together, father and son must put everything on the line as they journey to each of the Nine Realms.",
    videoUrl: "https://youtu.be/K0u_kAWLJOA?si=ny5I6aHNFkjS2Fpb",
    thumb:
      "https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S1_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67",
    price: "₹4,999",
    rating: "4.9",
    reviews: "850K",
    platforms: ["PS4", "PS5", "PS5 Pro"],
    features: [
      "Vibration function supported",
      "Trigger effect supported",
      "Offline play enabled",
      "PS5 Pro Enhanced",
    ],
    editions: [
      { name: "Standard Edition", price: "₹4,999" },
      { name: "Digital Deluxe Edition", price: "₹5,599" },
    ],
  },
  {
    id: 3,
    title: "GHOST OF TSUSHIMA",
    logo: "/store-logos/ghost.png",
    logoLocal: true,
    sub: "DIRECTOR'S CUT",
    accent: "#e67e22",
    description:
      "In the late 13th century, the Mongol empire has laid waste to entire nations. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet.",
    videoUrl: "https://youtu.be/RcWk08PBe7k?si=ecsnN_WNFULdre8l&t=1",
    thumb:
      "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
    price: "₹4,999",
    rating: "4.9",
    reviews: "1.1M",
    platforms: ["PS4", "PS5"],
    features: [
      "Vibration & trigger effect",
      "PS5 Pro Enhanced",
      "Remote Play supported",
      "Offline play enabled",
    ],
    editions: [
      { name: "Standard Edition", price: "₹3,999" },
      { name: "Director's Cut", price: "₹4,999" },
    ],
  },
  {
    id: 4,
    title: "EA SPORTS FC 24",
    logo: "/store-logos/fifa.png",
    logoLocal: true,
    sub: "THE WORLD'S GAME",
    accent: "#27ae60",
    description:
      "Built on innovation and authenticity, feel closer to the game in the most true-to-football experience ever. New HyperMotionV technology captures the motion of the world's best players.",
    videoUrl: "https://youtu.be/XhP3Xh4LMA8?si=Gmkaeeq6UoHp3qFw",
    thumb:
      "https://i.ytimg.com/vi_webp/qotjZp0VlQc/maxresdefault.webp",
    price: "₹4,499",
    rating: "4.2",
    reviews: "500K",
    platforms: ["PS4", "PS5"],
    features: [
      "In-game purchases optional",
      "Online play enabled",
      "1-4 players",
      "HyperMotionV Technology",
    ],
    editions: [
      { name: "Standard Edition", price: "₹4,499" },
      { name: "Ultimate Edition", price: "₹6,499" },
    ],
  },
  {
    id: 5,
    title: "GTA V",
    logo: "/store-logos/gta.png",
    logoLocal: true,
    sub: "PREMIUM EDITION",
    accent: "#8e44ad",
    description:
      "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with the criminal underworld, they must pull off a series of dangerous heists to survive.",
    videoUrl: "https://youtu.be/QkkoHAzjnUs?si=cLtMbihyBnAirX4z&t=7",
    thumb:
      "https://cdn1.epicgames.com/offer/b0cd075465c44f87be3b505ac04a2e46/EGS_GrandTheftAutoVEnhanced_RockstarNorth_S1_2560x1440-906d8ae76a91aafc60b1a54c23fab496",
    price: "₹2,320",
    rating: "4.8",
    reviews: "2.5M",
    platforms: ["PS4", "PS5"],
    features: [
      "Online play enabled",
      "In-game purchases optional",
      "Remote Play supported",
      "Offline play enabled",
    ],
    editions: [
      { name: "Premium Edition", price: "₹2,320" },
      { name: "Premium + Shark Card", price: "₹3,200" },
    ],
  },
  {
    id: 6,
    title: "THE LAST OF US",
    logo: "/store-logos/los.png",
    logoLocal: true,
    sub: "PART I",
    accent: "#d4a017",
    description:
      "In a ravaged civilization, where infected and hardened survivors run rampant, Joel is hired to smuggle 14-year-old Ellie out of a military quarantine zone. A story of love and survival.",
    videoUrl: "https://youtu.be/W01L70IGBgE?si=ayxRvymWA2Px6IfC&t=11",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI9NgrzenVgpHMZbUEEKbFnWEBU85X2LivIg&s",
    price: "₹4,999",
    rating: "4.9",
    reviews: "400K",
    platforms: ["PS5"],
    features: [
      "Vibration function supported",
      "Trigger effect supported",
      "Offline play enabled",
      "Haptic feedback",
    ],
    editions: [
      { name: "Standard Edition", price: "₹4,999" },
      { name: "Digital Deluxe Edition", price: "₹5,599" },
    ],
  },
  {
    id: 7,
    title: "RED DEAD II",
    logo: "/store-logos/rdr2.png",
    logoLocal: true,
    sub: "OUTLAWS FOR LIFE",
    accent: "#8b4513",
    description:
      "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. The gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
    videoUrl: "https://youtu.be/gmA6MrX81z4?si=6EveTBmxxG2u77A0&t=7",
    thumb:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGOyLZWVFX8iEr2-UYCUIT-OIxGNGE9_feA&s",
    price: "₹4,000",
    rating: "4.9",
    reviews: "1.5M",
    platforms: ["PS4"],
    features: [
      "Offline play enabled",
      "Online play enabled",
      "Remote Play supported",
      "Award-winning story",
    ],
    editions: [
      { name: "Standard Edition", price: "₹4,000" },
      { name: "Ultimate Edition", price: "₹5,200" },
    ],
  },
  {
    id: 8,
    title: "CYBERPUNK",
    logo: "/store-logos/cp.png",
    logoLocal: true,
    sub: "PHANTOM LIBERTY",
    accent: "#f0e040",
    description:
      "Phantom Liberty is a spy-thriller adventure for Cyberpunk 2077. Return as cyber-enhanced mercenary V and embark on a high-stakes mission of espionage and intrigue in a brand new district.",
    videoUrl: "https://youtu.be/8X2kIfS6fb8?si=MHuyhANyGvDDW4rf&t=2",
    thumb:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7",
    price: "₹2,999",
    rating: "4.6",
    reviews: "600K",
    platforms: ["PS5"],
    features: [
      "Vibration function supported",
      "Trigger effect supported",
      "PS5 Pro Enhanced",
      "Offline play enabled",
    ],
    editions: [
      { name: "Phantom Liberty DLC", price: "₹1,799" },
      { name: "Ultimate Edition", price: "₹4,299" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
const getYouTubeId = (url) => {
  const m = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return m && m[2].length === 11 ? m[2] : null;
};
const getYouTubeStart = (url) => {
  const m = url.match(/[?&](t|start)=(\d+)/);
  return m ? m[2] : 0;
};

/* ─────────────────────────────────────────────────────────────
   GameLogo — renders text title OR local logo via LogoImage
───────────────────────────────────────────────────────────── */
const GameLogo = ({ game, sizeClass = "large" }) => {
  const sizes = {
    large: { fontSize: "80px", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1 },
    medium: { fontSize: "48px", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 },
    small: { fontSize: "13px", fontWeight: 800, letterSpacing: "0.5px", lineHeight: 1.2, textAlign: "center" },
  };
  const logoSizes = {
    large: { maxHeight: "110px", maxWidth: "340px" },
    medium: { maxHeight: "72px", maxWidth: "220px" },
    small: { maxHeight: "32px", maxWidth: "120px" },
  };

  if (game.logoLocal && game.logo) {
    return (
      <LogoImage
        src={game.logo}
        alt={game.title}
        style={{ ...logoSizes[sizeClass], objectFit: "contain", display: "block" }}
      />
    );
  }

  return (
    <div style={{ ...sizes[sizeClass], color: "#fff", textTransform: "uppercase", textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}>
      {game.title}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   STORE COMPONENT
───────────────────────────────────────────────────────────── */
const StoreUI = () => {
  const n = gameLibrary.length;
  const [displayIdx, setDisplayIdx] = useState(n); // start at middle copy
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDeepDive, setIsDeepDive] = useState(false);
  const [cartNotif, setCartNotif] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  const cardW = 228;
  const gap = 16;
  const totalW = cardW + gap;

  const extendedLibrary = [...gameLibrary, ...gameLibrary, ...gameLibrary];
  const activeRealIdx = displayIdx % n;
  const activeGame = gameLibrary[activeRealIdx];
  const videoId = getYouTubeId(activeGame.videoUrl);
  const videoStart = getYouTubeStart(activeGame.videoUrl);
  const navigate = useNavigate();

  /* Infinite carousel reset */
  const handleAnimComplete = () => {
    if (displayIdx >= n * 2) {
      setIsTransitioning(false);
      setDisplayIdx(displayIdx - n);
    } else if (displayIdx < n) {
      setIsTransitioning(false);
      setDisplayIdx(displayIdx + n);
    }
  };
  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  const prev = () => setDisplayIdx((i) => i - 1);
  const next = () => setDisplayIdx((i) => i + 1);

  const addToCart = () => {
    setCartNotif(true);
    setTimeout(() => setCartNotif(false), 2200);
  };
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  /* ── PS Button SVG Icons ── */
  const CrossIcon = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  const CircleIcon = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.5" />
    </svg>
  );
  const TriangleIcon = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4L21 20H3L12 4Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
  const SquareIcon = ({ size = 16, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2.5" />
    </svg>
  );

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        userSelect: "none",
      }}
    >
      {/* ── 1. YOUTUBE VIDEO BACKGROUND ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#000", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRealIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <iframe
              style={{
                position: "absolute",
                /*
                 * Anchor to the RIGHT edge. The store background container fills
                 * the content area (viewport - 72px sidebar). The video should be
                 * visible on the right side where the gradient overlay is transparent.
                 *
                 * - Width: 100% of the container (full content area)
                 * - Height: 56.25vw ensures 16:9 at full viewport width
                 * - right: 0 / top: 50% / translateY(-50%) centers it vertically
                 *   and anchors right edge to the container's right edge
                 */
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                minHeight: "56.25vw",
                height: "100%",
                pointerEvents: "none",
                border: "none",
              }}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=${videoStart}`}
              allow="autoplay; encrypted-media"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.65) 45%, rgba(5,5,5,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 30%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 0% 50%, ${activeGame.accent}18 0%, transparent 55%)`, transition: "background 1.4s ease" }} />
      </div>

      {/* ── 2. CONTENT AREA ── */}
      <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {!isDeepDive ? (
            /* ── BROWSE VIEW ── */
            <motion.div
              key="browse"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              style={{ padding: "60px 0 0 64px", maxWidth: "640px" }}
            >
              {/* Accent bar */}
              <motion.div
                key={`accent-${activeRealIdx}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{
                  width: "48px", height: "4px",
                  background: activeGame.accent,
                  borderRadius: "2px",
                  originX: 0,
                  marginBottom: "24px",
                  boxShadow: `0 0 16px ${activeGame.accent}80`,
                }}
              />

              {/* Logo / Title */}
              <motion.div
                key={`logo-${activeRealIdx}`}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{ marginBottom: "12px" }}
              >
                <GameLogo game={activeGame} sizeClass="large" />
              </motion.div>

              {/* Subtitle */}
              {activeGame.sub && (
                <motion.p
                  key={`sub-${activeRealIdx}`}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.55 }}
                  transition={{ delay: 0.18 }}
                  style={{ fontSize: "14px", letterSpacing: "0.4em", fontWeight: 300, textTransform: "uppercase", marginBottom: "20px" }}
                >
                  {activeGame.sub}
                </motion.p>
              )}

              {/* Description */}
              <motion.p
                key={`desc-${activeRealIdx}`}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                style={{ fontSize: "14px", lineHeight: 1.7, color: "#a0b4cc", maxWidth: "480px", marginBottom: "32px" }}
              >
                {activeGame.description}
              </motion.p>

              {/* Price + Buttons */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.32 }}
                style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
              >
                <div style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px" }}>
                  {activeGame.price}
                </div>

                <button
                  onClick={() => setIsDeepDive(true)}
                  style={{
                    padding: "12px 32px",
                    background: activeGame.accent,
                    border: "none",
                    borderRadius: "30px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    boxShadow: `0 6px 24px ${activeGame.accent}55`,
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 10px 32px ${activeGame.accent}80`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 6px 24px ${activeGame.accent}55`; }}
                >
                  View Details
                </button>

                <button
                  onClick={() => toggleWishlist(activeGame.id)}
                  style={{
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    background: wishlist.has(activeGame.id) ? "rgba(255,80,80,0.2)" : "rgba(255,255,255,0.08)",
                    border: wishlist.has(activeGame.id) ? "1px solid rgba(255,80,80,0.5)" : "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 200ms ease",
                  }}
                >
                  <Heart size={18} fill={wishlist.has(activeGame.id) ? "#ff5050" : "none"} color={wishlist.has(activeGame.id) ? "#ff5050" : "#8a9bb5"} />
                </button>
              </motion.div>

              {/* Platforms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ display: "flex", gap: "8px", marginTop: "24px" }}
              >
                {activeGame.platforms.map((p) => (
                  <span
                    key={p}
                    style={{
                      padding: "4px 12px",
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.8px",
                      color: "#c0d0e0",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "16px" }}
              >
                <Star size={14} fill={activeGame.accent} color={activeGame.accent} />
                <span style={{ fontSize: "15px", fontWeight: 700 }}>{activeGame.rating}</span>
                <span style={{ fontSize: "12px", color: "#8a9bb5" }}>({activeGame.reviews} ratings)</span>
              </motion.div>
            </motion.div>
          ) : (
            /* ── DEEP-DIVE VIEW ── */
            <motion.div
              key="deepdive"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{
                flex: 1,
                overflowY: "auto",
                background: "rgba(5,5,5,0.55)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                scrollbarWidth: "none",
              }}
            >
              {/* Back button */}
              <div style={{ position: "sticky", top: 0, zIndex: 50, padding: "24px 64px 16px", background: "linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)" }}>
                <button
                  onClick={() => setIsDeepDive(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "none", border: "none", color: "#8a9bb5",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    transition: "color 150ms ease",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#8a9bb5"; }}
                >
                  <ChevronLeft size={16} />
                  Back to Store
                </button>
              </div>

              {/* Details */}
              <div style={{ padding: "0 64px 80px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "40px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    paddingBottom: "40px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Left: Info */}
                  <div style={{ maxWidth: "460px" }}>
                    <div style={{ marginBottom: "20px" }}>
                      <GameLogo game={activeGame} sizeClass="medium" />
                    </div>

                    {/* Platforms */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {activeGame.platforms.map((p) => (
                        <span
                          key={p}
                          style={{
                            padding: "4px 14px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "20px",
                            fontSize: "10px", fontWeight: 700, letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
                      <Star size={16} fill={activeGame.accent} color={activeGame.accent} />
                      <span style={{ fontSize: "20px", fontWeight: 800 }}>{activeGame.rating}</span>
                      <span style={{ fontSize: "13px", color: "#8a9bb5" }}>· {activeGame.reviews} ratings</span>
                    </div>

                    {/* Price */}
                    <div
                      style={{
                        fontSize: "36px",
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        marginBottom: "28px",
                        color: activeGame.price === "Free" ? "#00e676" : "#fff",
                      }}
                    >
                      {activeGame.price}
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        onClick={addToCart}
                        style={{
                          flex: 1, padding: "14px 0",
                          background: activeGame.accent,
                          border: "none", borderRadius: "30px",
                          color: "#fff", fontSize: "14px", fontWeight: 700,
                          cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                          boxShadow: `0 6px 24px ${activeGame.accent}55`,
                          transition: "all 200ms ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(activeGame.id)}
                        style={{
                          width: "52px", height: "52px", borderRadius: "50%",
                          background: wishlist.has(activeGame.id) ? "rgba(255,80,80,0.15)" : "rgba(255,255,255,0.07)",
                          border: wishlist.has(activeGame.id) ? "1px solid rgba(255,80,80,0.4)" : "1px solid rgba(255,255,255,0.12)",
                          backdropFilter: "blur(8px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", transition: "all 200ms ease",
                        }}
                      >
                        <Heart size={20} fill={wishlist.has(activeGame.id) ? "#ff5050" : "none"} color={wishlist.has(activeGame.id) ? "#ff5050" : "#8a9bb5"} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Features */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px", alignSelf: "flex-end", paddingBottom: "4px", minWidth: "280px" }}>
                    {activeGame.features.map((f) => (
                      <div key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: "28px", height: "28px", borderRadius: "8px",
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}
                        >
                          <Info size={13} color="#8a9bb5" />
                        </div>
                        <span style={{ fontSize: "12px", color: "#a0b4cc", lineHeight: 1.5, paddingTop: "4px" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editions */}
                <div style={{ marginTop: "40px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", color: "#8a9bb5", textTransform: "uppercase", marginBottom: "20px" }}>
                    Select Edition
                  </p>
                  <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
                    {activeGame.editions.map((ed, i) => (
                      <div
                        key={ed.name}
                        style={{
                          minWidth: "260px", maxWidth: "280px",
                          padding: "20px",
                          background: i === 0 ? "rgba(255,255,255,0.05)" : `${activeGame.accent}18`,
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${i === 0 ? "rgba(255,255,255,0.08)" : `${activeGame.accent}50`}`,
                          borderRadius: "16px",
                          cursor: "pointer",
                          transition: "all 220ms ease",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = activeGame.accent;
                          e.currentTarget.style.background = `${activeGame.accent}25`;
                          e.currentTarget.style.transform = "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = i === 0 ? "rgba(255,255,255,0.08)" : `${activeGame.accent}50`;
                          e.currentTarget.style.background = i === 0 ? "rgba(255,255,255,0.05)" : `${activeGame.accent}18`;
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: "16/9",
                            background: `linear-gradient(135deg, ${activeGame.accent}30, rgba(255,255,255,0.04))`,
                            borderRadius: "10px",
                            marginBottom: "14px",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <img
                            src={activeGame.thumb}
                            alt={ed.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        </div>
                        <p style={{ fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                          {ed.name}
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 900, color: i === 0 ? "#fff" : activeGame.accent }}>
                          {ed.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 3. BOTTOM CAROUSEL ── */}
      {!isDeepDive && (
        <div style={{ position: "relative", zIndex: 10, paddingBottom: "20px" }}>
          {/* Nav arrows */}
          <div style={{ position: "absolute", right: "64px", bottom: "calc(100% + 8px)", display: "flex", gap: "10px" }}>
            {[{ fn: prev, Icon: ChevronLeft }, { fn: next, Icon: ChevronRight }].map(({ fn, Icon }, i) => (
              <button
                key={i}
                onClick={fn}
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <Icon size={18} color="#fff" />
              </button>
            ))}
          </div>

          {/* Section label */}
          <p style={{ padding: "0 64px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "14px" }}>
            Must See
          </p>

          {/* Infinite sliding cards */}
          <div style={{ paddingLeft: "64px", overflow: "visible" }}>
            <motion.div
              style={{ display: "flex", gap: `${gap}px` }}
              animate={{ x: -(displayIdx * totalW) }}
              onAnimationComplete={handleAnimComplete}
              transition={isTransitioning ? { type: "spring", stiffness: 200, damping: 26 } : { duration: 0 }}
            >
              {extendedLibrary.map((game, i) => {
                const isActive = i === displayIdx;
                return (
                  <div
                    key={`${game.id}-${i}`}
                    onClick={() => setDisplayIdx(i)}
                    style={{
                      flexShrink: 0,
                      width: `${cardW}px`,
                      height: "130px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: isActive ? `2px solid ${game.accent}` : "2px solid rgba(255,255,255,0.06)",
                      boxShadow: isActive ? `0 0 28px ${game.accent}55` : "none",
                      transform: isActive ? "scale(1.07)" : "scale(1)",
                      opacity: isActive ? 1 : 0.45,
                      filter: isActive ? "none" : "grayscale(30%)",
                      transition: "opacity 300ms ease, filter 300ms ease, transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.75"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.45"; }}
                  >
                    <img
                      src={game.thumb}
                      alt={game.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.display = "none"; }}
                    />
                    {/* Card overlay label */}
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        background: isActive ? `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)` : "rgba(0,0,0,0.25)",
                        display: "flex", alignItems: "flex-end", justifyContent: "center",
                        padding: "10px",
                        transition: "background 300ms ease",
                      }}
                    >
                      <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", textAlign: "center" }}>
                        {game.title}
                      </span>
                    </div>

                    {/* Accent glow line */}
                    {isActive && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: "3px",
                        background: game.accent,
                        boxShadow: `0 0 12px ${game.accent}`,
                      }} />
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Cart notification toast ── */}
      <AnimatePresence>
        {cartNotif && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: "fixed", bottom: "32px", right: "32px", zIndex: 999,
              background: "rgba(10,14,26,0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,112,209,0.35)",
              borderRadius: "14px",
              padding: "14px 20px",
              display: "flex", alignItems: "center", gap: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              fontSize: "14px", fontWeight: 600,
            }}
          >
            <ShoppingCart size={18} color="#0070d1" />
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default StoreUI;
