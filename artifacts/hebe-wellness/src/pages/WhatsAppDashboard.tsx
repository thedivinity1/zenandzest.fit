/**
 * WhatsApp Marketing Automation Dashboard
 * 
 * Admin dashboard for managing WhatsApp campaigns, templates, workflows, and analytics.
 */

import { useState, useEffect } from "react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: "draft" | "scheduled" | "sending" | "completed" | "paused" | "active";
  targetAudience: string;
  scheduledAt?: string;
}

interface Template {
  id: string;
  name: string;
  category: "marketing" | "utility" | "authentication" | "service";
  language: string;
  status: "draft" | "pending_approval" | "approved" | "rejected";
}

// Fix the primaryColor reference
const primaryColor = "#c9a84c";

export default function WhatsAppDashboard() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "templates" | "workflows" | "analytics">("campaigns");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    consentedCustomers: 0,
    activeConversations: 0,
  });

  useEffect(() => {
    // Fetch data from backend
    Promise.all([
      fetch("/api/templates").then(r => r.json()),
      fetch("/api/analytics/engagement").then(r => r.json()),
      fetch("/api/health").then(r => r.json()),
    ]).then(([templatesData, engagementData, healthData]) => {
      if (templatesData.success) {
        setTemplates(templatesData.templates);
      }
      if (engagementData.success) {
        setStats({
          totalCustomers: engagementData.metrics.totalCustomers,
          consentedCustomers: engagementData.metrics.consentedCustomers,
          activeConversations: engagementData.metrics.activeConversations,
        });
      }
      if (healthData.activeWorkflows) {
        setCampaigns(prev => [...prev, {
          id: "wf_001",
          name: "Cart Recovery",
          description: "Automated cart abandonment recovery",
          status: "active",
          targetAudience: "Cart abandonners",
        }]);
      }
    }).catch(console.error);
  }, []);

  const tabs = [
    { id: "campaigns", label: "Campaigns", icon: "📧" },
    { id: "templates", label: "Templates", icon: "📝" },
    { id: "workflows", label: "Workflows", icon: "⚡" },
    { id: "analytics", label: "Analytics", icon: "📊" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--darkest)",
      padding: "2rem",
      fontFamily: "var(--font-sans)",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        marginBottom: "2rem",
      }}>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "var(--gold)",
          marginBottom: "0.5rem",
        }}>
          WhatsApp Automation
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "1rem",
        }}>
          Manage campaigns, templates, and workflows for your WhatsApp marketing automation.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}>
        {[
          { label: "Total Customers", value: stats.totalCustomers, icon: "👥", color: "#3B82F6" },
          { label: "Consented", value: stats.consentedCustomers, icon: "✅", color: "#10B981" },
          { label: "Active Conversations", value: stats.activeConversations, icon: "💬", color: "#8B5CF6" },
          { label: "Templates", value: templates.length, icon: "📝", color: "#F59E0B" },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${stat.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "white",
                fontFamily: "var(--font-serif)",
                marginTop: 4,
              }}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        gap: "0.5rem",
        marginBottom: "2rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "0.5rem",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "0.75rem 1.25rem",
              background: activeTab === tab.id ? `${primaryColor || '#c9a84c'}20` : "transparent",
              border: "none",
              borderRadius: 12,
              color: activeTab === tab.id ? "var(--gold)" : "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span style={{ marginRight: 8 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {activeTab === "campaigns" && (
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}>
              <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700 }}>
                Active Campaigns
              </h2>
              <button style={{
                padding: "0.75rem 1.5rem",
                background: `linear-gradient(135deg, #c9a84c 0%, #a87e30 100%)`,
                border: "none",
                borderRadius: 12,
                color: "#050908",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
              }}>
                + New Campaign
              </button>
            </div>
            {campaigns.length === 0 ? (
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "3rem",
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📧</div>
                <p>No campaigns yet. Create your first campaign to reach customers on WhatsApp.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 600, marginBottom: 4 }}>
                        {campaign.name}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                        {campaign.description}
                      </p>
                      <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginTop: "0.75rem",
                      }}>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          background: "rgba(16,185,129,0.15)",
                          borderRadius: 100,
                          fontSize: "0.75rem",
                          color: "#10B981",
                          fontWeight: 600,
                        }}>
                          {campaign.status}
                        </span>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          background: "rgba(59,130,246,0.15)",
                          borderRadius: 100,
                          fontSize: "0.75rem",
                          color: "#3B82F6",
                          fontWeight: 600,
                        }}>
                          {campaign.targetAudience}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(255,255,255,0.08)",
                        border: "none",
                        borderRadius: 8,
                        color: "white",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                      }}>
                        Edit
                      </button>
                      <button style={{
                        padding: "0.5rem 1rem",
                        background: `linear-gradient(135deg, #c9a84c 0%, #a87e30 100%)`,
                        border: "none",
                        borderRadius: 8,
                        color: "#050908",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                      }}>
                        Launch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "templates" && (
          <div>
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Message Templates
            </h2>
            {templates.length === 0 ? (
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "3rem",
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
                <p>No templates yet. Create templates for marketing, utility, and service messages.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 600, marginBottom: 4 }}>
                          {template.name}
                        </h3>
                        <div style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginTop: "0.75rem",
                        }}>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            background: "rgba(201,168,76,0.15)",
                            borderRadius: 100,
                            fontSize: "0.75rem",
                            color: "#c9a84c",
                            fontWeight: 600,
                          }}>
                            {template.category}
                          </span>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            background: "rgba(255,255,255,0.08)",
                            borderRadius: 100,
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: 600,
                          }}>
                            {template.language}
                          </span>
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            background: template.status === "approved" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                            borderRadius: 100,
                            fontSize: "0.75rem",
                            color: template.status === "approved" ? "#10B981" : "#F59E0B",
                            fontWeight: 600,
                          }}>
                            {template.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "workflows" && (
          <div>
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Automation Workflows
            </h2>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "3rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.5)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚡</div>
              <p>Workflow builder coming soon. Configure automated sequences for cart recovery, order updates, and re-engagement campaigns.</p>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Performance Analytics
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}>
              {[
                { label: "Delivery Rate", value: "98.5%", change: "+2.3%", positive: true },
                { label: "Read Rate", value: "92.1%", change: "+5.1%", positive: true },
                { label: "Opt-in Rate", value: "24.8%", change: "+12%", positive: true },
                { label: "Opt-out Rate", value: "0.8%", change: "-0.5%", positive: true },
              ].map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "1.5rem",
                  }}
                >
                  <div style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}>
                    {metric.label}
                  </div>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "white",
                    fontFamily: "var(--font-serif)",
                    marginBottom: "0.5rem",
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    fontSize: "0.85rem",
                    color: metric.positive ? "#10B981" : "#EF4444",
                    fontWeight: 600,
                  }}>
                    {metric.change} vs last period
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


