/**
 * WhatsApp Opt-In Consent Banner
 * 
 * GDPR/DPDPA-compliant consent capture for WhatsApp messaging.
 * Appears as a banner or modal on the website.
 */

import { useState, useEffect } from "react";

interface WhatsAppOptInProps {
  onConsentGiven?: () => void;
  onConsentDeclined?: () => void;
  storageKey?: string;
}

export default function WhatsAppOptIn({
  onConsentGiven,
  onConsentDeclined,
  storageKey = "zen_whatsapp_optin",
}: WhatsAppOptInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasResponded = localStorage.getItem(storageKey);
    if (!hasResponded) {
      const timer = setTimeout(() => setIsVisible(true), 5000);
      return () => clearTimeout(timer);
    }
    return;
  }, [storageKey]);

  const handleConsent = async (consentGiven: boolean) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: "web_visitor_" + Date.now(),
          consentGiven,
          consentSource: "website_banner",
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          },
        }),
      });

      if (response.ok) {
        localStorage.setItem(storageKey, consentGiven ? "accepted" : "declined");
        setIsVisible(false);
        if (consentGiven) onConsentGiven?.();
        else onConsentDeclined?.();
      }
    } catch (error) {
      console.error("Consent submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: 24,
      maxWidth: 320,
      background: "linear-gradient(135deg, #0d2418 0%, #060f0a 100%)",
      border: "1px solid rgba(201, 168, 76, 0.3)",
      borderRadius: 16,
      padding: "1rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)",
      zIndex: 99998,
      animation: "fade-in-up 0.4s ease",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <div style={{ fontSize: "1.5rem" }}>🌿</div>
        <h3 style={{
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#c9a84c",
          fontFamily: "var(--font-serif)",
          margin: 0
        }}>
          Stay Connected on WhatsApp
        </h3>
      </div>
      <p style={{
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.7)",
        lineHeight: 1.5,
        marginBottom: "0.75rem",
      }}>
        Get exclusive wellness tips, personalized product recommendations, and order updates directly on WhatsApp. We respect your privacy — you can opt out anytime.
      </p>
      <div style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: 8,
        padding: "0.5rem",
        marginBottom: "0.75rem",
      }}>
        {["✨ Exclusive wellness content & tips", "📦 Real-time order tracking", "🎁 Member-only discounts & offers", "💬 Direct chat with our wellness guides"].map((benefit, idx) => (
          <div key={idx} style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.8)",
            marginBottom: idx < 3 ? "0.2rem" : 0,
          }}>
            {benefit}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={() => handleConsent(true)}
          disabled={isSubmitting}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            background: "linear-gradient(135deg, #c9a84c 0%, #a87e30 100%)",
            border: "none",
            borderRadius: 12,
            color: "#050908",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            fontFamily: "var(--font-sans)",
          }}
        >
          {isSubmitting ? "Please wait..." : "✅ Yes, I'm In!"}
        </button>
        <button
          onClick={() => handleConsent(false)}
          disabled={isSubmitting}
          style={{
            padding: "0.75rem 1.25rem",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          Not Now
        </button>
      </div>
      <p style={{
        fontSize: "0.7rem",
        color: "rgba(255,255,255,0.35)",
        textAlign: "center",
        marginTop: "0.75rem",
        lineHeight: 1.5,
      }}>
        By clicking "Yes, I'm In!" you agree to receive WhatsApp messages from ZenAndZest. Reply STOP to opt out anytime.
      </p>
    </div>
  );
}
