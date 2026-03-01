import React, { useState } from "react";
import { MessageCircle, Send, Users } from "lucide-react";
import { onlineFriends } from "../data/mockData.js";

const GroupChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "ShadowNinja47", text: "ggs last round 🔥", initials: "SH", time: "2m" },
    { id: 2, user: "CosmicGamer", text: "ready for ranked?", initials: "CO", time: "1m" },
  ]);

  const getInitials = (username) => username.slice(0, 2).toUpperCase();

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "GamerPro", text: message.trim(), initials: "GP", time: "now", isSelf: true },
    ]);
    setMessage("");
  };

  return (
    <div
      style={{
        background: "rgba(10, 14, 26, 0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            letterSpacing: "-0.3px",
          }}
        >
          <MessageCircle size={17} style={{ color: "#0070d1" }} />
          Group Chat
        </h3>
      </div>

      {/* Online friends avatars row */}
      <div style={{ display: "flex", gap: "8px" }}>
        {onlineFriends.map((friend) => (
          <div key={friend.id} style={{ position: "relative", cursor: "pointer" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0070d1 0%, #00d4ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.1)",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "#0070d1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {getInitials(friend.username)}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "1px",
                right: "1px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: friend.status === "in-game" ? "#0070d1" : "#00e676",
                border: "2px solid rgba(10,14,26,0.9)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Chat messages */}
      <div
        style={{
          height: "160px",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(8px)",
          borderRadius: "14px",
          padding: "12px",
          border: "1px solid rgba(255,255,255,0.06)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.length === 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#8a9bb5",
            fontSize: "12px",
            gap: "6px",
          }}>
            <MessageCircle size={28} style={{ opacity: 0.35 }} />
            Start chatting with your party
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
                flexDirection: msg.isSelf ? "row-reverse" : "row",
              }}
            >
              {!msg.isSelf && (
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0070d1, #00d4ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}>
                  {msg.initials}
                </div>
              )}
              <div style={{ maxWidth: "75%" }}>
                {!msg.isSelf && (
                  <div style={{ fontSize: "10px", color: "#8a9bb5", marginBottom: "3px" }}>
                    {msg.user}
                  </div>
                )}
                <div style={{
                  background: msg.isSelf
                    ? "linear-gradient(135deg, #0070d1, #0088ff)"
                    : "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  border: msg.isSelf ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: msg.isSelf ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  padding: "7px 12px",
                  fontSize: "12px",
                  color: "#fff",
                  lineHeight: 1.45,
                }}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type message here..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            padding: "10px 16px",
            color: "#ffffff",
            fontSize: "13px",
            outline: "none",
            transition: "all 180ms ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,112,209,0.6)";
            e.currentTarget.style.background = "rgba(255,255,255,0.09)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          }}
        />
        <button
          onClick={handleSend}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0070d1, #00d4ff)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 150ms ease",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,112,209,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,112,209,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,112,209,0.35)";
          }}
        >
          <Send size={16} color="white" />
        </button>
      </div>

      {/* Join Party */}
      <button
        style={{
          width: "100%",
          padding: "11px",
          background: "linear-gradient(135deg, rgba(245,166,35,0.9), rgba(255,140,0,0.9))",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(245,166,35,0.3)",
          borderRadius: "12px",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 180ms ease",
          letterSpacing: "0.3px",
          boxShadow: "0 4px 16px rgba(245,166,35,0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,166,35,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,166,35,0.2)";
        }}
      >
        <Users size={16} />
        Join Party
      </button>
    </div>
  );
};

export default GroupChat;
