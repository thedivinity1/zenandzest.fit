import { z } from "zod";

// Core domain schemas for the WhatsApp automation system

export const CustomerSchema = z.object({
  id: z.string().uuid().optional(),
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/), // E.164 format
  name: z.string().optional(),
  email: z.string().email().optional(),
  consentGiven: z.boolean().default(false),
  consentTimestamp: z.date().optional(),
  consentSource: z.string().optional(), // e.g., "website_checkout", "avatar_handoff", "popup"
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const MessageTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  category: z.enum(["marketing", "utility", "authentication", "service"]),
  language: z.string().default("en"),
  content: z.string(),
  header: z.string().optional(),
  footer: z.string().optional(),
  buttons: z.array(z.object({
    type: z.enum(["reply", "url", "call"]),
    text: z.string(),
    value: z.string(),
  })).optional(),
  variables: z.array(z.string()).default([]), // {{1}}, {{2}}, etc.
  status: z.enum(["draft", "pending_approval", "approved", "rejected"]).default("draft"),
  metaTemplateId: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const CampaignSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional(),
  templateId: z.string().uuid(),
  targetAudience: z.object({
    tags: z.array(z.string()).optional(),
    segment: z.string().optional(), // "all", "vip", "cart_abandoners", "new_customers"
    filters: z.record(z.any()).optional(),
  }),
  scheduleType: z.enum(["immediate", "scheduled", "triggered"]).default("immediate"),
  scheduledAt: z.date().optional(),
  triggerEvent: z.string().optional(), // "cart_abandoned", "order_placed", "quiz_completed"
  status: z.enum(["draft", "scheduled", "sending", "completed", "paused"]).default("draft"),
  createdAt: z.date().default(() => new Date()),
});

export const ConversationSchema = z.object({
  id: z.string().uuid().optional(),
  customerId: z.string().uuid(),
  direction: z.enum(["inbound", "outbound"]),
  messageType: z.enum(["text", "template", "interactive", "media", "location"]),
  content: z.string(),
  mediaUrl: z.string().optional(),
  buttonResponse: z.any().optional(),
  whatsappMessageId: z.string().optional(),
  status: z.enum(["queued", "sent", "delivered", "read", "failed"]).default("queued"),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export const AutomationWorkflowSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional(),
  triggerType: z.enum(["event", "schedule", "manual"]),
  triggerConfig: z.record(z.any()),
  steps: z.array(z.object({
    action: z.enum(["send_template", "send_message", "add_tag", "wait", "condition", "ai_respond"]),
    config: z.record(z.any()),
    delayMs: z.number().optional(),
    condition: z.object({
      field: z.string(),
      operator: z.string(),
      value: z.any(),
    }).optional(),
  })),
  status: z.enum(["active", "paused", "draft"]).default("active"),
  createdAt: z.date().default(() => new Date()),
});

export const ConsentRecordSchema = z.object({
  id: z.string().uuid().optional(),
  customerId: z.string().uuid(),
  consentType: z.enum(["marketing", "support", "order_updates", "all"]),
  consentGiven: z.boolean(),
  consentMethod: z.string(), // "double_optin", "single_optin", "explicit"
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  consentText: z.string(), // The exact text the user agreed to
  withdrawnAt: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Type exports
export type Customer = z.infer<typeof CustomerSchema>;
export type MessageTemplate = z.infer<typeof MessageTemplateSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
export type AutomationWorkflow = z.infer<typeof AutomationWorkflowSchema>;
export type ConsentRecord = z.infer<typeof ConsentRecordSchema>;
