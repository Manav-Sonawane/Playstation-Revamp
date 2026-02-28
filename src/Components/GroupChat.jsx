import React, { useState } from "react";
import { MessageCircle, Send, Users } from "lucide-react";
import { onlineFriends } from "../data/mockData.js";

const GroupChat = () => {
  const [message, setMessage] = useState("");

  const getInitials = (username) => {
    return username.slice(0, 2).toUpperCase();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  return (
    <div
      style={{
        width: "300px",
        minWidth: "280px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Group Chat Card */}
      <div
        style={{
          background: "#141824",
          border: "1px solid #1e2d45",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              letterSpacing: "-0.3px",
            }}
          >
            <MessageCircle size={18} style={{ color: "#0070d1" }} />
            Group Chat
          </h3>
        </div>

        {/* Friends Online Strip */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "thin",
          }}
        >
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              style={{
                minWidth: "48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #0070d1 0%, #00d4ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  border: "2px solid #1e2d45",
                  position: "relative",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.borderColor = "#0070d1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "#1e2d45";
                }}
              >
                {getInitials(friend.username)}
                {/* Online status dot */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background:
                      friend.status === "in-game" ? "#0070d1" : "#00e676",
                    border: "2px solid #141824",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Chat Messages Area */}
        <div
          style={{
            height: "180px",
            background: "rgba(10, 14, 26, 0.4)",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #1e2d45",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Empty state or chat messages would go here */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#8a9bb5",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            <MessageCircle
              size={32}
              style={{ marginBottom: "8px", opacity: 0.5 }}
            />
            Start chatting with your party
          </div>
        </div>

        {/* Message Input */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type message here..."
            style={{
              flex: 1,
              background: "rgba(10, 14, 26, 0.4)",
              border: "1px solid #1e2d45",
              borderRadius: "24px",
              padding: "10px 16px",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0070d1";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#1e2d45";
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0070d1 0%, #00d4ff 100%)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Send size={18} style={{ color: "#ffffff" }} />
          </button>
        </div>

        {/* Join Party Button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #f5a623 0%, #ff8c00 100%)",
            border: "none",
            borderRadius: "12px",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(245, 166, 35, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Users size={18} />
          Join Party
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
