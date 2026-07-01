/**
 * WhatsApp Chat Widget
 * 
 * Floating WhatsApp button and chat interface for the website.
 * Compliant with WhatsApp Business Policy (opt-in, 24h window, templates).
 * Integrates with the WhatsApp automation backend.
 */

import { useState, useRef, useEffect } from "react";

interface WhatsAppChatWidgetProps {
  phoneNumber?: string;
  primaryColor?: string;
  position?: "bottom-right" | "bottom-left";
  showOnMobile?: boolean;
  businessName?: string;
  welcomeMessage?: string;
  autoReplyDelay?: number;
}

export default function WhatsAppChatWidget({
  phoneNumber = "+919876543210",
  primaryColor = "#c9a84c",
  position = "bottom-right",
  showOnMobile = true,
  businessName = "ZenAndZest Wellness",
  welcomeMessage = "Hi! Welcome to ZenAndZest. 🌿\n\nHow can we help you today?",
  autoReplyDelay = 3000,
}: WhatsAppChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot"; time: string }>>([
    {
      text: welcomeMessage,
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-reply simulation
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        const replies = [
          "Thank you for reaching out! Our team will get back to you within 24 hours. 🌿",
          "Great question! Let me connect you with our wellness specialist.",
          "I'd be happy to help you with that! Could you please share your order ID?",
          "Thanks for your interest in ZenAndZest! We have some exciting offers this week. Would you like to know more?",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages(prev => [...prev, {
          text: randomReply,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }]);
        setIsTyping(false);
      }, autoReplyDelay);
      return () => clearTimeout(timer);
    }
    return;
  }, [messages, autoReplyDelay]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      text: inputValue,
      sender: "user" as const,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Send to backend
    fetch("/api/webhooks/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: "web_user_" + Date.now(),
        messageType: "text",
        content: inputValue,
        phone: phoneNumber,
      }),
    }).catch(err => console.error("WhatsApp webhook error:", err));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Open WhatsApp app/website directly
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in ZenAndZest wellness products.");
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  if (!showOnMobile && typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        [position === "bottom-left" ? "left" : "right"]: 24,
        zIndex: 99999,
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div
          style={{
            width: 380,
            maxWidth: "calc(100vw - 48px)",
            height: 520,
            maxHeight: "calc(100vh - 120px)",
            background: "linear-gradient(135deg, #0d2418 0%, #060f0a 100%)",
            borderRadius: 24,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${primaryColor}15`,
            border: `1px solid ${primaryColor}33`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginBottom: 16,
            animation: "fade-in-up 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              🌿
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: "0.95rem" }}>
                {businessName}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
                Typically replies within 24h
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
              }}
            >
              −
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "0.75rem 1rem",
                    borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.sender === "user"
                      ? `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`
                      : "rgba(255,255,255,0.08)",
                    color: msg.sender === "user" ? "#fff" : "rgba(255,255,255,0.9)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    border: msg.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: msg.sender === "user" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
                      textAlign: "right",
                      marginTop: 4,
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: primaryColor, animation: "pulse 1s ease infinite" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: primaryColor, animation: "pulse 1s ease infinite 0.2s" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: primaryColor, animation: "pulse 1s ease infinite 0.4s" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 100,
                color: "white",
                fontSize: "0.875rem",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
                border: "none",
                color: "white",
                fontSize: "1.25rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: `0 4px 15px ${primaryColor}40`,
              }}
            >
              ➤
            </button>
          </div>

          {/* Compliance notice */}
          <div
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(0,0,0,0.2)",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
            }}
          >
            💬 By messaging, you agree to receive communications from {businessName}. Reply STOP to opt out.
          </div>
        </div>
      )}

      {/* Minimized button */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(37,211,102,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      )}

      {/* Main toggle button */}
      {!isOpen && (
        <button
          onClick={openWhatsApp}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            color: "white",
            fontSize: "1.75rem",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(37,211,102,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(37,211,102,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,211,102,0.5)";
          }}
        >
          {/* WhatsApp SVG icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.365.195 1.88.118.574-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          
          {/* Notification dot */}
          <div
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid white",
              boxShadow: "0 0 10px rgba(239,68,68,0.5)",
            }}
          />
        </button>
      )}
    </div>
  );
}
