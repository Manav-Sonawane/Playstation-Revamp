/**
 * HomeDashboard.jsx — PS5-style home screen
 *
 * Layout (matches reference screenshot):
 *  ┌──────────────────────────────────────────────────┐
 *  │  [Transparent top bar: Games | Media    🔍 ⚙️ 👤]│
 *  │  [Game carousel row — floating cards]             │
 *  │                                                   │
 *  │        [Full-screen game poster bg]               │
 *  │                                                   │
 *  │  [Game logo + Play btn]      [Progress | Trophies]│
 *  │  [Friends/Chat panel]                             │
 *  └──────────────────────────────────────────────────┘
 *
 * PlayStation button icons (△□○✕) used as decorative/section icons.
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { featuredGames, recentlyPlayedGames, onlineFriends, recentAchievements, userProfile } from "../data/mockData.js";
import LogoImage from "./LogoImage.jsx";
import { useDualSenseWS } from "./Anikator/useDualSenseWS";

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

/* PS Logo */
const PSLogoMini = () => (
    <svg width="28" height="20" viewBox="0 0 100 70" fill="white">
        <path d="M38.5 0v54.3l13.3 4.5V13.6c0-2.8 1.2-4 3-3.4 2.1.7 2.6 2.8 2.6 5.6v10.1c9.8 3.4 17.3 0 17.3-14-.1-13.4-8.4-18.6-19.5-14.1L38.5 0zM38.5 55.9L17.7 63.7l14.6-5.7v-9L4 60.2C-1.4 62.3.4 67.8 8 70c7.9 2.3 17.3 1.8 25-1.2L38.5 66v-10.1zM83.5 27.7c-7.9-2.3-17.3-1.8-25 1.2L38.5 31.7v9.2l21.1-7.9c2.8-1 5.2-.2 5.2 2.8 0 2.8-2 4.8-5.2 5.8L38.5 47.4v10.1l16.5-6.8c12.9-5.3 28.5-15.1 28.5-23z" />
    </svg>
);

/* Settings gear */
const GearIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

/* Search icon */
const SearchIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

/* ── Game Card for top carousel ── */
const GameCard = ({ game, isActive, onClick }) => (
    <div
        onClick={onClick}
        style={{
            flexShrink: 0,
            width: isActive ? "180px" : "115px",
            height: isActive ? "105px" : "65px",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
            border: isActive ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.15)",
            boxShadow: isActive ? "0 4px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15)" : "0 2px 12px rgba(0,0,0,0.5)",
            transform: isActive ? "translateY(-6px)" : "translateY(0) scale(1)",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            marginRight: "4px"
        }}
        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; e.currentTarget.style.borderColor = "rgba(0,112,209,0.8)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,112,209,0.5)"; } }}
        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.5)"; } }}
    >
        <img src={game.poster} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {isActive && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)", display: "flex", alignItems: "flex-end", padding: "6px 8px" }}>
                <span style={{ fontSize: "9px", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{game.title}</span>
            </div>
        )}
    </div>
);

/* ── Friends Panel (bottom-left floating) ── */
const FriendsPanelOverlay = () => {
    const online = onlineFriends.filter(f => f.status === "online" || f.status === "in-game");
    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "20px",
            width: "320px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                {/* Square icon = Friends/Social */}
                <SquareIcon size={13} color="#0070d1" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "-0.2px" }}>Friends</span>
                <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, color: "#00e676", background: "rgba(0,230,118,0.12)", border: "1px solid rgba(0,230,118,0.25)", padding: "2px 8px", borderRadius: "20px" }}>{online.length} Online</span>
            </div>
            {onlineFriends.slice(0, 3).map((f, i) => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 4px", borderRadius: "10px", cursor: "pointer", transition: "background 150ms ease" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: ["linear-gradient(135deg,#3a4a6b,#1e2d45)", "linear-gradient(135deg,#2a4a3a,#1a3028)", "linear-gradient(135deg,#4a3a6b,#2d1e45)"][i % 3], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                            {f.username[0]}
                        </div>
                        <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "9px", height: "9px", borderRadius: "50%", background: f.status === "in-game" ? "#0070d1" : "#00e676", border: "2px solid rgba(8,10,20,0.9)", boxShadow: f.status === "in-game" ? "0 0 5px #0070d1" : "0 0 5px #00e676" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.username}</div>
                        <div style={{ fontSize: "10px", color: f.currentGame ? "#8a9bb5" : "#00e676", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.currentGame || "Online"}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

/* ── Chat Panel (bottom-left, below friends) ── */
const ChatOverlay = () => {
    const [msg, setMsg] = React.useState("");
    const [msgs, setMsgs] = React.useState([
        { id: 1, user: "SH", text: "ggs last round 🔥", self: false },
        { id: 2, user: "CO", text: "ready for ranked?", self: false },
    ]);
    const send = () => {
        if (!msg.trim()) return;
        setMsgs(p => [...p, { id: Date.now(), user: "GP", text: msg.trim(), self: true }]);
        setMsg("");
    };
    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "20px",
            width: "340px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            overflow: "hidden"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                {/* Circle icon = Messages/Chat */}
                <CircleIcon size={13} color="#0070d1" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Party Chat</span>
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                {onlineFriends.slice(0, 4).map((f, i) => (
                    <div key={f.id} style={{ width: "28px", height: "28px", borderRadius: "50%", background: ["#3a4a6b", "#2a4a3a", "#4a3a6b", "#4a3a2a"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.1)", position: "relative" }}>
                        {f.username[0]}
                        <div style={{ position: "absolute", bottom: 0, right: 0, width: "7px", height: "7px", borderRadius: "50%", background: "#00e676", border: "1.5px solid rgba(8,10,20,0.9)" }} />
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                {msgs.slice(-6).map(m => (
                    <div key={m.id} style={{ display: "flex", gap: "6px", alignItems: "flex-start", justifyContent: m.self ? "flex-end" : "flex-start" }}>
                        {!m.self && <span style={{ fontSize: "10px", fontWeight: 700, color: "#0070d1", minWidth: "20px", paddingTop: "2px" }}>{m.user}</span>}
                        <span style={{ fontSize: "12px", color: "#e0e0e0", background: m.self ? "rgba(0,112,209,0.3)" : "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "6px 10px", maxWidth: "180px", lineHeight: "1.4" }}>{m.text}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
                <input
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send()}
                    placeholder="Type message..."
                    style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "11px", padding: "6px 10px", outline: "none" }}
                />
                <button onClick={send} style={{ background: "#0070d1", border: "none", borderRadius: "8px", padding: "0 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {/* Triangle = Send */}
                    <TriangleIcon size={12} color="white" />
                </button>
            </div>
        </div>
    );
};

/* ── Stats/Achievements box (bottom-right) ── */
const StatsBox = ({ game }) => {
    const progressPct = Math.round((userProfile.currentXP / userProfile.nextLevelXP) * 100);
    const trophyCount = recentAchievements.length;

    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "24px 28px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            minWidth: "320px",
        }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 112, 209, 0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"; }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                {/* Trophy = Achievements */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5a623"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" /></svg>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>Progress & Trophies</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {/* Progress */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "10px 12px", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: "9px", color: "#8a9bb5", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Level Progress</div>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{progressPct}%</div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginTop: "8px" }}>
                        <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(90deg, #0070d1, #00d4ff)", borderRadius: "2px" }} />
                    </div>
                    <div style={{ fontSize: "9px", color: "#8a9bb5", marginTop: "4px" }}>Lv {userProfile.level} → {userProfile.nextLevel}</div>
                </div>
                {/* Trophies */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "10px 12px", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: "9px", color: "#8a9bb5", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Earned</div>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{trophyCount}/{trophyCount + 42}</div>
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                        {/* Gold, Silver, Bronze trophy indicators */}
                        {[{ color: "#FFD700", count: 0 }, { color: "#C0C0C0", count: 0 }, { color: "#CD7F32", count: trophyCount }].map((t, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill={t.color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" /></svg>
                                <span style={{ fontSize: "9px", color: "#8a9bb5" }}>{t.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   MAIN HOME DASHBOARD
───────────────────────────────────────────────────────────── */
const HomeDashboard = () => {
    const navigate = useNavigate();
    const { action } = useDualSenseWS();
    const [activeIdx, setActiveIdx] = useState(0);
    const [tab, setTab] = useState("Games");
    const [focusZone, setFocusZone] = useState("GAMES");
    const [navIdx, setNavIdx] = useState(0);
    const [quickIdx, setQuickIdx] = useState(0);
    const navItems = ["Games", "Media", "Accessories", "Showcase", "Store"];

    // Navigation logic for D-Pad
    useEffect(() => {
        if (!action) return;

        if (focusZone === "GAMES") {
            if (action === "DPAD_LEFT") {
                setActiveIdx(i => (i - 1 + featuredGames.length) % featuredGames.length);
            } else if (action === "DPAD_RIGHT") {
                setActiveIdx(i => (i + 1) % featuredGames.length);
            } else if (action === "DPAD_UP") {
                setFocusZone("NAV");
            }
        }
        else if (focusZone === "NAV") {
            if (action === "DPAD_LEFT") {
                setNavIdx(i => (i - 1 + navItems.length) % navItems.length);
            } else if (action === "DPAD_RIGHT") {
                if (navIdx === navItems.length - 1) setFocusZone("QUICK");
                else setNavIdx(i => (i + 1) % navItems.length);
            } else if (action === "DPAD_DOWN") {
                setFocusZone("GAMES");
            } else if (action === "CROSS") {
                const t = navItems[navIdx];
                if (t === "Accessories") navigate("/accessories");
                else if (t === "Showcase") navigate("/showcase");
                else if (t === "Store") navigate("/store");
                else setTab(t);
            }
        }
        else if (focusZone === "QUICK") {
            if (action === "DPAD_LEFT") {
                setFocusZone("NAV");
            } else if (action === "DPAD_RIGHT") {
                // No more right quick icons for now, or just focus search
                setQuickIdx(0);
            } else if (action === "DPAD_DOWN") {
                setFocusZone("GAMES");
            } else if (action === "CROSS") {
                // Fallback action if quick icons are kept
            }
        }
    }, [action, focusZone, navIdx, quickIdx]);

    useEffect(() => {
        const t = setInterval(() => setActiveIdx(i => (i + 1) % featuredGames.length), 8000);
        return () => clearInterval(t);
    }, []);

    const game = featuredGames[activeIdx];

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            position: "relative",
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            userSelect: "none",
            color: "#fff",
        }}>
            {/* ── FULL-SCREEN GAME POSTER BACKGROUND ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${game.poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: 0,
                    }}
                />
            </AnimatePresence>

            {/* Color overlay — left dark, right semi-transparent */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to right, rgba(5,8,18,0.88) 0%, rgba(5,8,18,0.55) 40%, rgba(5,8,18,0.15) 75%, rgba(5,8,18,0.05) 100%)",
            }} />
            <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to top, rgba(5,8,18,0.85) 0%, rgba(5,8,18,0.2) 35%, transparent 65%)",
            }} />
            {/* Game accent ambient */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`glow-${activeIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: `radial-gradient(ellipse at 20% 80%, ${game.accentColor}22 0%, transparent 60%)`,
                    }}
                />
            </AnimatePresence>

            {/* ── CONTENT LAYER ── */}
            <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", paddingTop: "82px" }}>

                {/* ── GAME CARDS CAROUSEL (floating row) ── */}
                <div style={{ padding: "16px 40px 0", display: "flex", alignItems: "flex-end", gap: "10px" }}>
                    {/* PS Store card */}
                    <div
                        onClick={() => navigate("/store")}
                        style={{
                            flexShrink: 0, width: "70px", height: "70px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #0070d1, #0044a0)",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", border: "2px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
                            transition: "all 0.3s ease", gap: "4px",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; e.currentTarget.style.borderColor = "rgba(0,112,209,0.8)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,112,209,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.5)"; }}
                    >
                        <PSLogoMini />
                        <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.5px" }}>STORE</span>
                    </div>

                    {/* Recently played game cards */}
                    {recentlyPlayedGames.map((g, i) => {
                        const matchIdx = featuredGames.findIndex(fg => fg.title === g.title);
                        const isActive = matchIdx !== -1 && matchIdx === activeIdx;
                        return (
                            <GameCard
                                key={g.id}
                                game={g}
                                isActive={isActive}
                                onClick={() => { if (matchIdx !== -1) setActiveIdx(matchIdx); }}
                            />
                        );
                    })}

                    {/* Additional cards from featured games */}
                    {featuredGames.map((g, i) => {
                        const alreadyShown = recentlyPlayedGames.some(rg => rg.title === g.title);
                        if (alreadyShown) return null;
                        return (
                            <GameCard key={g.id} game={g} isActive={i === activeIdx} onClick={() => setActiveIdx(i)} />
                        );
                    })}
                </div>

                {/* ── SPACER (game art shows here) ── */}
                <div style={{ flex: 1 }} />

                {/* ── BOTTOM SECTION ── */}
                <div style={{
                    padding: "0 40px 32px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "20px",
                }}>
                    {/* Bottom-LEFT: Game info + Friends + Chat */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {/* Game Logo + CTA */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`info-${activeIdx}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.4 }}
                                style={{ marginBottom: "4px" }}
                            >
                                <LogoImage
                                    src={game.logo}
                                    alt={game.title}
                                    style={{ maxHeight: "90px", maxWidth: "280px", objectFit: "contain", display: "block", marginBottom: "14px" }}
                                />
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    {/* Play Now — Cross btn */}
                                    <button
                                        style={{
                                            display: "flex", alignItems: "center", gap: "8px",
                                            background: "rgba(255,255,255,0.9)",
                                            border: "none", borderRadius: "6px",
                                            padding: "10px 24px",
                                            fontSize: "14px", fontWeight: 700, color: "#000",
                                            cursor: "pointer",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                                            transition: "all 200ms ease",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        <CrossIcon size={14} color="#000" />
                                        Play Game
                                    </button>
                                    {/* More options — Circle btn */}
                                    <button
                                        style={{
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            background: "rgba(255,255,255,0.12)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "16px", color: "#fff",
                                            transition: "all 200ms ease",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                                    >
                                        ···
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Chat */}
                        <ChatOverlay />
                    </div>

                    {/* Bottom-RIGHT: Stats / Progress / Trophies */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                        <FriendsPanelOverlay />
                        <StatsBox game={game} />

                        {/* Game dot indicators */}
                        <div style={{ display: "flex", gap: "8px", paddingRight: "4px" }}>
                            {featuredGames.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    style={{
                                        width: i === activeIdx ? "28px" : "8px",
                                        height: "4px",
                                        borderRadius: "2px",
                                        background: i === activeIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                                        border: "none", cursor: "pointer",
                                        transition: "all 300ms ease",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;
