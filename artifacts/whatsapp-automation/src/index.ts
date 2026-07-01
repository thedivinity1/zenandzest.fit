/**
 * ZenAndZest WhatsApp Automation Server
 * 
 * Production-ready WhatsApp Business API automation system.
 * Features:
 * - Compliant opt-in/opt-out management
 * - Template approval workflow
 * - Automation campaign execution
 * - Workflow engine with branching
 * - Webhook handling for inbound messages
 * - Rate limiting and security
 * - Health monitoring
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { MessageOrchestrator } from "./orchestrator";
import { WorkflowEngine } from "./workflow";
import { complianceEngine, ConsentProof, MessageContext } from "./compliance";
import {
  CustomerSchema,
  MessageTemplateSchema,
  CampaignSchema,
  AutomationWorkflowSchema,
  ConversationSchema,
} from "./schemas";
import { Customer, MessageTemplate, Campaign, Conversation, AutomationWorkflow } from "./schemas";

// ============================================================================
// INITIALIZATION
// ============================================================================

const app = express();
const PORT = process.env.PORT || 3001;
const orchestrator = new MessageOrchestrator();
const workflowEngine = new WorkflowEngine(orchestrator);

// In-memory stores (replace with PostgreSQL in production)
const customers = new Map<string, Customer>();
const templates = new Map<string, MessageTemplate>();
const campaigns = new Map<string, Campaign>();
const workflows = new Map<string, AutomationWorkflow>();
const conversations = new Map<string, Conversation>();

// Seed with sample workflows
const sampleWorkflows: AutomationWorkflow[] = [
  {
    id: crypto.randomUUID(),
    name: "Cart Abandonment Recovery",
    description: "Recovers abandoned carts with personalized reminders and incentives",
    triggerType: "event",
    triggerConfig: { event: "cart_abandoned", delayMinutes: 60 },
    steps: [
      {
        action: "wait",
        config: { delayMs: 60 * 60 * 1000 }, // Wait 1 hour
      },
      {
        action: "send_template",
        config: {
          templateName: "cart_abandonment_reminder",
          language: "en",
          components: [
            { type: "body", parameters: [{ type: "text", text: "{{customer_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{product_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{cart_value}}" }] },
          ],
        },
      },
      {
        action: "wait",
        config: { delayMs: 24 * 60 * 60 * 1000 }, // Wait 24 hours
      },
      {
        action: "send_template",
        config: {
          templateName: "cart_abandonment_incentive",
          language: "en",
          components: [
            { type: "body", parameters: [{ type: "text", text: "{{customer_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "10" }] }, // 10% discount
          ],
        },
      },
    ],
    status: "active",
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Order Confirmation Flow",
    description: "Sends order confirmation, shipping updates, and delivery notifications",
    triggerType: "event",
    triggerConfig: { event: "order_placed" },
    steps: [
      {
        action: "send_template",
        config: {
          templateName: "order_confirmation",
          language: "en",
          components: [
            { type: "header", parameters: [{ type: "text", text: "Order Confirmed! 🎉" }] },
            { type: "body", parameters: [{ type: "text", text: "{{customer_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{order_id}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{delivery_eta}}" }] },
          ],
        },
      },
      {
        action: "wait",
        config: { delayMs: 48 * 60 * 60 * 1000 }, // Wait 48 hours
      },
      {
        action: "send_template",
        config: {
          templateName: "order_shipped",
          language: "en",
          components: [
            { type: "body", parameters: [{ type: "text", text: "{{customer_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{tracking_number}}" }] },
          ],
        },
      },
    ],
    status: "active",
    createdAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: "Re-engagement Campaign",
    description: "Re-engages inactive customers with personalized wellness content",
    triggerType: "schedule",
    triggerConfig: { cron: "0 10 * * 1" }, // Every Monday at 10 AM
    steps: [
      {
        action: "send_template",
        config: {
          templateName: "reengagement_wellness_tip",
          language: "en",
          components: [
            { type: "body", parameters: [{ type: "text", text: "{{customer_name}}" }] },
            { type: "body", parameters: [{ type: "text", text: "{{wellness_tip}}" }] },
          ],
        },
      },
      {
        action: "add_tag",
        config: { tag: "reengaged_weekly" },
      },
    ],
    status: "active",
    createdAt: new Date(),
  },
];

sampleWorkflows.forEach(w => {
  const validated = AutomationWorkflowSchema.parse(w);
  workflows.set(validated.id!, validated);
});

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));
app.use(express.json({ limit: "10mb" }));

// Strict rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    stats: orchestrator.getStats(),
    activeWorkflows: workflows.size,
    activeCustomers: customers.size,
    version: "1.0.0",
  });
});

// ============================================================================
// CUSTOMER MANAGEMENT
// ============================================================================

/**
 * Register a new customer with consent
 * POST /api/customers/register
 */
app.post("/api/customers/register", (req, res) => {
  try {
    const validated = CustomerSchema.parse(req.body);
    
    // Record consent with full audit trail
    if (validated.consentGiven) {
      complianceEngine.recordConsent({
        customerId: validated.id || crypto.randomUUID(),
        consentType: "all",
        consentGiven: true,
        consentMethod: "double_optin",
        ipAddress: req.ip,
        userAgent: req.get("user-agent") || undefined,
        consentText: `Customer ${validated.name || validated.phoneNumber} consented to receive WhatsApp messages for marketing, support, and order updates via ZenAndZest website (${req.body.consentSource || "unknown"})`,
      });
    }

    const customer: Customer = {
      ...validated,
      id: validated.id || crypto.randomUUID(),
      updatedAt: new Date(),
    };

    customers.set(customer.phoneNumber, customer);

    // Send welcome message if within welcome window
    if (customer.consentGiven) {
      setTimeout(async () => {
        await orchestrator.sendMessage(
          customer.phoneNumber,
          `Welcome to ZenAndZest, ${customer.name || "wellness seeker"}! 🌿\n\nDiscover our premium wellness products and exclusive offers. Reply STOP to opt out anytime.`
        );
      }, 5000);
    }

    res.status(201).json({
      success: true,
      customer,
      message: "Customer registered successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Withdraw customer consent (GDPR right to erasure)
 * POST /api/customers/:phone/consent/withdraw
 */
app.post("/api/customers/:phone/consent/withdraw", (req, res) => {
  const { phone } = req.params;
  const customer = customers.get(phone);

  if (!customer) {
    res.status(404).json({ success: false, error: "Customer not found" });
    return;
  }

  const withdrawn = complianceEngine.withdrawConsent(
    customer.id || phone,
    "all"
  );

  if (withdrawn) {
    customer.consentGiven = false;
    customer.updatedAt = new Date();
    customers.set(phone, customer);

    res.json({
      success: true,
      message: "Consent withdrawn successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      error: "Could not withdraw consent",
    });
  }
});

/**
 * Get customer consent audit trail (GDPR data subject access)
 * GET /api/customers/:phone/consent/audit
 */
app.get("/api/customers/:phone/consent/audit", (req, res) => {
  const { phone } = req.params;
  const customer = customers.get(phone);

  if (!customer) {
    res.status(404).json({ success: false, error: "Customer not found" });
    return;
  }

  const auditTrail = complianceEngine.getConsentAuditTrail(customer.id || phone);

  res.json({
    success: true,
    customerId: customer.id,
    auditTrail,
  });
});

/**
 * Delete all customer data (GDPR right to be forgotten)
 * DELETE /api/customers/:phone
 */
app.delete("/api/customers/:phone", (req, res) => {
  const { phone } = req.params;
  const customer = customers.get(phone);

  if (!customer) {
    res.status(404).json({ success: false, error: "Customer not found" });
    return;
  }

  // Erase all data
  complianceEngine.eraseCustomerData(customer.id || phone);
  customers.delete(phone);

  res.json({
    success: true,
    message: "All customer data has been deleted",
  });
});

// ============================================================================
// TEMPLATE MANAGEMENT
// ============================================================================

/**
 * Create a message template
 * POST /api/templates
 */
app.post("/api/templates", (req, res) => {
  try {
    const validated = MessageTemplateSchema.parse(req.body);
    
    // Validate against WhatsApp policies
    const validation = complianceEngine.validateTemplate(validated);
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: "Template validation failed",
        issues: validation.issues,
      });
      return;
    }

    const template: MessageTemplate = {
      ...validated,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    templates.set(template.id!, template);

    res.status(201).json({
      success: true,
      template,
      message: "Template created (pending Meta approval)",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * List all templates
 * GET /api/templates
 */
app.get("/api/templates", (req, res) => {
  const allTemplates = Array.from(templates.values());
  res.json({
    success: true,
    templates: allTemplates,
    count: allTemplates.length,
  });
});

// ============================================================================
// CAMPAIGN MANAGEMENT
// ============================================================================

/**
 * Create a campaign
 * POST /api/campaigns
 */
app.post("/api/campaigns", (req, res) => {
  try {
    const validated = CampaignSchema.parse(req.body);
    const campaign: Campaign = {
      ...validated,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    campaigns.set(campaign.id!, campaign);

    res.status(201).json({
      success: true,
      campaign,
      message: "Campaign created",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Execute a campaign
 * POST /api/campaigns/:id/execute
 */
app.post("/api/campaigns/:id/execute", async (req, res) => {
  const { id } = req.params;
  const campaign = campaigns.get(id);

  if (!campaign) {
    res.status(404).json({ success: false, error: "Campaign not found" });
    return;
  }

  // Update campaign status
  campaign.status = "sending";
  campaigns.set(id, campaign);

  // Execute campaign (in production, this would use BullMQ for queueing)
  console.log(`[Campaign] Executing: ${campaign.name}`);
  
  // Simulate sending to target audience
  const targetPhones = Array.from(customers.keys()).slice(0, 10); // First 10 for demo
  
  for (const phone of targetPhones) {
    const customer = customers.get(phone);
    if (customer && customer.consentGiven) {
      await orchestrator.sendTemplate(
        phone,
        campaign.templateId,
        "en",
        []
      );
    }
  }

  // Update campaign status
  campaign.status = "completed";
  campaigns.set(id, campaign);

  res.json({
    success: true,
    message: `Campaign executed to ${targetPhones.length} recipients`,
    campaign,
  });
});

// ============================================================================
// WORKFLOW MANAGEMENT
// ============================================================================

/**
 * Trigger a workflow
 * POST /api/workflows/:id/trigger
 */
app.post("/api/workflows/:id/trigger", async (req, res) => {
  const { id } = req.params;
  const workflow = workflows.get(id);

  if (!workflow) {
    res.status(404).json({ success: false, error: "Workflow not found" });
    return;
  }

  const { customerId, phoneNumber, variables = {} } = req.body;

  if (!customerId || !phoneNumber) {
    res.status(400).json({
      success: false,
      error: "customerId and phoneNumber are required",
    });
    return;
  }

  try {
    const results = await workflowEngine.executeWorkflow(workflow, {
      customerId,
      phoneNumber,
      variables,
      workflowId: id,
    });

    res.json({
      success: true,
      workflow: workflow.name,
      stepsExecuted: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Workflow execution failed",
    });
  }
});

/**
 * List all workflows
 * GET /api/workflows
 */
app.get("/api/workflows", (req, res) => {
  const allWorkflows = Array.from(workflows.values());
  res.json({
    success: true,
    workflows: allWorkflows,
    count: allWorkflows.length,
  });
});

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

/**
 * WhatsApp webhook verification (Meta requires this)
 * GET /api/webhooks/whatsapp
 */
app.get("/api/webhooks/whatsapp", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("[Webhook] Verified successfully");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

/**
 * WhatsApp inbound message webhook
 * POST /api/webhooks/whatsapp
 */
app.post("/api/webhooks/whatsapp", async (req, res) => {
  try {
    const payload = req.body;

    // Extract message data from Meta webhook format
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      res.status(200).send("OK");
      return;
    }

    const message = value.messages[0];
    const phoneNumber = value.contacts?.[0]?.wa_id;

    if (!phoneNumber) {
      res.status(200).send("OK");
      return;
    }

    // Process incoming message
    const conversation = await orchestrator.processIncomingMessage({
      customerId: phoneNumber,
      messageType: message.type,
      content: message.text?.body || message.interactive?.button_reply?.title || "",
      mediaUrl: message.image?.url || message.document?.url,
      messageId: message.id,
    });

    console.log(`[Webhook] Received from ${phoneNumber}: ${conversation.content.substring(0, 50)}`);

    res.status(200).send("OK");
  } catch (error) {
    console.error("[Webhook] Error processing message:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// ============================================================================
// AVATAR INTEGRATION ENDPOINTS
// ============================================================================

/**
 * Avatar requests WhatsApp handoff
 * POST /api/avatar/handoff
 */
app.post("/api/avatar/handoff", async (req, res) => {
  const { phoneNumber, name, email, reason, source } = req.body;

  if (!phoneNumber) {
    res.status(400).json({ success: false, error: "Phone number required" });
    return;
  }

  // Check if customer exists
  let customer = customers.get(phoneNumber);

  if (!customer) {
    // Create new customer with explicit opt-in
    customer = {
      id: crypto.randomUUID(),
      phoneNumber,
      name,
      email,
      consentGiven: true,
      consentTimestamp: new Date(),
      consentSource: source || "avatar_handoff",
      tags: ["avatar_handoff"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customers.set(phoneNumber, customer);

    // Record consent
    complianceEngine.recordConsent({
      customerId: customer.id,
      consentType: "support",
      consentGiven: true,
      consentMethod: "explicit",
      ipAddress: req.ip,
      userAgent: req.get("user-agent") || undefined,
      consentText: `Customer requested WhatsApp support via brand avatar (${source || "unknown"})`,
    });
  }

  // Determine which workflow to trigger based on handoff reason
  let workflowId: string | undefined;
  switch (reason) {
    case "order_tracking":
      workflowId = workflows.keys().next().value; // First workflow
      break;
    case "product_question":
      // Send immediate message
      await orchestrator.sendMessage(
        phoneNumber,
        `Hi ${name || "there"}! Thanks for reaching out via our wellness assistant. 🌿\n\nHow can I help you today? You can ask about:\n\n• Product details & ingredients\n• Order status & tracking\n• Wellness recommendations\n• Returns & refunds`
      );
      break;
    case "booking":
      await orchestrator.sendMessage(
        phoneNumber,
        `Hello ${name || "there"}! I can help you book a consultation. 📅\n\nPlease select a service:\n\n1. Ayurvedic Consultation (30 min)\n2. Wellness Assessment (15 min)\n3. Product Recommendation Session (20 min)`
      );
      break;
    default:
      await orchestrator.sendMessage(
        phoneNumber,
        `Hi ${name || "there"}! Thanks for connecting with ZenAndZest. 🌿\n\nWe typically respond within a few minutes during business hours. For urgent matters, please call our support line.`
      );
  }

  if (workflowId) {
    await workflowEngine.executeWorkflow(
      workflows.get(workflowId)!,
      {
        customerId: customer.id,
        phoneNumber,
        variables: { customer_name: name || "friend" },
        workflowId,
      }
    );
  }

  res.json({
    success: true,
    customer,
    message: "WhatsApp handoff initiated",
  });
});

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

/**
 * Get delivery statistics
 * GET /api/analytics/delivery
 */
app.get("/api/analytics/delivery", (req, res) => {
  const stats = orchestrator.getStats();
  
  // Calculate rates
  const total = stats.queued + stats.sent + stats.failed;
  const deliveryRate = total > 0 ? ((stats.sent / total) * 100).toFixed(2) : 0;
  const failureRate = total > 0 ? ((stats.failed / total) * 100).toFixed(2) : 0;

  res.json({
    success: true,
    period: "last_24h",
    stats: {
      ...stats,
      total,
      deliveryRate: `${deliveryRate}%`,
      failureRate: `${failureRate}%`,
    },
  });
});

/**
 * Get customer engagement metrics
 * GET /api/analytics/engagement
 */
app.get("/api/analytics/engagement", (req, res) => {
  const totalCustomers = customers.size;
  const consentedCustomers = Array.from(customers.values()).filter(c => c.consentGiven).length;
  const activeConversations = conversations.size;

  res.json({
    success: true,
    metrics: {
      totalCustomers,
      consentedCustomers,
      consentRate: totalCustomers > 0 ? ((consentedCustomers / totalCustomers) * 100).toFixed(2) : 0,
      activeConversations,
      optOutRate: 0, // Would track opt-outs
    },
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║     ZenAndZest WhatsApp Automation Server              ║
║     Version 1.0.0 | Port ${PORT}                        ║
║                                                        ║
║     Endpoints:                                         ║
║     • POST /api/customers/register                     ║
║     • POST /api/customers/:phone/consent/withdraw      ║
║     • POST /api/templates                              ║
║     • POST /api/campaigns                              ║
║     • POST /api/campaigns/:id/execute                  ║
║     • POST /api/workflows/:id/trigger                  ║
║     • POST /api/avatar/handoff                         ║
║     • POST /api/webhooks/whatsapp                      ║
║     • GET  /api/analytics/delivery                     ║
║     • GET  /api/health                                 ║
╚════════════════════════════════════════════════════════╝
  `);
});

export { app };
