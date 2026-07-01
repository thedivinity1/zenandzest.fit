/**
 * ZenAndZest Talking Avatar Component
 * 
 * Brand-aligned interactive avatar for the website.
 * Uses pure CSS animations for smooth performance.
 * Connects to WhatsApp automation system via handoff.
 */

import { useState, useEffect, useCallback } from "react";

interface TalkingAvatarProps {
  name?: string;
  role?: string;
  avatarImage?: string;
  onHandoff?: (reason: string) => void;
  size?: "small" | "medium" | "large";
  position?: "bottom-right" | "bottom-left" | "inline";
  primaryColor?: string;
  accentColor?: string;
}

export default function TalkingAvatar({
  name = "Zara",
  role = "Wellness Guide",
  avatarImage,
  onHandoff,
  size = "medium",
  position = "bottom-right",
  primaryColor = "#1a3d2e",
  accentColor = "#c9a84c",
}: TalkingAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pre-defined brand messages for the avatar
  const brandMessages = [
    `Namaste! I'm ${name}, your personal wellness guide at ZenAndZest. 🌿`,
    `Discover our curated collection of premium wellness products designed for your holistic well-being.`,
    `Need help finding the perfect product? I'm here to guide you!`,
    `Would you like me to send you personalized recommendations via WhatsApp?`,
    "I can help you track orders, answer questions, and share exclusive wellness tips!",
  ];

  // Size configurations
  const sizeConfig = {
    small: { width: 60, height: 60, fontSize: "0.75rem" },
    medium: { width: 120, height: 120, fontSize: "0.875rem" },
    large: { width: 180, height: 180, fontSize: "1rem" },
  };

  // Simulate speaking animation
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setIsSpeaking(prev => !prev);
    }, 300);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Rotate through messages
  useEffect(() => {
    if (!isOpen) return;

    const cycleMessages = async () => {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false);
      setCurrentMessage(brandMessages[messageIndex]);
      setMessageIndex(prev => (prev + 1) % brandMessages.length);
    };

    cycleMessages();
    const interval = setInterval(cycleMessages, 8000);

    return () => clearInterval(interval);
  }, [isOpen, messageIndex]);

  const handleClick = useCallback(() => {
    setIsOpen(prev => !prev);
    if (onHandoff && !isOpen) {
      onHandoff("avatar_greeting");
    }
  }, [isOpen, onHandoff]);

  const handleAction = useCallback((action: string) => {
    if (onHandoff) {
      onHandoff(action);
    }
    setIsOpen(false);
  }, [onHandoff]);

  // Position styles
  const positionStyles = position === "inline" 
    ? { display: "inline-flex", position: "relative" as const }
    : { 
        position: "fixed" as const,
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
      };

  return (
    <div style={positionStyles}>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: size === "small" ? 70 : 140,
            right: 0,
            width: size === "small" ? 300 : 380,
            background: "linear-gradient(135deg, #0d2418 0%, #060f0a 100%)",
            border: `1px solid ${accentColor}33`,
            borderRadius: "24px",
            padding: "1.5rem",
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}15`,
            animation: "fade-in-up 0.3s ease",
            fontFamily: "var(--font-sans)",
          }}
        >
          {/* Avatar Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {/* Animated Avatar Circle */}
            <div
              style={{
                width: size === "small" ? 50 : 64,
                height: size === "small" ? 50 : 64,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: `0 0 ${
                  isSpeaking ? "30px" : "15px"
                } ${accentColor}40`,
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Avatar face animation */}
              <div
                style={{
                  fontSize: size === "small" ? "1.5rem" : "2rem",
                  animation: isSpeaking ? "pulse 0.5s ease infinite" : "none",
                }}
              >
                🌿
              </div>
              
              {/* Speaking indicator */}
              {isSpeaking && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    color: primaryColor,
                  }}
                >
                  🔊
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: sizeConfig[size].fontSize,
                  fontWeight: 700,
                  color: accentColor,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 2,
                }}
              >
                {role}
              </div>
            </div>
          </div>

          {/* Message Bubble */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "1rem",
              marginBottom: "1rem",
              minHeight: 80,
            }}
          >
            {isTyping ? (
              <div style={{ display: "flex", gap: 6, padding: "0.5rem 0" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: accentColor,
                    animation: "pulse 1s ease infinite",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: accentColor,
                    animation: "pulse 1s ease infinite 0.2s",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: accentColor,
                    animation: "pulse 1s ease infinite 0.4s",
                  }}
                />
              </div>
            ) : (
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {currentMessage}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              onClick={() => handleAction("product_question")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                color: primaryColor,
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 25px ${accentColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              💬 Chat with me on WhatsApp
            </button>
            
            <button
              onClick={() => handleAction("order_tracking")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-sans)",
              }}
            >
              📦 Track My Order
            </button>
            
            <button
              onClick={() => handleAction("booking")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-sans)",
              }}
            >
              📅 Book a Consultation
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={handleClick}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Avatar Trigger Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: sizeConfig[size].width,
          height: sizeConfig[size].height,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
          border: "none",
          cursor: "pointer",
          position: "relative",
          boxShadow: isHovered
            ? `0 0 40px ${accentColor}50, 0 8px 25px rgba(0,0,0,0.3)`
            : `0 0 20px ${accentColor}30, 0 4px 15px rgba(0,0,0,0.2)`,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isHovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25rem",
          animation: isOpen ? "none" : "pulse-ring 3s ease-out infinite",
        }}
      >
        {/* Avatar Icon */}
        <div
          style={{
            fontSize: size === "small" ? "1.5rem" : size === "medium" ? "2.5rem" : "3.5rem",
            animation: isSpeaking && isOpen ? "bounce 1s ease infinite" : "none",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          }}
        >
          🌿
        </div>
        
        {/* Label */}
        {size !== "small" && (
          <span
            style={{
              color: "white",
              fontSize: sizeConfig[size].fontSize,
              fontWeight: 700,
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {name}
          </span>
        )}

        {/* Notification dot */}
        {!isOpen && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ef4444",
              border: `2px solid ${primaryColor}`,
              boxShadow: "0 0 10px rgba(239,68,68,0.5)",
            }}
          />
        )}
      </button>
    </div>
  );
}
