import React, { createContext, useContext, useState, useEffect } from 'react';
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

import {
  computerSystems,
  hardwareSpecifications,
  operatingSystems,
  installedSoftware,
  maintenanceRecords,
  entraUsers,
  entraGroups,
  accessRequests,
  jiraTickets,
  jiraAssets,
  workflows,
  workflowInstances,
  dashboardConfigs
} from '../data/mockAssetData';

interface AssetManagementContextType {
  // Data
  systems: ComputerSystem[];
  hardwareSpecs: HardwareSpecification[];
  osSystems: OperatingSystem[];
  software: InstalledSoftware[];
  maintenance: MaintenanceRecord[];
  users: EntraUser[];
  groups: EntraGroup[];
  accessRequests: AccessRequest[];
  jiraTickets: JiraTicket[];
  jiraAssets: JiraAsset[];
  workflows: Workflow[];
  workflowInstances: WorkflowInstance[];
  dashboardConfigs: DashboardConfig[];
  
  // System operations
  getSystemById: (id: string) => ComputerSystem | undefined;
  getSystemsByDepartment: (department: string) => ComputerSystem[];
  getSystemsByLocation: (location: string) => ComputerSystem[];
  getSystemsByType: (type: string) => ComputerSystem[];
  getSystemsByStatus: (status: string) => ComputerSystem[];
  getSystemsByUser: (userId: string) => ComputerSystem[];
  
  // Hardware operations
  getHardwareForSystem: (systemId: string) => HardwareSpecification | undefined;
  
  // OS operations
  getOSForSystem: (systemId: string) => OperatingSystem | undefined;
  
  // Software operations
  getSoftwareForSystem: (systemId: string) => InstalledSoftware[];
  
  // Maintenance operations
  getMaintenanceForSystem: (systemId: string) => MaintenanceRecord[];
  
  // User operations
  getUserById: (id: string) => EntraUser | undefined;
  getUsersByGroup: (groupId: string) => EntraUser[];
  
  // Workflow operations
  getWorkflowById: (id: string) => Workflow | undefined;
  getWorkflowInstanceById: (id: string) => WorkflowInstance | undefined;
  getActiveWorkflowInstances: () => WorkflowInstance[];
  
  // Dashboard operations
  getDashboardForUser: (userId: string) => DashboardConfig | undefined;
  
  // Jira operations
  getJiraTicketsForAsset: (assetId: string) => JiraTicket[];
  
  // Loading states
  isLoading: boolean;
}

const AssetManagementContext = createContext<AssetManagementContextType | undefined>(undefined);

export const AssetManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize with mock data
  const [systems, setSystems] = useState<ComputerSystem[]>(computerSystems);
  const [hardwareSpecs, setHardwareSpecs] = useState<HardwareSpecification[]>(hardwareSpecifications);
  const [osSystems, setOSSystems] = useState<OperatingSystem[]>(operatingSystems);
  const [software, setSoftware] = useState<InstalledSoftware[]>(installedSoftware);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(maintenanceRecords);
  const [users, setUsers] = useState<EntraUser[]>(entraUsers);
  const [groups, setGroups] = useState<EntraGroup[]>(entraGroups);
  const [accessReqs, setAccessRequests] = useState<AccessRequest[]>(accessRequests);
  const [tickets, setJiraTickets] = useState<JiraTicket[]>(jiraTickets);
  const [assets, setJiraAssets] = useState<JiraAsset[]>(jiraAssets);
  const [workflowList, setWorkflows] = useState<Workflow[]>(workflows);
  const [workflowInsts, setWorkflowInstances] = useState<WorkflowInstance[]>(workflowInstances);
  const [dashboards, setDashboardConfigs] = useState<DashboardConfig[]>(dashboardConfigs);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // System operations
  const getSystemById = (id: string) => systems.find(system => system.id === id);
  
  const getSystemsByDepartment = (department: string) => 
    systems.filter(system => system.department === department);
  
  const getSystemsByLocation = (location: string) => 
    systems.filter(system => system.location === location);
  
  const getSystemsByType = (type: string) => 
    systems.filter(system => system.type === type);
  
  const getSystemsByStatus = (status: string) => 
    systems.filter(system => system.status === status);
  
  const getSystemsByUser = (userId: string) => 
    systems.filter(system => system.assignedTo === userId);

  // Hardware operations
  const getHardwareForSystem = (systemId: string) => 
    hardwareSpecs.find(spec => spec.systemId === systemId);

  // OS operations
  const getOSForSystem = (systemId: string) => 
    osSystems.find(os => os.systemId === systemId);

  // Software operations
  const getSoftwareForSystem = (systemId: string) => 
    software.filter(sw => sw.systemId === systemId);

  // Maintenance operations
  const getMaintenanceForSystem = (systemId: string) => 
    maintenance.filter(record => record.systemId === systemId);

  // User operations
  const getUserById = (id: string) => 
    users.find(user => user.id === id);
  
  const getUsersByGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return [];
    return users.filter(user => group.members.includes(user.id));
  };

  // Workflow operations
  const getWorkflowById = (id: string) => 
    workflowList.find(workflow => workflow.id === id);
  
  const getWorkflowInstanceById = (id: string) => 
    workflowInsts.find(instance => instance.id === id);
  
  const getActiveWorkflowInstances = () => 
    workflowInsts.filter(instance => instance.status === 'in-progress');

  // Dashboard operations
  const getDashboardForUser = (userId: string) => 
    dashboards.find(dashboard => dashboard.userId === userId && dashboard.isDefault);

  // Jira operations
  const getJiraTicketsForAsset = (assetId: string) => 
    tickets.filter(ticket => ticket.linkedAssets.includes(assetId));

  const contextValue: AssetManagementContextType = {
    systems,
    hardwareSpecs,
    osSystems,
    software,
    maintenance,
    users,
    groups,
    accessRequests: accessReqs,
    jiraTickets: tickets,
    jiraAssets: assets,
    workflows: workflowList,
    workflowInstances: workflowInsts,
    dashboardConfigs: dashboards,
    
    getSystemById,
    getSystemsByDepartment,
    getSystemsByLocation,
    getSystemsByType,
    getSystemsByStatus,
    getSystemsByUser,
    
    getHardwareForSystem,
    getOSForSystem,
    getSoftwareForSystem,
    getMaintenanceForSystem,
    
    getUserById,
    getUsersByGroup,
    
    getWorkflowById,
    getWorkflowInstanceById,
    getActiveWorkflowInstances,
    
    getDashboardForUser,
    getJiraTicketsForAsset,
    
    isLoading
  };

  return (
    <AssetManagementContext.Provider value={contextValue}>
      {children}
    </AssetManagementContext.Provider>
  );
};

export const useAssetManagement = (): AssetManagementContextType => {
  const context = useContext(AssetManagementContext);
  if (context === undefined) {
    throw new Error('useAssetManagement must be used within an AssetManagementProvider');
  }
  return context;
};
