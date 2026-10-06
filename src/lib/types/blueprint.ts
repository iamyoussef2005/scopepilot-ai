export interface UserStory {
  id: string;
  epic: string;
  title: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  acceptanceCriteria: string[];
  complexity: "Low" | "Medium" | "High";
  isMvp: boolean;
}

export interface TechComponent {
  layer: "Frontend" | "Backend" | "Database" | "AI & Agents" | "DevOps & Cloud" | "Integrations";
  technology: string;
  rationale: string;
}

export interface SprintMilestone {
  sprintNumber: number;
  title: string;
  durationWeeks: number;
  coreDeliverables: string[];
  estimatedHours: number;
  estimatedCostUsd: number;
}

export interface ProductBlueprint {
  projectTitle: string;
  tagline: string;
  executiveSummary: string;
  targetAudience: string[];
  problemStatement: string;
  proposedSolution: string;
  mvpScope: string[];
  v2FutureScope: string[];
  techStack: TechComponent[];
  mermaidArchitecture: string;
  userStories: UserStory[];
  sprintRoadmap: SprintMilestone[];
  budgetSummary: {
    totalEstimatedWeeks: number;
    totalEstimatedHours: number;
    estimatedCostUsd: number;
    recommendedTeam: string[];
  };
}

export interface AgentStep {
  id: string;
  agentRole: string;
  title: string;
  status: "pending" | "thinking" | "completed" | "error";
  summary?: string;
  timestamp?: number;
}
