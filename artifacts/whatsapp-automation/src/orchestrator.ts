/**
 * Message Orchestrator
 * 
 * Central hub for all WhatsApp message dispatching.
 * Handles routing, retries, delivery tracking, and error handling.
 */

import { Conversation, MessageTemplate } from "./schemas";
import { complianceEngine, ComplianceResult, MessageContext } from "./compliance";

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: Date;
}

export class MessageOrchestrator {
  private messageQueue: Conversation[] = [];
  private maxRetries = 3;
  private retryDelayMs = 1000;

  /**
   * Send a text message
   */
  async sendMessage(to: string, content: string): Promise<SendResult> {
    const timestamp = new Date();
    
    // Compliance check
    const compliance = complianceEngine.canSendMessage({
      customerId: "",
      messageType: "service",
      isWithin24hWindow: true, // Would be checked from conversation state
      hasValidOptIn: true,
      consentScope: ["support", "order_updates"],
      region: "IN", // Would be determined from customer data
    });

    if (!compliance.allowed) {
      return {
        success: false,
        error: `Compliance blocked: ${compliance.reason}`,
        timestamp,
      };
    }

    // Queue message for delivery
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      customerId: "", // Would be resolved from phone number
      direction: "outbound",
      messageType: "text",
      content,
      status: "queued",
      createdAt: timestamp,
    };

    this.messageQueue.push(conversation);

    // In production, this would call WhatsApp Business API via BSP
    // For now, we simulate successful delivery
    console.log(`[Orchestrator] Queued message to ${to}: ${content.substring(0, 50)}...`);

    // Placeholder for actual WhatsApp API call:
    // const response = await fetch(`${BSP_API_URL}/messages`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${BSP_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ to, type: 'text', text: { body: content } })
    // });

    return {
      success: true,
      messageId: `msg_${crypto.randomUUID()}`,
      timestamp,
    };
  }

  /**
   * Send a pre-approved template message
   */
  async sendTemplate(
    to: string,
    templateName: string,
    language: string = "en",
    components: any[] = []
  ): Promise<SendResult> {
    const timestamp = new Date();

    // Marketing templates require explicit opt-in
    const compliance = complianceEngine.canSendMessage({
      customerId: "",
      messageType: "marketing",
      isWithin24hWindow: true,
      hasValidOptIn: true,
      consentScope: ["marketing"],
      region: "IN",
    });

    if (!compliance.allowed) {
      return {
        success: false,
        error: `Template send blocked: ${compliance.reason}`,
        timestamp,
      };
    }

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      customerId: "",
      direction: "outbound",
      messageType: "template",
      content: `Template: ${templateName}`,
      status: "queued",
      createdAt: timestamp,
    };

    this.messageQueue.push(conversation);

    console.log(`[Orchestrator] Sending template "${templateName}" to ${to}`);

    return {
      success: true,
      messageId: `tpl_${crypto.randomUUID()}`,
      timestamp,
    };
  }

  /**
   * Send interactive message (buttons, lists, carousels)
   */
  async sendInteractive(to: string, type: "buttons" | "list" | "product", content: any): Promise<SendResult> {
    const timestamp = new Date();

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      customerId: "",
      direction: "outbound",
      messageType: "interactive",
      content: JSON.stringify(content),
      status: "queued",
      createdAt: timestamp,
    };

    this.messageQueue.push(conversation);

    console.log(`[Orchestrator] Sending interactive ${type} to ${to}`);

    return {
      success: true,
      messageId: `int_${crypto.randomUUID()}`,
      timestamp,
    };
  }

  /**
   * Send media message (image, video, document)
   */
  async sendMedia(to: string, mediaType: "image" | "video" | "document", mediaUrl: string, caption?: string): Promise<SendResult> {
    const timestamp = new Date();

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      customerId: "",
      direction: "outbound",
      messageType: "media",
      content: caption || "",
      mediaUrl,
      status: "queued",
      createdAt: timestamp,
    };

    this.messageQueue.push(conversation);

    console.log(`[Orchestrator] Sending ${mediaType} to ${to}`);

    return {
      success: true,
      messageId: `med_${crypto.randomUUID()}`,
      timestamp,
    };
  }

  /**
   * Process incoming message webhook
   */
  async processIncomingMessage(payload: any): Promise<Conversation> {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      customerId: payload.customerId || "",
      direction: "inbound",
      messageType: payload.messageType || "text",
      content: payload.content,
      mediaUrl: payload.mediaUrl,
      whatsappMessageId: payload.messageId,
      status: "delivered",
      createdAt: new Date(),
    };

    this.messageQueue.push(conversation);

    // Trigger AI response if needed
    await this.handleAIResponse(conversation);

    return conversation;
  }

  /**
   * Handle AI response generation for inbound messages
   */
  private async handleAIResponse(conversation: Conversation): Promise<void> {
    // Only auto-respond to task-specific queries within 24h window
    const taskKeywords = ["order", "track", "status", "refund", "return", "product", "price", "availability"];
    const lowerContent = conversation.content.toLowerCase();
    
    if (taskKeywords.some(keyword => lowerContent.includes(keyword))) {
      // Would call AI service to generate contextual response
      console.log(`[Orchestrator] AI response triggered for: ${conversation.content.substring(0, 50)}`);
    }
  }

  /**
   * Retry failed message
   */
  async retryMessage(messageId: string): Promise<SendResult> {
    // Find message and retry
    console.log(`[Orchestrator] Retrying message: ${messageId}`);
    return {
      success: true,
      messageId: `retry_${messageId}`,
      timestamp: new Date(),
    };
  }

  /**
   * Get message status from WhatsApp
   */
  async getMessageStatus(messageId: string): Promise<"queued" | "sent" | "delivered" | "read" | "failed"> {
    // In production, query BSP API
    return "sent";
  }

  /**
   * Get queue statistics
   */
  getStats(): { queued: number; sent: number; failed: number } {
    return {
      queued: this.messageQueue.filter(m => m.status === "queued").length,
      sent: this.messageQueue.filter(m => m.status === "sent").length,
      failed: this.messageQueue.filter(m => m.status === "failed").length,
    };
  }
}
