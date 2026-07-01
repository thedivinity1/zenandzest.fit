/**
 * WhatsApp Automation Hook
 * 
 * React hook for integrating the website with WhatsApp automation.
 * Handles:
 * - Consent capture
 * - Opt-in flows
 * - Cart abandonment triggers
 * - Order tracking
 * - Avatar handoff
 */

import { useState, useCallback } from "react";

interface ConsentState {
  given: boolean;
  timestamp: Date | null;
  source: string | null;
  type: string | null;
}

interface UseWhatsAppReturn {
  consent: ConsentState;
  isProcessing: boolean;
  giveConsent: (source: string, type?: string) => Promise<boolean>;
  withdrawConsent: () => Promise<boolean>;
  sendMessage: (message: string) => Promise<boolean>;
  triggerCartRecovery: (cartData: any) => Promise<boolean>;
  triggerOrderTracking: (orderId: string) => Promise<boolean>;
  checkConsent: () => boolean;
}

export function useWhatsApp(phoneNumber?: string): UseWhatsAppReturn {
  const [consent, setConsent] = useState<ConsentState>(() => {
    if (typeof window === "undefined") return { given: false, timestamp: null, source: null, type: null };
    
    const saved = localStorage.getItem(`whatsapp_consent_${phoneNumber || "guest"}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          timestamp: parsed.timestamp ? new Date(parsed.timestamp) : null,
        };
      } catch {
        return { given: false, timestamp: null, source: null, type: null };
      }
    }
    return { given: false, timestamp: null, source: null, type: null };
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const checkConsent = useCallback(() => {
    return consent.given;
  }, [consent]);

  const giveConsent = useCallback(async (source: string, type: string = "all"): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      const response = await fetch("/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNumber || "guest_" + Date.now(),
          consentGiven: true,
          consentSource: source,
          metadata: { type, timestamp: new Date().toISOString() },
        }),
      });

      if (response.ok) {
        const newConsent = {
          given: true,
          timestamp: new Date(),
          source,
          type,
        };
        setConsent(newConsent);
        
        if (typeof window !== "undefined" && phoneNumber) {
          localStorage.setItem(`whatsapp_consent_${phoneNumber}`, JSON.stringify(newConsent));
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Consent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [phoneNumber]);

  const withdrawConsent = useCallback(async (): Promise<boolean> => {
    if (!phoneNumber) return false;
    
    setIsProcessing(true);
    
    try {
      const response = await fetch(`/api/customers/${encodeURIComponent(phoneNumber)}/consent/withdraw`, {
        method: "POST",
      });

      if (response.ok) {
        setConsent({ given: false, timestamp: null, source: null, type: null });
        if (typeof window !== "undefined") {
          localStorage.removeItem(`whatsapp_consent_${phoneNumber}`);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Withdraw consent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [phoneNumber]);

  const sendMessage = useCallback(async (message: string): Promise<boolean> => {
    if (!consent.given) {
      console.warn("Cannot send message: no consent given");
      return false;
    }

    try {
      await fetch("/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: phoneNumber,
          messageType: "text",
          content: message,
          phone: phoneNumber,
        }),
      });
      return true;
    } catch {
      return false;
    }
  }, [consent.given, phoneNumber]);

  const triggerCartRecovery = useCallback(async (cartData: any): Promise<boolean> => {
    try {
      const response = await fetch("/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "cart_abandoned",
          customerId: phoneNumber,
          data: cartData,
          phone: phoneNumber,
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }, [phoneNumber]);

  const triggerOrderTracking = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/webhooks/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "order_tracking",
          customerId: phoneNumber,
          orderId,
          phone: phoneNumber,
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }, [phoneNumber]);

  return {
    consent,
    isProcessing,
    giveConsent,
    withdrawConsent,
    sendMessage,
    triggerCartRecovery,
    triggerOrderTracking,
    checkConsent,
  };
}
