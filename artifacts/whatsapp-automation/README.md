# WhatsApp Automation Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js 22+
- PostgreSQL (for production data)
- Redis (for job queue)
- WhatsApp Business Account (via Meta Business Suite)

### 2. Install Backend Dependencies
```bash
cd artifacts/whatsapp-automation
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your WhatsApp Business API credentials
```

### 4. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:3001
```

### 5. Frontend Integration
The WhatsApp widget and avatar are already integrated into `App.tsx`.

## Production Deployment

### Option A: Deploy Backend to Vercel/Railway
1. Push `artifacts/whatsapp-automation` to your repository
2. Connect to Vercel/Railway
3. Set environment variables
4. Deploy

### Option B: Deploy Backend to AWS/Google Cloud
```bash
npm run build
npm start
```

### Option C: Use BSP-Managed Solution (Recommended for Quick Launch)
- **QuickReply.ai** - Most affordable for DTC brands
- **Interakt** - Strong Shopify integration
- **Wati** - Good AI capabilities
- **Zoko** - Commerce-focused

## Meta WhatsApp Business API Setup

1. **Create Meta Business Account**
   - Go to business.facebook.com
   - Create Business Portfolio
   - Verify business

2. **Create WhatsApp Business Account**
   - Go to business.whatsapp.com
   - Click "Create"
   - Select your Business Account
   - Add phone number

3. **Generate API Credentials**
   - Access Meta Developer Portal
   - Create WhatsApp App
   - Note: Phone Number ID, Business Account ID
   - Generate temporary token (for testing)

4. **Set Up Webhook**
   - Webhook URL: `https://your-domain.com/api/webhooks/whatsapp`
   - Verify Token: (from .env)
   - Subscribe to: messages, message_status

5. **Create Message Templates**
   - Templates require Meta approval
   - Submit templates for: order confirmations, shipping updates, promotions
   - Typical approval time: 24-48 hours

## Compliance Checklist

- [ ] Double opt-in flow implemented
- [ ] Privacy policy updated with WhatsApp messaging clause
- [ ] Consent records stored with audit trail
- [ ] Opt-out mechanism (STOP keyword) working
- [ ] Template content reviewed for compliance
- [ ] Regional regulations checked (GDPR, DPDPA, LGPD)
- [ ] Data retention policy defined
- [ ] Right to erasure implemented

## Integration Checklist

- [ ] Backend server running on port 3001
- [ ] Webhook URL accessible publicly
- [ ] Meta Business Account linked
- [ ] Message templates submitted and approved
- [ ] Frontend components integrated
- [ ] Avatar handoff logic tested
- [ ] Cart abandonment trigger connected to e-commerce
- [ ] Order tracking webhook tested
- [ ] Analytics dashboard showing data

## Testing

Test the webhook locally using ngrok:
```bash
npx ngrok http 3001
# Use the HTTPS URL for your webhook
```

Test the API endpoints:
```bash
# Health check
curl http://localhost:3001/health

# Register a customer with consent
curl -X POST http://localhost:3001/api/customers/register \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+919876543210","name":"Test User","consentGiven":true,"consentSource":"test"}'

# Create a template
curl -X POST http://localhost:3001/api/templates \
  -H "Content-Type: application/json" \
  -d '{"name":"welcome_message","category":"marketing","content":"Hello {{1}}, welcome to ZenAndZest!","variables":["name"]}'
```

## Support

For Meta WhatsApp Business API documentation:
https://developers.facebook.com/docs/whatsapp

For compliance questions:
Consult the compliance.ts module in the backend
