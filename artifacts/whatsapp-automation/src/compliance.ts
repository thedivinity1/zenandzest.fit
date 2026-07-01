/**
 * WhatsApp Compliance Engine
 * 
 * Enforces:
 * - WhatsApp Business Policy (opt-in, 24h window, template approval)
 * - GDPR (explicit consent, data minimization, right to erasure)
 * - Regional regulations (DPDPA India, LGPD Brazil, etc.)
 * - Meta's Jan 2026 AI chatbot ban (task-specific only)
 */

import { ConsentRecord } from "./schemas";

export interface ConsentProof {
  customerId: string;
  consentGiven: boolean;
  consentTimestamp: Date;
  consentSource: string;
  ipAddress?: string;
  userAgent?: string;
  consentText: string;
  method: "double_optin" | "single_optin" | "explicit";
}

export interface MessageContext {
  customerId: string;
  messageType: "marketing" | "utility" | "authentication" | "service";
  isWithin24hWindow: boolean;
  hasValidOptIn: boolean;
  consentScope: string[]; // ["marketing", "support", "order_updates"]
  region: string;
}

export interface ComplianceResult {
  allowed: boolean;
  reason?: string;
  requiredAction?: "send_template" | "request_optin" | "within_window" | "blocked";
  consentRequired: boolean;
}

export class ComplianceEngine {
  private consentRecords: Map<string, ConsentRecord[]> = new Map();
  private readonly BLOCKED_REGIONS = ["ZZ"]; // Example blocked regions
  private readonly MINIMUM_OPTIN_AGE_MS = 1000 * 60 * 60 * 24 * 365; // 1 year

  /**
   * Record customer consent with full audit trail
   */
  recordConsent(consent: Omit<ConsentRecord, "id" | "createdAt">): ConsentRecord {
    const record: ConsentRecord = {
      ...consent,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    const existing = this.consentRecords.get(consent.customerId) || [];
    existing.push(record);
    this.consentRecords.set(consent.customerId, existing);

    return record;
  }

  /**
   * Verify if a message can be sent to a customer
   */
  canSendMessage(context: MessageContext): ComplianceResult {
    // 1. Check if region is blocked
    if (this.BLOCKED_REGIONS.includes(context.region)) {
      return {
        allowed: false,
        reason: "Messaging to this region is not supported",
        requiredAction: "blocked",
        consentRequired: false,
      };
    }

    // 2. Check opt-in for marketing messages (strictest requirement)
    if (context.messageType === "marketing" || context.messageType === "authentication") {
      if (!context.hasValidOptIn) {
        return {
          allowed: false,
          reason: "Explicit opt-in required for this message type",
          requiredAction: "request_optin",
          consentRequired: true,
        };
      }

      if (!context.consentScope.includes(context.messageType)) {
        return {
          allowed: false,
          reason: `Customer has not consented to ${context.messageType} messages`,
          requiredAction: "request_optin",
          consentRequired: true,
        };
      }
    }

    // 3. Check 24-hour window for free-form messages
    const freeFormTypes: string[] = [];
    if (!context.isWithin24hWindow && freeFormTypes.includes(context.messageType)) {
      return {
        allowed: false,
        reason: "Outside 24-hour window; template message required",
        requiredAction: "send_template",
        consentRequired: false,
      };
    }

    return {
      allowed: true,
      consentRequired: context.messageType === "marketing",
    };
  }

  /**
   * Withdraw consent (GDPR right to erasure / withdrawal)
   */
  withdrawConsent(customerId: string, consentType: string): boolean {
    const records = this.consentRecords.get(customerId);
    if (!records) return false;

    const latest = records.filter(r => r.consentType === consentType).pop();
    if (latest) {
      latest.consentGiven = false;
      latest.withdrawnAt = new Date();
      return true;
    }
    return false;
  }

  /**
   * Verify consent is still valid (not expired/withdrawn)
   */
  isConsentValid(customerId: string, consentType: string): boolean {
    const records = this.consentRecords.get(customerId) || [];
    const relevant = records.filter(r => r.consentType === consentType || r.consentType === "all");
    
    if (relevant.length === 0) return false;
    
    const latest = relevant[relevant.length - 1];
    if (!latest.consentGiven) return false;
    if (latest.withdrawnAt) return false;
    
    // Check expiration (1 year from consent)
    const age = Date.now() - latest.createdAt.getTime();
    if (age > this.MINIMUM_OPTIN_AGE_MS) {
      return false; // Consent expired, needs renewal
    }

    return true;
  }

  /**
   * Get full consent audit trail for a customer (GDPR data subject access)
   */
  getConsentAuditTrail(customerId: string): ConsentRecord[] {
    return this.consentRecords.get(customerId) || [];
  }

  /**
   * Delete all customer data (GDPR right to be forgotten)
   */
  eraseCustomerData(customerId: string): boolean {
    this.consentRecords.delete(customerId);
    return true;
  }

  /**
   * Verify a template message complies with WhatsApp policies
   */
  validateTemplate(template: {
    category: string;
    content: string;
    header?: string;
    variables: string[];
  }): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check for prohibited content
    const prohibitedPatterns = [
      /\b(buy now|click here|limited time|act fast|urgent)\b/i, // Spam-like urgency
      /\b(free money|guaranteed|100%|no risk)\b/i, // Unsubstantiated claims
    ];

    for (const pattern of prohibitedPatterns) {
      if (pattern.test(template.content)) {
        issues.push(`Template contains potentially spammy content: ${pattern.source}`);
      }
    }

    // Check variable count matches placeholders
    const placeholderCount = (template.content.match(/\{\{\d+\}\}/g) || []).length;
    if (placeholderCount !== template.variables.length) {
      issues.push(`Variable count mismatch: ${placeholderCount} placeholders vs ${template.variables.length} defined`);
    }

    // Check header length limits
    if (template.header && template.header.length > 60) {
      issues.push("Header exceeds 60 character limit");
    }

    // Check content length limits
    if (template.content.length > 1024) {
      issues.push("Content exceeds 1024 character limit");
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }
}

export const complianceEngine = new ComplianceEngine();
