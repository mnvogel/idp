import { 
  ComputerSystem, 
  HardwareSpecification, 
  OperatingSystem, 
  InstalledSoftware,
  MaintenanceRecord,
  EntraUser,
  EntraGroup,
  AccessRequest,
  JiraTicket,
  JiraAsset,
  Workflow,
  WorkflowInstance,
  DashboardConfig
} from '../types/assetManagement';

// Mock Computer Systems
export const computerSystems: ComputerSystem[] = [
  {
    id: 'sys-001',
    hostname: 'LAPTOP-DEV001',
    assetTag: 'IT-LAP-001',
    serialNumber: 'XYZ123456789',
    model: 'ThinkPad X1 Carbon',
    manufacturer: 'Lenovo',
    type: 'laptop',
    status: 'active',
    purchaseDate: '2022-06-15',
    warrantyExpiration: '2025-06-15',
    lastUpdated: '2023-05-10',
    assignedTo: 'user1',
    department: 'Engineering',
    location: 'New York Office'
  },
  {
    id: 'sys-002',
    hostname: 'DESKTOP-MKT002',
    assetTag: 'IT-DSK-002',
    serialNumber: 'ABC987654321',
    model: 'OptiPlex 7090',
    manufacturer: 'Dell',
    type: 'desktop',
    status: 'active',
    purchaseDate: '2022-03-10',
    warrantyExpiration: '2025-03-10',
    lastUpdated: '2023-04-22',
    assignedTo: 'user2',
    department: 'Marketing',
    location: 'San Francisco Office'
  },
  {
    id: 'sys-003',
    hostname: 'SRV-APP-001',
    assetTag: 'IT-SRV-001',
    serialNumber: 'SRV123456789',
    model: 'PowerEdge R740',
    manufacturer: 'Dell',
    type: 'server',
    status: 'active',
    purchaseDate: '2021-11-05',
    warrantyExpiration: '2026-11-05',
    lastUpdated: '2023-06-01',
    department: 'IT',
    location: 'Primary Data Center'
  },
  {
    id: 'sys-004',
    hostname: 'LAPTOP-FIN001',
    assetTag: 'IT-LAP-004',
    serialNumber: 'LPT987654321',
    model: 'MacBook Pro 16"',
    manufacturer: 'Apple',
    type: 'laptop',
    status: 'maintenance',
    purchaseDate: '2022-01-20',
    warrantyExpiration: '2025-01-20',
    lastUpdated: '2023-06-10',
    assignedTo: 'user4',
    department: 'Finance',
    location: 'Chicago Office',
    notes: 'Sent for battery replacement'
  },
  {
    id: 'sys-005',
    hostname: 'VM-TEST-001',
    assetTag: 'IT-VM-001',
    serialNumber: 'N/A',
    model: 'Virtual Machine',
    manufacturer: 'VMware',
    type: 'virtual machine',
    status: 'active',
    purchaseDate: '2023-01-15',
    warrantyExpiration: 'N/A',
    lastUpdated: '2023-06-12',
    department: 'QA',
    location: 'Cloud'
  },
  {
    id: 'sys-006',
    hostname: 'DESKTOP-HR001',
    assetTag: 'IT-DSK-006',
    serialNumber: 'DSK123456789',
    model: 'OptiPlex 5090',
    manufacturer: 'Dell',
    type: 'desktop',
    status: 'inactive',
    purchaseDate: '2020-05-12',
    warrantyExpiration: '2023-05-12',
    lastUpdated: '2023-05-30',
    department: 'HR',
    location: 'New York Office',
    notes: 'Warranty expired, scheduled for replacement'
  }
];

// Mock Hardware Specifications
export const hardwareSpecifications: HardwareSpecification[] = [
  {
    systemId: 'sys-001',
    cpu: 'Intel Core i7-1165G7',
    cpuCores: 4,
    ramTotal: 16,
    diskTotal: 512,
    diskFree: 256,
    networkInterfaces: [
      {
        name: 'Ethernet',
        macAddress: '00:1A:2B:3C:4D:5E',
        ipAddress: '192.168.1.101',
        isWireless: false
      },
      {
        name: 'Wi-Fi',
        macAddress: '00:1A:2B:3C:4D:5F',
        ipAddress: '192.168.1.102',
        isWireless: true
      }
    ],
    peripherals: [
      {
        type: 'Monitor',
        manufacturer: 'Dell',
        model: 'P2419H',
        serialNumber: 'MON123456'
      },
      {
        type: 'Keyboard',
        manufacturer: 'Logitech',
        model: 'MX Keys',
        serialNumber: 'KB987654'
      }
    ]
  },
  {
    systemId: 'sys-002',
    cpu: 'Intel Core i5-11500',
    cpuCores: 6,
    ramTotal: 32,
    diskTotal: 1000,
    diskFree: 650,
    networkInterfaces: [
      {
        name: 'Ethernet',
        macAddress: '00:2B:3C:4D:5E:6F',
        ipAddress: '192.168.1.103',
        isWireless: false
      }
    ],
    peripherals: [
      {
        type: 'Monitor',
        manufacturer: 'Dell',
        model: 'U2720Q',
        serialNumber: 'MON789012'
      }
    ]
  },
  {
    systemId: 'sys-003',
    cpu: 'Intel Xeon Gold 6248R',
    cpuCores: 24,
    ramTotal: 128,
    diskTotal: 4000,
    diskFree: 2500,
    networkInterfaces: [
      {
        name: 'Ethernet 1',
        macAddress: '00:3C:4D:5E:6F:7G',
        ipAddress: '10.0.0.10',
        isWireless: false
      },
      {
        name: 'Ethernet 2',
        macAddress: '00:3C:4D:5E:6F:7H',
        ipAddress: '10.0.0.11',
        isWireless: false
      }
    ],
    peripherals: []
  }
];

// Mock Operating Systems
export const operatingSystems: OperatingSystem[] = [
  {
    systemId: 'sys-001',
    name: 'Windows',
    version: '11 Pro',
    architecture: 'x64',
    lastBootTime: '2023-06-14T08:30:00Z',
    installDate: '2022-06-15',
    lastUpdated: '2023-06-10',
    patchLevel: '22H2'
  },
  {
    systemId: 'sys-002',
    name: 'Windows',
    version: '10 Enterprise',
    architecture: 'x64',
    lastBootTime: '2023-06-13T09:15:00Z',
    installDate: '2022-03-10',
    lastUpdated: '2023-06-05',
    patchLevel: '21H2'
  },
  {
    systemId: 'sys-003',
    name: 'Ubuntu Server',
    version: '22.04 LTS',
    architecture: 'x64',
    lastBootTime: '2023-05-30T00:00:00Z',
    installDate: '2021-11-05',
    lastUpdated: '2023-06-01',
    patchLevel: 'Latest'
  },
  {
    systemId: 'sys-004',
    name: 'macOS',
    version: 'Ventura',
    architecture: 'ARM64',
    lastBootTime: '2023-06-12T08:45:00Z',
    installDate: '2022-01-20',
    lastUpdated: '2023-06-01',
    patchLevel: '13.4'
  },
  {
    systemId: 'sys-005',
    name: 'Windows',
    version: 'Server 2022',
    architecture: 'x64',
    lastBootTime: '2023-06-01T00:00:00Z',
    installDate: '2023-01-15',
    lastUpdated: '2023-06-10',
    patchLevel: 'Latest'
  }
];

// Mock Installed Software
export const installedSoftware: InstalledSoftware[] = [
  {
    id: 'sw-001',
    systemId: 'sys-001',
    name: 'Microsoft Office',
    version: '365',
    installDate: '2022-06-16',
    publisher: 'Microsoft',
    licenseType: 'commercial',
    licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    expirationDate: '2024-06-16',
    size: 4500
  },
  {
    id: 'sw-002',
    systemId: 'sys-001',
    name: 'Visual Studio Code',
    version: '1.78.2',
    installDate: '2022-06-16',
    publisher: 'Microsoft',
    licenseType: 'open source',
    size: 350
  },
  {
    id: 'sw-003',
    systemId: 'sys-001',
    name: 'Google Chrome',
    version: '114.0.5735.110',
    installDate: '2022-06-16',
    publisher: 'Google',
    licenseType: 'freeware',
    size: 280
  },
  {
    id: 'sw-004',
    systemId: 'sys-002',
    name: 'Adobe Creative Cloud',
    version: '2023',
    installDate: '2022-03-11',
    publisher: 'Adobe',
    licenseType: 'commercial',
    licenseKey: 'YYYYY-YYYYY-YYYYY-YYYYY-YYYYY',
    expirationDate: '2024-03-11',
    size: 7500
  },
  {
    id: 'sw-005',
    systemId: 'sys-003',
    name: 'Docker',
    version: '23.0.5',
    installDate: '2021-11-06',
    publisher: 'Docker Inc.',
    licenseType: 'open source',
    size: 550
  }
];

// Mock Maintenance Records
export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'maint-001',
    systemId: 'sys-001',
    type: 'scheduled',
    description: 'Annual hardware inspection and cleaning',
    performedBy: 'John Technician',
    date: '2023-05-10',
    duration: 60,
    notes: 'Replaced thermal paste, cleaned fans'
  },
  {
    id: 'maint-002',
    systemId: 'sys-004',
    type: 'repair',
    description: 'Battery replacement',
    performedBy: 'Apple Service Center',
    date: '2023-06-10',
    duration: 120,
    cost: 199,
    notes: 'Battery was swelling, replaced under warranty'
  },
  {
    id: 'maint-003',
    systemId: 'sys-003',
    type: 'upgrade',
    description: 'RAM upgrade',
    performedBy: 'IT Support Team',
    date: '2023-04-15',
    duration: 45,
    cost: 450,
    notes: 'Upgraded from 64GB to 128GB RAM'
  }
];

// Mock Entra Users
export const entraUsers: EntraUser[] = [
  {
    id: 'user1',
    displayName: 'Alex Johnson',
    userPrincipalName: 'alex.johnson@company.com',
    mail: 'alex.johnson@company.com',
    jobTitle: 'Frontend Lead',
    department: 'Engineering',
    officeLocation: 'New York Office',
    mobilePhone: '+1 (555) 123-4567',
    securityGroups: ['developers', 'frontend-team', 'admin-users']
  },
  {
    id: 'user2',
    displayName: 'Sarah Chen',
    userPrincipalName: 'sarah.chen@company.com',
    mail: 'sarah.chen@company.com',
    jobTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    officeLocation: 'San Francisco Office',
    mobilePhone: '+1 (555) 234-5678',
    securityGroups: ['developers', 'frontend-team']
  },
  {
    id: 'user3',
    displayName: 'Michael Rodriguez',
    userPrincipalName: 'michael.rodriguez@company.com',
    mail: 'michael.rodriguez@company.com',
    jobTitle: 'Backend Lead',
    department: 'Engineering',
    officeLocation: 'New York Office',
    mobilePhone: '+1 (555) 345-6789',
    securityGroups: ['developers', 'backend-team', 'admin-users']
  },
  {
    id: 'user4',
    displayName: 'Emily Wong',
    userPrincipalName: 'emily.wong@company.com',
    mail: 'emily.wong@company.com',
    jobTitle: 'Finance Director',
    department: 'Finance',
    officeLocation: 'Chicago Office',
    mobilePhone: '+1 (555) 456-7890',
    securityGroups: ['finance-team', 'leadership']
  }
];

// Mock Entra Groups
export const entraGroups: EntraGroup[] = [
  {
    id: 'developers',
    displayName: 'Developers',
    description: 'All development staff',
    members: ['user1', 'user2', 'user3']
  },
  {
    id: 'frontend-team',
    displayName: 'Frontend Team',
    description: 'Frontend developers',
    members: ['user1', 'user2']
  },
  {
    id: 'backend-team',
    displayName: 'Backend Team',
    description: 'Backend developers',
    members: ['user3']
  },
  {
    id: 'admin-users',
    displayName: 'Admin Users',
    description: 'Users with administrative privileges',
    members: ['user1', 'user3']
  },
  {
    id: 'finance-team',
    displayName: 'Finance Team',
    description: 'Finance department staff',
    members: ['user4']
  },
  {
    id: 'leadership',
    displayName: 'Leadership',
    description: 'Company leadership and directors',
    members: ['user4']
  }
];

// Mock Access Requests
export const accessRequests: AccessRequest[] = [
  {
    id: 'req-001',
    requesterId: 'user2',
    resourceId: 'sys-003',
    resourceType: 'system',
    accessLevel: 'read',
    justification: 'Need to analyze server logs for performance optimization',
    status: 'pending',
    requestedAt: '2023-06-14T10:30:00Z',
    expiresAt: '2023-06-21T10:30:00Z'
  },
  {
    id: 'req-002',
    requesterId: 'user3',
    resourceId: 'data-warehouse',
    resourceType: 'data',
    accessLevel: 'write',
    justification: 'Working on data integration project',
    status: 'approved',
    requestedAt: '2023-06-10T14:15:00Z',
    expiresAt: '2023-07-10T14:15:00Z',
    approvedBy: 'user1',
    approvedAt: '2023-06-10T16:30:00Z'
  },
  {
    id: 'req-003',
    requesterId: 'user4',
    resourceId: 'financial-reporting-app',
    resourceType: 'application',
    accessLevel: 'admin',
    justification: 'Need to configure end-of-quarter reporting',
    status: 'denied',
    requestedAt: '2023-06-05T09:45:00Z',
    approvedBy: 'user1',
    approvedAt: '2023-06-05T11:20:00Z'
  }
];

// Mock Jira Tickets
export const jiraTickets: JiraTicket[] = [
  {
    id: 'jira-001',
    key: 'IT-1234',
    summary: 'Laptop battery replacement',
    description: 'MacBook Pro battery is swelling and needs replacement',
    status: 'In Progress',
    priority: 'high',
    assignee: 'IT Support Team',
    reporter: 'user4',
    createdAt: '2023-06-08T09:30:00Z',
    updatedAt: '2023-06-10T11:45:00Z',
    dueDate: '2023-06-15T00:00:00Z',
    linkedAssets: ['sys-004']
  },
  {
    id: 'jira-002',
    key: 'IT-1235',
    summary: 'New developer workstation setup',
    description: 'Need to set up a new workstation for incoming developer',
    status: 'Open',
    priority: 'medium',
    assignee: 'IT Support Team',
    reporter: 'user1',
    createdAt: '2023-06-12T14:00:00Z',
    updatedAt: '2023-06-12T14:00:00Z',
    dueDate: '2023-06-20T00:00:00Z',
    linkedAssets: []
  },
  {
    id: 'jira-003',
    key: 'IT-1236',
    summary: 'Server maintenance',
    description: 'Scheduled maintenance for application server',
    status: 'Planned',
    priority: 'medium',
    assignee: 'Server Admin Team',
    reporter: 'user3',
    createdAt: '2023-06-10T10:15:00Z',
    updatedAt: '2023-06-11T09:30:00Z',
    dueDate: '2023-06-25T00:00:00Z',
    linkedAssets: ['sys-003']
  }
];

// Mock Jira Assets
export const jiraAssets: JiraAsset[] = [
  {
    id: 'jira-asset-001',
    name: 'Lenovo ThinkPad X1 Carbon',
    type: 'Laptop',
    status: 'In Use',
    assignee: 'Alex Johnson',
    purchaseDate: '2022-06-15',
    purchasePrice: 1499.99,
    supplier: 'Lenovo Direct',
    warrantyExpirationDate: '2025-06-15',
    lastUpdated: '2023-05-10'
  },
  {
    id: 'jira-asset-002',
    name: 'Dell OptiPlex 7090',
    type: 'Desktop',
    status: 'In Use',
    assignee: 'Sarah Chen',
    purchaseDate: '2022-03-10',
    purchasePrice: 1299.99,
    supplier: 'Dell Business',
    warrantyExpirationDate: '2025-03-10',
    lastUpdated: '2023-04-22'
  },
  {
    id: 'jira-asset-003',
    name: 'Dell PowerEdge R740',
    type: 'Server',
    status: 'In Use',
    purchaseDate: '2021-11-05',
    purchasePrice: 5499.99,
    supplier: 'Dell Enterprise',
    warrantyExpirationDate: '2026-11-05',
    lastUpdated: '2023-06-01'
  }
];

// Mock Workflows
export const workflows: Workflow[] = [
  {
    id: 'wf-001',
    name: 'New Employee Onboarding',
    description: 'Process for setting up new employee with necessary equipment and access',
    createdBy: 'user1',
    createdAt: '2023-01-10T09:00:00Z',
    updatedAt: '2023-03-15T14:30:00Z',
    isActive: true,
    steps: [
      {
        id: 'wf-001-step-1',
        name: 'HR Approval',
        description: 'HR approves the equipment request',
        type: 'approval',
        assignedTo: 'hr-team',
        status: 'pending',
        order: 1,
        timeEstimate: 480,
        dependencies: []
      },
      {
        id: 'wf-001-step-2',
        name: 'Equipment Procurement',
        description: 'IT procures the necessary equipment',
        type: 'action',
        assignedTo: 'it-procurement',
        status: 'pending',
        order: 2,
        timeEstimate: 2880,
        dependencies: ['wf-001-step-1']
      },
      {
        id: 'wf-001-step-3',
        name: 'Equipment Setup',
        description: 'IT sets up the equipment with required software',
        type: 'action',
        assignedTo: 'it-support',
        status: 'pending',
        order: 3,
        timeEstimate: 240,
        dependencies: ['wf-001-step-2']
      },
      {
        id: 'wf-001-step-4',
        name: 'Access Provisioning',
        description: 'IT provisions necessary system access',
        type: 'action',
        assignedTo: 'it-security',
        status: 'pending',
        order: 4,
        timeEstimate: 120,
        dependencies: ['wf-001-step-1']
      },
      {
        id: 'wf-001-step-5',
        name: 'Manager Notification',
        description: 'Notify manager that equipment is ready',
        type: 'notification',
        status: 'pending',
        order: 5,
        timeEstimate: 10,
        dependencies: ['wf-001-step-3', 'wf-001-step-4']
      }
    ]
  },
  {
    id: 'wf-002',
    name: 'Equipment Repair Process',
    description: 'Process for handling equipment repair requests',
    createdBy: 'user3',
    createdAt: '2023-02-05T11:30:00Z',
    updatedAt: '2023-02-05T11:30:00Z',
    isActive: true,
    steps: [
      {
        id: 'wf-002-step-1',
        name: 'Initial Assessment',
        description: 'IT performs initial assessment of the issue',
        type: 'action',
        assignedTo: '<boltAction type="file" filePath="src/data/mockAssetData.ts">        assignedTo: 'it-support',
        status: 'pending',
        order: 1,
        timeEstimate: 60,
        dependencies: []
      },
      {
        id: 'wf-002-step-2',
        name: 'Repair Approval',
        description: 'Manager approves the repair cost',
        type: 'approval',
        assignedTo: 'manager',
        status: 'pending',
        order: 2,
        timeEstimate: 480,
        dependencies: ['wf-002-step-1']
      },
      {
        id: 'wf-002-step-3',
        name: 'Repair Execution',
        description: 'IT or vendor performs the repair',
        type: 'action',
        assignedTo: 'it-support',
        status: 'pending',
        order: 3,
        timeEstimate: 1440,
        dependencies: ['wf-002-step-2']
      },
      {
        id: 'wf-002-step-4',
        name: 'Quality Check',
        description: 'IT verifies the repair quality',
        type: 'action',
        assignedTo: 'it-support',
        status: 'pending',
        order: 4,
        timeEstimate: 60,
        dependencies: ['wf-002-step-3']
      },
      {
        id: 'wf-002-step-5',
        name: 'User Notification',
        description: 'Notify user that equipment is repaired',
        type: 'notification',
        status: 'pending',
        order: 5,
        timeEstimate: 10,
        dependencies: ['wf-002-step-4']
      }
    ]
  }
];

// Mock Workflow Instances
export const workflowInstances: WorkflowInstance[] = [
  {
    id: 'wf-inst-001',
    workflowId: 'wf-001',
    initiatedBy: 'user1',
    initiatedAt: '2023-06-01T09:00:00Z',
    status: 'in-progress',
    currentStepId: 'wf-001-step-3',
    stepStatuses: {
      'wf-001-step-1': {
        stepId: 'wf-001-step-1',
        status: 'completed',
        assignedTo: 'hr-team',
        startedAt: '2023-06-01T09:00:00Z',
        completedAt: '2023-06-01T14:30:00Z',
        notes: 'Approved standard developer equipment package'
      },
      'wf-001-step-2': {
        stepId: 'wf-001-step-2',
        status: 'completed',
        assignedTo: 'it-procurement',
        startedAt: '2023-06-01T14:30:00Z',
        completedAt: '2023-06-05T11:00:00Z',
        notes: 'Ordered ThinkPad X1 Carbon, docking station, and monitors'
      },
      'wf-001-step-3': {
        stepId: 'wf-001-step-3',
        status: 'in-progress',
        assignedTo: 'it-support',
        startedAt: '2023-06-05T13:00:00Z',
        notes: 'Installing required development software'
      },
      'wf-001-step-4': {
        stepId: 'wf-001-step-4',
        status: 'in-progress',
        assignedTo: 'it-security',
        startedAt: '2023-06-01T15:00:00Z',
        notes: 'Setting up VPN and repository access'
      }
    }
  },
  {
    id: 'wf-inst-002',
    workflowId: 'wf-002',
    initiatedBy: 'user4',
    initiatedAt: '2023-06-08T10:00:00Z',
    status: 'in-progress',
    currentStepId: 'wf-002-step-3',
    stepStatuses: {
      'wf-002-step-1': {
        stepId: 'wf-002-step-1',
        status: 'completed',
        assignedTo: 'it-support',
        startedAt: '2023-06-08T10:30:00Z',
        completedAt: '2023-06-08T11:15:00Z',
        notes: 'Battery is swelling and needs replacement'
      },
      'wf-002-step-2': {
        stepId: 'wf-002-step-2',
        status: 'completed',
        assignedTo: 'manager',
        startedAt: '2023-06-08T11:15:00Z',
        completedAt: '2023-06-09T09:30:00Z',
        notes: 'Approved repair under warranty'
      },
      'wf-002-step-3': {
        stepId: 'wf-002-step-3',
        status: 'in-progress',
        assignedTo: 'it-support',
        startedAt: '2023-06-09T13:00:00Z',
        notes: 'Sent to Apple Service Center for repair'
      }
    }
  }
];

// Mock Dashboard Configs
export const dashboardConfigs: DashboardConfig[] = [
  {
    id: 'dash-001',
    userId: 'user1',
    name: 'IT Admin Dashboard',
    description: 'Overview of IT systems and pending tasks',
    isDefault: true,
    layout: {
      widgets: [
        {
          id: 'widget-001',
          type: 'asset-count',
          title: 'Asset Status Overview',
          size: 'medium',
          position: { x: 0, y: 0, w: 6, h: 2 },
          config: {
            groupBy: 'status'
          }
        },
        {
          id: 'widget-002',
          type: 'maintenance-status',
          title: 'Upcoming Maintenance',
          size: 'medium',
          position: { x: 6, y: 0, w: 6, h: 2 },
          config: {
            daysAhead: 30
          }
        },
        {
          id: 'widget-003',
          type: 'workflow-status',
          title: 'Active Workflows',
          size: 'large',
          position: { x: 0, y: 2, w: 12, h: 3 },
          config: {
            showOnlyBlocked: false
          }
        },
        {
          id: 'widget-004',
          type: 'expiring-warranties',
          title: 'Expiring Warranties',
          size: 'medium',
          position: { x: 0, y: 5, w: 6, h: 2 },
          config: {
            monthsAhead: 3
          }
        },
        {
          id: 'widget-005',
          type: 'software-compliance',
          title: 'Software License Status',
          size: 'medium',
          position: { x: 6, y: 5, w: 6, h: 2 },
          config: {
            showExpiringSoon: true
          }
        }
      ]
    },
    createdAt: '2023-03-10T09:00:00Z',
    updatedAt: '2023-06-01T14:30:00Z'
  },
  {
    id: 'dash-002',
    userId: 'user3',
    name: 'Development Infrastructure',
    description: 'Overview of development servers and environments',
    isDefault: true,
    layout: {
      widgets: [
        {
          id: 'widget-006',
          type: 'hardware-health',
          title: 'Server Health',
          size: 'large',
          position: { x: 0, y: 0, w: 12, h: 3 },
          config: {
            showOnlyCritical: false
          }
        },
        {
          id: 'widget-007',
          type: 'ticket-status',
          title: 'Open Infrastructure Tickets',
          size: 'medium',
          position: { x: 0, y: 3, w: 6, h: 2 },
          config: {
            filterByType: 'infrastructure'
          }
        },
        {
          id: 'widget-008',
          type: 'recent-activities',
          title: 'Recent Activities',
          size: 'medium',
          position: { x: 6, y: 3, w: 6, h: 2 },
          config: {
            limit: 10
          }
        }
      ]
    },
    createdAt: '2023-04-05T11:30:00Z',
    updatedAt: '2023-05-20T16:45:00Z'
  }
];
