/**
 * WhatsApp Automation Workflow Engine
 * 
 * Executes multi-step automation workflows triggered by events, schedules, or manual actions.
 * Supports branching, delays, conditions, AI responses, and template sends.
 */

import { AutomationWorkflow, Conversation } from "./schemas";
import { MessageOrchestrator } from "./orchestrator";

export interface WorkflowContext {
  customerId: string;
  phoneNumber: string;
  variables: Record<string, any>;
  workflowId: string;
  executionId: string;
  startTime: Date;
}

export interface WorkflowStepResult {
  success: boolean;
  action: string;
  result?: any;
  error?: string;
  nextStep?: number;
}

export class WorkflowEngine {
  private orchestrator: MessageOrchestrator;
  private activeExecutions: Map<string, WorkflowContext> = new Map();

  constructor(orchestrator: MessageOrchestrator) {
    this.orchestrator = orchestrator;
  }

  /**
   * Execute a workflow for a customer
   */
  async executeWorkflow(
    workflow: AutomationWorkflow,
    context: Omit<WorkflowContext, "executionId" | "startTime">
  ): Promise<WorkflowStepResult[]> {
    const executionId = crypto.randomUUID();
    const fullContext: WorkflowContext = {
      ...context,
      executionId,
      startTime: new Date(),
    };

    this.activeExecutions.set(executionId, fullContext);
    const results: WorkflowStepResult[] = [];

    console.log(`[Workflow] Starting ${workflow.name} for ${context.phoneNumber}`);

    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      const previousResult = results[results.length - 1];

      // Check condition if present
      if (step.condition && !this.evaluateCondition(step.condition, fullContext.variables)) {
        console.log(`[Workflow] Step ${i} condition not met, skipping`);
        continue;
      }

      // Wait if delay specified
      if (step.delayMs && previousResult?.success) {
        console.log(`[Workflow] Waiting ${step.delayMs}ms before step ${i}`);
        await this.sleep(step.delayMs);
      }

      // Execute step
      const result = await this.executeStep(step, fullContext);
      results.push(result);

      if (!result.success && step.action !== "condition") {
        console.error(`[Workflow] Step ${i} failed: ${result.error}`);
        break;
      }

      // Handle branching
      if (result.nextStep !== undefined) {
        i = result.nextStep - 1; // -1 because loop will increment
      }
    }

    this.activeExecutions.delete(executionId);
    return results;
  }

  /**
   * Execute a single workflow step
   */
  private async executeStep(
    step: { action: string; config: Record<string, any> },
    context: WorkflowContext
  ): Promise<WorkflowStepResult> {
    switch (step.action) {
      case "send_template":
        return this.actionSendTemplate(step.config, context);
      
      case "send_message":
        return this.actionSendMessage(step.config, context);
      
      case "add_tag":
        return this.actionAddTag(step.config, context);
      
      case "wait":
        return this.actionWait(step.config, context);
      
      case "condition":
        return this.actionCondition(step.config, context);
      
      case "ai_respond":
        return this.actionAIRespond(step.config, context);
      
      default:
        return {
          success: false,
          action: step.action,
          error: `Unknown action: ${step.action}`,
        };
    }
  }

  private async actionSendTemplate(config: any, context: WorkflowContext): Promise<WorkflowStepResult> {
    try {
      const result = await this.orchestrator.sendTemplate(
        context.phoneNumber,
        config.templateName,
        config.language || "en",
        config.components || []
      );

      return {
        success: result.success,
        action: "send_template",
        result,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        action: "send_template",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async actionSendMessage(config: any, context: WorkflowContext): Promise<WorkflowStepResult> {
    try {
      const result = await this.orchestrator.sendMessage(
        context.phoneNumber,
        config.content || context.variables.message || ""
      );

      return {
        success: result.success,
        action: "send_message",
        result,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        action: "send_message",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  private async actionAddTag(config: any, context: WorkflowContext): Promise<WorkflowStepResult> {
    // Tag management would integrate with CRM
    console.log(`[Workflow] Adding tag ${config.tag} to customer ${context.customerId}`);
    return {
      success: true,
      action: "add_tag",
      result: { tag: config.tag },
    };
  }

  private async actionWait(config: any): Promise<WorkflowStepResult> {
    const delayMs = config.delayMs || 60000; // Default 60s
    await this.sleep(delayMs);
    return {
      success: true,
      action: "wait",
      result: { delayMs },
    };
  }

  private actionCondition(config: any, context: WorkflowContext): WorkflowStepResult {
    const conditionMet = this.evaluateCondition(config, context.variables);
    return {
      success: true,
      action: "condition",
      result: { conditionMet },
      nextStep: conditionMet ? config.trueNext : config.falseNext,
    };
  }

  private async actionAIRespond(config: any, context: WorkflowContext): Promise<WorkflowStepResult> {
    // AI response would integrate with LLM
    const aiResponse = await this.generateAIResponse(config, context);
    const result = await this.orchestrator.sendMessage(context.phoneNumber, aiResponse);
    
    return {
      success: result.success,
      action: "ai_respond",
      result: { response: aiResponse },
      error: result.error,
    };
  }

  private evaluateCondition(condition: { field: string; operator: string; value: any }, variables: Record<string, any>): boolean {
    const fieldValue = variables[condition.field];
    switch (condition.operator) {
      case "equals": return fieldValue === condition.value;
      case "not_equals": return fieldValue !== condition.value;
      case "greater_than": return fieldValue > condition.value;
      case "less_than": return fieldValue < condition.value;
      case "contains": return String(fieldValue).includes(condition.value);
      case "exists": return fieldValue !== undefined && fieldValue !== null;
      default: return false;
    }
  }

  private async generateAIResponse(config: any, context: WorkflowContext): Promise<string> {
    // Placeholder: would call OpenAI/Anthropic API
    return "Thank you for reaching out! How can I help you today?";
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get active executions (for monitoring)
   */
  getActiveExecutions(): WorkflowContext[] {
    return Array.from(this.activeExecutions.values());
  }
}
