import React, { useState } from 'react';
import { AssetManagementProvider } from '../context/AssetManagementContext';
import SystemInventoryDashboard from '../components/assets/SystemInventoryDashboard';
import SystemDetailView from '../components/assets/SystemDetailView';
import MicrosoftEntraIntegration from '../components/assets/MicrosoftEntraIntegration';
import JiraIntegration from '../components/assets/JiraIntegration';
import WorkflowVisualizer from '../components/assets/WorkflowVisualizer';
import CustomizableDashboard from '../components/assets/CustomizableDashboard';
import { Laptop, Users, TicketIcon, Grid, LayoutDashboard } from 'lucide-react';

const AssetManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);

  const tabs = [
    { id: 'inventory', name: 'System Inventory', icon: <Laptop className="h-5 w-5" /> },
    { id: 'entra', name: 'Microsoft Entra', icon: <Users className="h-5 w-5" /> },
    { id: 'jira', name: 'Jira Integration', icon: <TicketIcon className="h-5 w-5" /> },
    { id: 'workflows', name: 'Workflows', icon: <Grid className="h-5 w-5" /> },
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> }
  ];

  return (
    <AssetManagementProvider>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedSystemId(null);
                  }}
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-2">{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'inventory' && !selectedSystemId && (
            <SystemInventoryDashboard />
          )}
          
          {activeTab === 'inventory' && selectedSystemId && (
            <SystemDetailView systemId={selectedSystemId} />
          )}
          
          {activeTab === 'entra' && (
            <MicrosoftEntraIntegration />
          )}
          
          {activeTab === 'jira' && (
            <JiraIntegration />
          )}
          
          {activeTab === 'workflows' && (
            <WorkflowVisualizer />
          )}
          
          {activeTab === 'dashboard' && (
            <CustomizableDashboard />
          )}
        </div>
      </div>
    </AssetManagementProvider>
  );
};

export default AssetManagementPage;
