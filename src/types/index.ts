export interface Service {
  id: string;
  name: string;
  description: string;
  owner: string;
  tier: 'critical' | 'high' | 'medium' | 'low';
  status: 'healthy' | 'degraded' | 'outage';
  repository: string;
  language: string;
  team: string;
  dependencies: string[];
  documentation: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  services: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface AnsibleJob {
  id: string;
  name: string;
  status: 'running' | 'successful' | 'failed' | 'pending';
  startTime: string;
  endTime?: string;
  template: string;
  initiatedBy: string;
}

export interface AzureDevOpsPipeline {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'canceled';
  branch: string;
  repository: string;
  startTime: string;
  endTime?: string;
  triggeredBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  avatar: string;
  team: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface DeploymentMetrics {
  totalDeployments: number;
  successRate: number;
  averageDuration: string;
  deploymentFrequency: string;
  recentSuccesses: number;
  recentFailures: number;
}
