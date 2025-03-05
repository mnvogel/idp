// Asset Management Types
export interface ComputerSystem {
  id: string;
  hostname: string;
  assetTag: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  type: 'desktop' | 'laptop' | 'server' | 'virtual machine' | 'mobile' | 'other';
  status: 'active' | 'inactive' | 'maintenance' | 'decommissioned';
  purchaseDate: string;
  warrantyExpiration: string;
  lastUpdated: string;
  assignedTo?: string; // User ID
  department?: string;
  location?: string;
  notes?: string;
}

export interface HardwareSpecification {
  systemId: string;
  cpu: string;
  cpuCores: number;
  ramTotal: number; // GB
  diskTotal: number; // GB
  diskFree: number; // GB
  networkInterfaces: NetworkInterface[];
  peripherals: Peripheral[];
}

export interface NetworkInterface {
  name: string;
  macAddress: string;
  ipAddress: string;
  isWireless: boolean;
}

export interface Peripheral {
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
}

export interface OperatingSystem {
  systemId: string;
  name: string;
  version: string;
  architecture: string;
  lastBootTime: string;
  installDate: string;
  lastUpdated: string;
  patchLevel: string;
}

export interface InstalledSoftware {
  id: string;
  systemId: string;
  name: string;
  version: string;
  installDate: string;
  publisher: string;
  licenseType: 'commercial' | 'open source' | 'freeware' | 'trial';
  licenseKey?: string;
  expirationDate?: string;
  size: number; // MB
}

export interface MaintenanceRecord {
  id: string;
  systemId: string;
  type: 'scheduled' | 'emergency' | 'upgrade' | 'repair';
  description: string;
  performedBy: string;
  date: string;
  duration: number; // minutes
  cost?: number;
  notes?: string;
}

// Microsoft Entra Integration Types
export interface EntraUser {
  id: string;
  displayName: string;
  userPrincipalName: string;
  mail: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  mobilePhone?: string;
  securityGroups: string[];
}

export interface EntraGroup {
  id: string;
  displayName: string;
  description?: string;
  members: string[]; // User IDs
}

export interface AccessRequest {
  id: string;
  requesterId: string;
  resourceId: string;
  resourceType: 'system' | 'application' | 'data';
  accessLevel: 'read' | 'write' | 'admin';
  justification: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  requestedAt: string;
  expiresAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

// Jira Integration Types
export interface JiraTicket {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  assignee?: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  linkedAssets: string[]; // Asset IDs
}

export interface JiraAsset {
  id: string;
  name: string;
  type: string;
  status: string;
  assignee?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  supplier?: string;
  warrantyExpirationDate?: string;
  lastUpdated: string;
}

// Workflow Types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: 'approval' | 'notification' | 'action' | 'condition';
  assignedTo?: string; // User ID or Group ID
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'skipped';
  order: number;
  timeEstimate?: number; // minutes
  actualTime?: number; // minutes
  dependencies: string[]; // Step IDs
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  initiatedBy: string;
  initiatedAt: string;
  status: 'in-progress' | 'completed' | 'cancelled';
  completedAt?: string;
  currentStepId?: string;
  stepStatuses: Record<string, WorkflowStepStatus>;
}

export interface WorkflowStepStatus {
  stepId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'skipped';
  assignedTo?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}

// Dashboard Types
export interface DashboardConfig {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isDefault: boolean;
  layout: DashboardLayout;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLayout {
  widgets: DashboardWidget[];
}

export interface DashboardWidget {
  id: string;
  type: 'asset-count' | 'maintenance-status' | 'software-compliance' | 'hardware-health' | 
        'ticket-status' | 'workflow-status' | 'recent-activities' | 'expiring-warranties' |
        'custom-query';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  config: Record<string, any>;
}
