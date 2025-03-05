import React, { useState } from 'react';
import { useAssetManagement } from '../../context/AssetManagementContext';
import { DashboardWidget } from '../../types/assetManagement';
import { Grid, Plus, Settings, X, Move, BarChart, PieChart, List, Clock, AlertTriangle, HardDrive, Download } from 'lucide-react';

const CustomizableDashboard: React.FC = () => {
  const { dashboardConfigs, currentUser, isLoading } = useAssetManagement();
  const [editMode, setEditMode] = useState(false);
  
  // Get the user's default dashboard
  const userDashboard = dashboardConfigs.find(
    dashboard => dashboard.userId === currentUser?.id && dashboard.isDefault
  );

  // Available widget types for adding
  const availableWidgetTypes = [
    { id: 'asset-count', name: 'Asset Count', icon: <HardDrive className="h-5 w-5" /> },
    { id: 'maintenance-status', name: 'Maintenance Status', icon: <Settings className="h-5 w-5" /> },
    { id: 'software-compliance', name: 'Software Compliance', icon: <AlertTriangle className="h-5 w-5" /> },
    { id: 'hardware-health', name: 'Hardware Health', icon: <BarChart className="h-5 w-5" /> },
    { id: 'ticket-status', name: 'Ticket Status', icon: <List className="h-5 w-5" /> },
    { id: 'workflow-status', name: 'Workflow Status', icon: <Grid className="h-5 w-5" /> },
    { id: 'recent-activities', name: 'Recent Activities', icon: <Clock className="h-5 w-5" /> },
    { id: 'expiring-warranties', name: 'Expiring Warranties', icon: <Clock className="h-5 w-5" /> }
  ];

  // Mock function to render widget content based on type
  const renderWidgetContent = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'asset-count':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <HardDrive className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">42</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Maintenance</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Outage</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Inactive</div>
              </div>
            </div>
          </div>
        );
      
      case 'maintenance-status':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Scheduled Maintenance</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">3</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Upcoming in 7 days</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">2</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Overdue</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">1</div>
              </div>
              <div className="pt-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View all maintenance
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'software-compliance':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">License Compliance</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Expiring in 30 days</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Non-compliant</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">3</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'hardware-health':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <BarChart className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CPU Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">28%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Memory Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">65%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disk Usage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">42%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'ticket-status':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <List className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Open</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">In Progress</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Resolved</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">12</span>
              </div>
              <div className="pt-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View all tickets
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'workflow-status':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Grid className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">2</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Workflows</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Pending Approvals</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">3</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Completed This Week</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">5</div>
                </div>
              </div>
              <div className="pt-1">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:<boltAction type="file" filePath="src/components/assets/CustomizableDashboard.tsx">                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View all workflows
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'recent-activities':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">System Update Completed</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Today, 10:30 AM</div>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">New Asset Added</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 2:15 PM</div>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Scheduled</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Yesterday, 9:00 AM</div>
              </div>
              <div className="pt-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View all activities
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'expiring-warranties':
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-base font-medium text-gray-900 dark:text-white">{widget.title}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Expiring in 30 days</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">2</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Expiring in 90 days</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">5</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Recently expired</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">1</div>
              </div>
              <div className="pt-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View all warranties
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 dark:text-gray-600 mb-2">
                <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Widget content not available</p>
            </div>
          </div>
        );
    }
  };

  // Get widget size classes
  const getWidgetSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-1 row-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 row-span-1 md:col-span-2 lg:col-span-3';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {userDashboard?.name || 'My Dashboard'}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {userDashboard?.description || 'Customize your dashboard with the metrics that matter to you'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className={`inline-flex items-center px-3 py-1.5 border ${
                editMode 
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
              } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800`}
            >
              <Settings className="h-4 w-4 mr-1.5" />
              {editMode ? 'Done Editing' : 'Edit Dashboard'}
            </button>
            
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Grid */}
      <div className="p-6">
        {userDashboard && userDashboard.layout.widgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {userDashboard.layout.widgets.map((widget) => (
              <div 
                key={widget.id} 
                className={`${getWidgetSizeClasses(widget.size)} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden ${
                  editMode ? 'cursor-move relative' : ''
                }`}
              >
                {editMode && (
                  <div className="absolute top-0 right-0 p-1 z-10 flex space-x-1">
                    <button className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Move className="h-4 w-4" />
                    </button>
                    <button className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Settings className="h-4 w-4" />
                    </button>
                    <button className="p-1 bg-red-100 dark:bg-red-900/30 rounded-md text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <div className="p-4 h-full">
                  {renderWidgetContent(widget)}
                </div>
              </div>
            ))}
            
            {/* Add Widget Button (only in edit mode) */}
            {editMode && (
              <div className="col-span-1 row-span-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <Plus className="h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Add Widget</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Add a new widget to your dashboard
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Add Widget
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No widgets</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding widgets to your dashboard.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizableDashboard;
