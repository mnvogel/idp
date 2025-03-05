import { Service, Team, AnsibleJob, AzureDevOpsPipeline, User, Notification } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'User Authentication Service',
    description: 'Handles user authentication and authorization across all platforms',
    owner: 'Security Team',
    tier: 'critical',
    status: 'healthy',
    repository: 'github.com/company/auth-service',
    language: 'TypeScript',
    team: 'security',
    dependencies: ['User Database', 'Logging Service'],
    documentation: 'https://docs.internal.company/auth-service'
  },
  {
    id: '2',
    name: 'Payment Processing API',
    description: 'Processes customer payments and integrates with payment gateways',
    owner: 'Payments Team',
    tier: 'critical',
    status: 'healthy',
    repository: 'github.com/company/payment-api',
    language: 'Java',
    team: 'payments',
    dependencies: ['Transaction Database', 'Fraud Detection Service', 'Notification Service'],
    documentation: 'https://docs.internal.company/payment-api'
  },
  {
    id: '3',
    name: 'Customer Dashboard',
    description: 'Frontend application for customer account management',
    owner: 'Frontend Team',
    tier: 'high',
    status: 'degraded',
    repository: 'github.com/company/customer-dashboard',
    language: 'TypeScript/React',
    team: 'frontend',
    dependencies: ['User Authentication Service', 'Account API', 'Analytics Service'],
    documentation: 'https://docs.internal.company/customer-dashboard'
  },
  {
    id: '4',
    name: 'Inventory Management Service',
    description: 'Manages product inventory and stock levels',
    owner: 'Backend Team',
    tier: 'high',
    status: 'healthy',
    repository: 'github.com/company/inventory-service',
    language: 'Python',
    team: 'backend',
    dependencies: ['Product Database', 'Warehouse API'],
    documentation: 'https://docs.internal.company/inventory-service'
  },
  {
    id: '5',
    name: 'Analytics Pipeline',
    description: 'Processes and analyzes user behavior data',
    owner: 'Data Team',
    tier: 'medium',
    status: 'healthy',
    repository: 'github.com/company/analytics-pipeline',
    language: 'Python',
    team: 'data',
    dependencies: ['Data Lake', 'ETL Service'],
    documentation: 'https://docs.internal.company/analytics-pipeline'
  },
  {
    id: '6',
    name: 'Notification Service',
    description: 'Sends notifications to users via email, SMS, and push',
    owner: 'Backend Team',
    tier: 'medium',
    status: 'outage',
    repository: 'github.com/company/notification-service',
    language: 'Go',
    team: 'backend',
    dependencies: ['User Database', 'Template Service'],
    documentation: 'https://docs.internal.company/notification-service'
  }
];

export const teams: Team[] = [
  {
    id: 'frontend',
    name: 'Frontend Team',
    description: 'Responsible for all user-facing applications and interfaces',
    members: [
      {
        id: 'user1',
        name: 'Alex Johnson',
        role: 'Frontend Lead',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'alex.johnson@company.com'
      },
      {
        id: 'user2',
        name: 'Sarah Chen',
        role: 'Senior Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'sarah.chen@company.com'
      }
    ],
    services: ['3']
  },
  {
    id: 'backend',
    name: 'Backend Team',
    description: 'Develops and maintains core backend services and APIs',
    members: [
      {
        id: 'user3',
        name: 'Michael Rodriguez',
        role: 'Backend Lead',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'michael.rodriguez@company.com'
      },
      {
        id: 'user4',
        name: 'Emily Wong',
        role: 'Senior Backend Developer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'emily.wong@company.com'
      }
    ],
    services: ['4', '6']
  },
  {
    id: 'security',
    name: 'Security Team',
    description: 'Ensures the security of all systems and handles authentication',
    members: [
      {
        id: 'user5',
        name: 'David Kim',
        role: 'Security Lead',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'david.kim@company.com'
      }
    ],
    services: ['1']
  },
  {
    id: 'payments',
    name: 'Payments Team',
    description: 'Handles all payment processing and financial transactions',
    members: [
      {
        id: 'user6',
        name: 'Jessica Patel',
        role: 'Payments Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'jessica.patel@company.com'
      }
    ],
    services: ['2']
  },
  {
    id: 'data',
    name: 'Data Team',
    description: 'Manages data pipelines, analytics, and insights',
    members: [
      {
        id: 'user7',
        name: 'Robert Wilson',
        role: 'Data Lead',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        email: 'robert.wilson@company.com'
      }
    ],
    services: ['5']
  }
];

export const ansibleJobs: AnsibleJob[] = [
  {
    id: 'job1',
    name: 'Deploy Authentication Service',
    status: 'successful',
    startTime: '2023-06-15T10:30:00Z',
    endTime: '2023-06-15T10:35:22Z',
    template: 'Auth Service Deployment',
    initiatedBy: 'David Kim'
  },
  {
    id: 'job2',
    name: 'Database Backup',
    status: 'running',
    startTime: '2023-06-15T11:00:00Z',
    template: 'Weekly DB Backup',
    initiatedBy: 'System'
  },
  {
    id: 'job3',
    name: 'Security Patch Application',
    status: 'failed',
    startTime: '2023-06-14T22:00:00Z',
    endTime: '2023-06-14T22:05:13Z',
    template: 'Security Patching',
    initiatedBy: 'David Kim'
  },
  {
    id: 'job4',
    name: 'Infrastructure Scaling',
    status: 'successful',
    startTime: '2023-06-14T15:30:00Z',
    endTime: '2023-06-14T15:45:22Z',
    template: 'Auto-scaling Playbook',
    initiatedBy: 'System'
  },
  {
    id: 'job5',
    name: 'Deploy Notification Service',
    status: 'pending',
    startTime: '2023-06-15T14:00:00Z',
    template: 'Notification Service Deployment',
    initiatedBy: 'Michael Rodriguez'
  }
];

export const azureDevOpsPipelines: AzureDevOpsPipeline[] = [
  {
    id: 'pipeline1',
    name: 'Customer Dashboard CI',
    status: 'completed',
    branch: 'main',
    repository: 'customer-dashboard',
    startTime: '2023-06-15T09:00:00Z',
    endTime: '2023-06-15T09:15:30Z',
    triggeredBy: 'Alex Johnson'
  },
  {
    id: 'pipeline2',
    name: 'Payment API CI/CD',
    status: 'running',
    branch: 'feature/new-payment-method',
    repository: 'payment-api',
    startTime: '2023-06-15T11:30:00Z',
    triggeredBy: 'Jessica Patel'
  },
  {
    id: 'pipeline3',
    name: 'Inventory Service CI',
    status: 'failed',
    branch: 'main',
    repository: 'inventory-service',
    startTime: '2023-06-15T08:00:00Z',
    endTime: '2023-06-15T08:10:15Z',
    triggeredBy: 'Emily Wong'
  },
  {
    id: 'pipeline4',
    name: 'Analytics Pipeline Build',
    status: 'completed',
    branch: 'develop',
    repository: 'analytics-pipeline',
    startTime: '2023-06-14T16:00:00Z',
    endTime: '2023-06-14T16:25:10Z',
    triggeredBy: 'Robert Wilson'
  },
  {
    id: 'pipeline5',
    name: 'Auth Service Security Scan',
    status: 'completed',
    branch: 'main',
    repository: 'auth-service',
    startTime: '2023-06-14T12:00:00Z',
    endTime: '2023-06-14T12:45:00Z',
    triggeredBy: 'David Kim'
  }
];

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  team: 'frontend'
};

export const notifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Deployment Successful',
    message: 'Customer Dashboard has been deployed to production',
    type: 'success',
    timestamp: '2023-06-15T10:00:00Z',
    read: false
  },
  {
    id: 'notif2',
    title: 'Service Degradation',
    message: 'Customer Dashboard is experiencing degraded performance',
    type: 'warning',
    timestamp: '2023-06-15T09:30:00Z',
    read: false
  },
  {
    id: 'notif3',
    title: 'Service Outage',
    message: 'Notification Service is currently down',
    type: 'error',
    timestamp: '2023-06-15T08:45:00Z',
    read: true
  },
  {
    id: 'notif4',
    title: 'Pipeline Failed',
    message: 'Inventory Service CI pipeline has failed',
    type: 'error',
    timestamp: '2023-06-15T08:10:15Z',
    read: true
  },
  {
    id: 'notif5',
    title: 'New Team Member',
    message: 'Welcome Sarah Chen to the Frontend Team',
    type: 'info',
    timestamp: '2023-06-14T14:00:00Z',
    read: true
  }
];

// New mock data for system metrics
export const systemMetrics = {
  metrics: [
    {
      name: 'CPU Usage',
      value: 28,
      unit: '%',
      status: 'normal'
    },
    {
      name: 'Memory Usage',
      value: 65,
      unit: '%',
      status: 'warning'
    },
    {
      name: 'Disk Usage',
      value: 42,
      unit: '%',
      status: 'normal'
    },
    {
      name: 'Network',
      value: 35,
      unit: '%',
      status: 'normal'
    }
  ],
  uptime: '15 days, 7 hours'
};

// New mock data for deployment metrics
export const deploymentMetrics = {
  totalDeployments: 156,
  successRate: 94,
  averageDuration: '8m 42s',
  deploymentFrequency: '12/day',
  recentSuccesses: 28,
  recentFailures: 2
};
