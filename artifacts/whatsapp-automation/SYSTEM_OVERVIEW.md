# ZenAndZest WhatsApp Automation & Talking Avatar System
## Complete System Documentation

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ZENANDZEST WEBSITE                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ TalkingAvatar │  │WhatsAppOptIn │  │ WhatsAppChatWidget   │  │
│  │  Component   │  │   Banner     │  │     Component        │  │
│  │   (Zara 🌿)  │  │  (Consent)   │  │  (Floating Button)   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                     │               │
│         │    onHandoff()  │   giveConsent()     │               │
│         └─────────────────┼─────────────────────┘               │
│                           │                                     │
│                    ┌──────▼──────────────────────┐             │
│                    │   useWhatsApp Hook           │             │
│                    │   (React Context/State)      │             │
│                    └──────┬──────────────────────┘             │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                    HTTP/WebSocket
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│              WHATSAPP AUTOMATION BACKEND                        │
│                    (Express + TypeScript)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Layer                                               │  │
│  │  • POST /api/customers/register                          │  │
│  │  • POST /api/customers/:phone/consent/withdraw           │  │
│  │  • POST /api/templates                                   │  │
│  │  • POST /api/campaigns                                   │  │
│  │  • POST /api/campaigns/:id/execute                       │  │
│  │  • POST /api/workflows/:id/trigger                       │  │
│  │  • POST /api/avatar/handoff                              │  │
│  │  • POST /api/webhooks/whatsapp                           │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────────┐  │
│  │  Compliance Engine                                       │  │
│  │  • Opt-in verification                                   │  │
│  │  • 24-hour window enforcement                            │  │
│  │  • Template validation                                   │  │
│  │  • GDPR/DPDPA audit trail                                │  │
│  │  • Right to erasure                                      │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────────┐  │
│  │  Workflow Engine                                         │  │
│  │  • Cart abandonment recovery                             │  │
│  │  • Order confirmation & shipping                         │  │
│  │  • Re-engagement campaigns                               │  │
│  │  • AI-powered responses (task-specific)                  │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────▼─────────────────────────────────────┐  │
│  │  Message Orchestrator                                    │  │
│  │  • Template sending                                      │  │
│  │  • Interactive messages (buttons, lists, carousels)      │  │
│  │  • Media messages (images, videos, docs)                 │  │
│  │  • Retry logic & error handling                          │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
└───────────────────────┼─────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────────────┐
│              WHATSAPP BUSINESS API (via BSP)                       │
│                                                                   │
│  Business Solution Provider:                                       │
│  • Twilio / MessageBird / InfoBip / QuickReply / Interakt        │
│  • Handles Meta API authentication                                │
│  • Manages rate limiting & queueing                               │
│  • Provides webhook infrastructure                                │
└───────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Talking Avatar Component (`TalkingAvatar.tsx`)

**Purpose:** Brand-aligned interactive avatar that greets visitors and drives WhatsApp engagement

**Features:**
- Animated avatar with speaking indicators
- Rotating brand messages (5 pre-defined wellness-focused messages)
- Action buttons for WhatsApp handoff, order tracking, and consultation booking
- Callbacks for avatar interactions
- Brand colors: Forest green (#1a3d2e) + Gold (#c9a84c)
- Pulse animation and glow effects

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | "Zara" | Avatar name |
| `role` | string | "Wellness Guide" | Avatar title |
| `size` | "small" \| "medium" \| "large" | "medium" | Avatar size |
| `position` | "bottom-right" \| "bottom-left" \| "inline" | "bottom-right" | Position on page |
| `onHandoff` | function | - | Callback when user clicks action button |
| `primaryColor` | string | "#1a3d2e" | Brand primary color |
| `accentColor` | string | "#c9a84c" | Brand accent color |

**Integration Points:**
- Calls `onHandoff(reason)` when user clicks action buttons
- Reasons: "product_question", "order_tracking", "booking", "avatar_greeting"
- Triggers WhatsApp handoff flow

---

### 2. WhatsApp Chat Widget (`WhatsAppChatWidget.tsx`)

**Purpose:** Floating WhatsApp button and chat interface for direct customer communication

**Features:**
- Opens WhatsApp app/website with pre-filled message
- In-website chat simulation (connects to backend via webhook)
- Typing indicators and auto-reply simulation
- Message history with timestamps
- Compliance notice (opt-in/opt-out messaging)
- Brand-aligned design (forest green + gold theme)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneNumber` | string | "+919876543210" | WhatsApp Business number |
| `businessName` | string | "ZenAndZest Wellness" | Display name |
| `position` | "bottom-right" \| "bottom-left" | "bottom-right" | Widget position |
| `welcomeMessage` | string | - | Initial chat message |
| `autoReplyDelay` | number | 3000 | Simulated reply delay (ms) |

**Direct WhatsApp Link:**
```
https://wa.me/{phoneNumber}?text={encoded_message}
```

---

### 3. WhatsApp Opt-In Banner (`WhatsAppOptIn.tsx`)

**Purpose:** GDPR/DPDPA-compliant consent capture for WhatsApp messaging

**Features:**
- Appears after 5 seconds on first visit
- Stores consent decision in localStorage
- Submits consent to backend API
- Lists 4 benefits of WhatsApp connection
- Clear opt-in/opt-out buttons
- Compliance disclaimer

**Consent Flow:**
1. Banner appears → User sees benefits
2. User clicks "Yes, I'm In!" → POST to `/api/customers/register`
3. Backend records consent with full audit trail
4. localStorage key `zen_whatsapp_optin` set to "accepted"
5. Banner never shows again

---

### 4. WhatsApp Automation Backend (`whatsapp-automation/`)

**Architecture:**
- **Express.js** REST API server
- **TypeScript** with strict type checking
- **In-memory stores** (replaceable with PostgreSQL)
- **Compliance Engine** for regulatory enforcement
- **Workflow Engine** for automation execution
- **Message Orchestrator** for message dispatching

**Core Endpoints:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Server health check |
| `/api/customers/register` | POST | Register customer + consent |
| `/api/customers/:phone/consent/withdraw` | POST | GDPR consent withdrawal |
| `/api/customers/:phone/consent/audit` | GET | GDPR audit trail |
| `/api/customers/:phone` | DELETE | GDPR right to erasure |
| `/api/templates` | POST | Create message template |
| `/api/templates` | GET | List all templates |
| `/api/campaigns` | POST | Create campaign |
| `/api/campaigns/:id/execute` | POST | Execute campaign |
| `/api/workflows` | GET | List workflows |
| `/api/workflows/:id/trigger` | POST | Trigger workflow |
| `/api/avatar/handoff` | POST | Avatar → WhatsApp handoff |
| `/api/webhooks/whatsapp` | GET | Meta webhook verification |
| `/api/webhooks/whatsapp` | POST | Inbound message handler |
| `/api/analytics/delivery` | GET | Delivery statistics |
| `/api/analytics/engagement` | GET | Engagement metrics |

**Compliance Engine Features:**
- Double opt-in enforcement
- 24-hour messaging window checks
- Template content validation (spam detection)
- Consent audit trail (GDPR data subject access)
- Right to erasure (GDPR Article 17)
- Regional blocking support

**Workflow Engine Features:**
- Multi-step automation execution
- Conditional branching
- Delay/wait steps
- Template sending
- AI response generation placeholders
- Tag management

---

## Automation Workflows

### 1. Cart Abandonment Recovery

**Trigger:** `cart_abandoned` event (from website)
**Delay:** 1 hour after abandonment
**Steps:**
1. Wait 60 minutes
2. Send personalized reminder template (customer name, product name, cart value)
3. Wait 24 hours
4. Send incentive template (10% discount code)

**Template Variables:**
- `{{customer_name}}`
- `{{product_name}}`
- `{{cart_value}}`

### 2. Order Confirmation & Shipping

**Trigger:** `order_placed` event
**Steps:**
1. Send order confirmation template (customer name, order ID, delivery ETA)
2. Wait 48 hours
3. Send shipping update template (customer name, tracking number)

### 3. Re-engagement Campaign

**Trigger:** Weekly schedule (every Monday 10 AM)
**Target:** Inactive customers
**Steps:**
1. Send wellness tip template (customer name, personalized tip)
2. Tag customer as "reengaged_weekly"

### 4. Avatar Handoff Flows

**Product Question:**
- User clicks "Chat with me on WhatsApp"
- Sends welcome message with FAQ menu
- Routes to support team or AI

**Order Tracking:**
- User clicks "Track My Order"
- Sends order status request
- Triggers order tracking workflow

**Consultation Booking:**
- User clicks "Book a Consultation"
- Sends service menu
- Triggers booking workflow

---

## Brand Alignment

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#1a3d2e` | Primary brand color, avatar gradient |
| Gold | `#c9a84c` | Accent color, CTAs, highlights |
| Gold Light | `#e8c97a` | Hover states, gradients |
| Cream | `#fdf8f0` | Light mode backgrounds |
| Darkest | `#050908` | Dark backgrounds |

### Typography
| Font | Usage |
|------|-------|
| `Playfair Display` | Headlines, avatar name, brand text |
| `Inter` | Body text, UI elements |

### Voice & Tone
- **Warm but authoritative** — knowledgeable wellness guide
- **Calm and reassuring** — reduces anxiety about products/services
- **Personal but professional** — builds trust without being overly casual
- **Encouraging** — motivates action without pressure

---

## Compliance Documentation

### WhatsApp Business Policy
- ✅ Explicit opt-in required before messaging
- ✅ 24-hour free response window enforced
- ✅ Template messages for outbound communication
- ✅ No cold messaging or imported lists
- ✅ Opt-out mechanism (STOP keyword) implemented
- ✅ Business profile with support contact info

### GDPR (EU/UK)
- ✅ Explicit consent collection with timestamp
- ✅ Consent source documentation
- ✅ Right to access (audit trail endpoint)
- ✅ Right to erasure (DELETE endpoint)
- ✅ Data minimization (only essential fields)
- ✅ 30-day data request fulfillment
- ✅ Secure data storage (encryption at rest planned)

### DPDPA (India)
- ✅ Consent collection with clear purpose
- ✅ DND/TRAI compliance checks
- ✅ Data breach notification procedures
- ✅ Local storage consideration for EU data

### Meta AI Chatbot Policy (Jan 2026)
- ✅ Task-specific AI only (support, order tracking, booking)
- ✅ No open-ended general-purpose chatbot
- ✅ Structured conversation paths with exit criteria
- ✅ Human handoff for complex queries

---

## Deployment Guide

### Prerequisites
1. **WhatsApp Business Account** (Meta Business Suite)
2. **Business Solution Provider** (BSP) account
3. **Node.js 22+** and **pnpm**
4. **PostgreSQL** database (for production)
5. **Redis** (for job queue)
6. **Domain with SSL** (for webhooks)

### Step 1: Meta WhatsApp Setup

1. Create Meta Business Account at business.facebook.com
2. Create WhatsApp Business Account at business.whatsapp.com
3. Generate API credentials (Phone Number ID, Business Account ID)
4. Create webhook endpoint with verify token
5. Submit message templates for approval (24-48 hours)

### Step 2: Backend Deployment

```bash
cd artifacts/whatsapp-automation
cp .env.example .env
# Edit .env with your credentials
npm install
npm run build
npm start
```

**Deployment Options:**
- **Vercel/Railway** (recommended for quick launch)
- **AWS ECS/EKS** (for enterprise scale)
- **Google Cloud Run** (serverless)
- **DigitalOcean App Platform** (simple)

### Step 3: BSP Configuration

**Recommended BSPs for ZenAndZest:**
| BSP | Best For | Pricing |
|-----|----------|---------|
| **QuickReply.ai** | DTC brands, Shopify | $50-200/month |
| **Interakt** | Indian market, DLT compliance | ₹2000-5000/month |
| **Wati** | AI capabilities, automation | $49-299/month |
| **Zoko** | Commerce-first, Shopify native | $49-199/month |

### Step 4: Frontend Integration

The frontend components are already integrated into `App.tsx`:
- `TalkingAvatar` — global floating avatar
- `WhatsAppChatWidget` — global chat button
- `WhatsAppOptIn` — consent banner

**Environment Variables:**
```env
VITE_WHATSAPP_NUMBER=+919876543210
VITE_WHATSAPP_API_URL=https://your-backend.vercel.app
```

### Step 5: Testing

```bash
# Start backend
cd artifacts/whatsapp-automation
npm run dev

# Test health endpoint
curl http://localhost:3001/health

# Test customer registration
curl -X POST http://localhost:3001/api/customers/register \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+919876543210",
    "name": "Test User",
    "consentGiven": true,
    "consentSource": "test_flow"
  }'

# Test template creation
curl -X POST http://localhost:3001/api/templates \
  -H "Content-Type: application/json" \
  -d '{
    "name": "welcome_message",
    "category": "marketing",
    "content": "Hello {{1}}, welcome to ZenAndZest! 🌿",
    "variables": ["name"]
  }'
```

---

## File Structure

```
website/artifacts/
├── hebe-wellness/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TalkingAvatar.tsx          # Brand avatar component
│   │   │   ├── WhatsAppChatWidget.tsx     # Floating WhatsApp button + chat
│   │   │   └── WhatsAppOptIn.tsx          # Consent banner
│   │   ├── pages/
│   │   │   └── WhatsAppDashboard.tsx      # Admin dashboard
│   │   ├── hooks/
│   │   │   └── useWhatsApp.ts             # React hook for WhatsApp integration
│   │   ├── App.tsx                        # Main app (components wired in)
│   │   └── index.css                      # Global styles
│   └── package.json
│
├── whatsapp-automation/
│   ├── src/
│   │   ├── index.ts                       # Express server + all routes
│   │   ├── schemas.ts                     # Zod validation schemas
│   │   ├── compliance.ts                  # GDPR/WhatsApp compliance engine
│   │   ├── workflow.ts                    # Automation workflow engine
│   │   └── orchestrator.ts                # Message dispatch & retry logic
│   ├── .env.example                       # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                          # Setup guide
```

---

## Next Steps for Production

1. **Connect Real BSP** — Replace placeholder API calls with actual BSP (Twilio/QuickReply/etc.)
2. **Database Migration** — Replace in-memory stores with PostgreSQL + Drizzle ORM
3. **Authentication** — Add JWT auth for admin dashboard
4. **AI Integration** — Connect OpenAI/Anthropic for AI responses
5. **WebSocket** — Real-time message delivery via Socket.io
6. **BullMQ Queue** — Replace simple queue with Redis-backed job queue
7. **Monitoring** — Add Sentry, logging, and health checks
8. **Analytics** — Track conversion metrics, opt-in rates, delivery stats
9. **A/B Testing** — Test avatar messages, WhatsApp templates, timing
10. **Multilingual** — Add Hindi + regional language support

---

## Support & Resources

- **Meta WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp
- **WhatsApp Business Policy:** https://whatsappbusiness.com/policy
- **GDPR Guidelines:** https://gdpr.eu/
- **QuickReply.ai** (BSP): https://quickreply.ai
- **Interakt** (BSP): https://interakt.com

---

*Built for ZenAndZest — Premium Wellness E-Commerce*
*System Version: 1.0.0 | Last Updated: July 2026*
