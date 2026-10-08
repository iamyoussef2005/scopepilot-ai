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

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  authRequired: boolean;
}

export interface CodeArtifacts {
  prismaSchema: string;
  dockerCompose: string;
  envExample?: string;
  apiEndpoints: ApiEndpoint[];
}

export interface SecurityRisk {
  category: "Authentication & Authorization" | "Data Privacy & Encryption" | "Infrastructure & DDoS" | "API Security";
  risk: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
}

export interface ComplianceItem {
  standard: "GDPR" | "SOC 2" | "OWASP Top 10" | "HIPAA" | "PCI-DSS";
  status: "Compliant by Design" | "Requires Enterprise Add-on";
  notes: string;
}

export interface SecurityProfile {
  overallScore: number;
  grade: string;
  threatRisks: SecurityRisk[];
  complianceChecklist: ComplianceItem[];
  disasterRecovery: {
    targetRto: string;
    targetRpo: string;
    backupFrequency: string;
  };
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
  codeArtifacts?: CodeArtifacts;
  securityProfile?: SecurityProfile;
}

export interface AgentStep {
  id: string;
  agentRole: string;
  title: string;
  status: "pending" | "thinking" | "completed" | "error";
  summary?: string;
  timestamp?: number;
}
