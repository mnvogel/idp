import React, { useState } from 'react';
import { useAssetManagement } from '../../context/AssetManagementContext';
import { Workflow, WorkflowInstance, WorkflowStep } from '../../types/assetManagement';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, User, Edit, Plus, ChevronDown, ChevronRight } from 'lucide-react';

const WorkflowVisualizer: React.FC = () => {
  const { workflows, workflowInstances, users, isLoading } = useAssetManagement();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [showInstanceDetails, setShowInstanceDetails] = useState(false);

  // Get the selected workflow
  const workflow = selectedWorkflow 
    ? workflows.find(wf => wf.id === selectedWorkflow) 
    : null;

  // Get instances of the selected workflow
  const workflowInsts = selectedWorkflow 
    ? workflowInstances.filter(inst => inst.workflowId === selectedWorkflow)
    : [];

  // Get the selected instance
  const instance = selectedInstance 
    ? workflowInstances.find(inst => inst.id === selectedInstance) 
    : null;

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'skipped':
        return <AlertTriangle className="h-5 w-5 text-yellow-<boltAction type="file" filePath="src/components/assets/WorkflowVisualizer.tsx">        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get step type icon
  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'notification':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'action':
        return <Play className="h-5 w-5 text-green-500" />;
      case 'condition':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get user name by ID
  const getUserName = (userId?: string) => {
    if (!userId) return 'Unassigned';
    const user = users.find(u => u.id === userId);
    return user ? user.displayName : 'Unknown User';
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Workflow Visualization</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Visualize and manage workflow processes and approval chains
        </p>
      </div>
      
      {/* Workflow Selection */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-full md:w-64">
            <label htmlFor="workflow-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Workflow
            </label>
            <select
              id="workflow-select"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              value={selectedWorkflow || ''}
              onChange={(e) => {
                setSelectedWorkflow(e.target.value || null);
                setSelectedInstance(null);
                setShowInstanceDetails(false);
              }}
            >
              <option value="">Select a workflow</option>
              {workflows.map(wf => (
                <option key={wf.id} value={wf.id}>{wf.name}</option>
              ))}
            </select>
          </div>
          
          {selectedWorkflow && (
            <div className="w-full md:w-64">
              <label htmlFor="instance-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Workflow Instance
              </label>
              <select
                id="instance-select"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                value={selectedInstance || ''}
                onChange={(e) => {
                  setSelectedInstance(e.target.value || null);
                  setShowInstanceDetails(true);
                }}
              >
                <option value="">View workflow template</option>
                {workflowInsts.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    Instance {inst.id.split('-').pop()} - {inst.status}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex-grow"></div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </button>
        </div>
      </div>
      
      {/* Workflow Visualization */}
      <div className="p-6">
        {workflow ? (
          <div>
            {/* Workflow Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{workflow.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{workflow.description}</p>
                </div>
                {!selectedInstance && (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Workflow
                  </button>
                )}
              </div>
              
              {selectedInstance && instance && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Instance Details
                    </h4>
                    <button
                      type="button"
                      className="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      onClick={() => setShowInstanceDetails(!showInstanceDetails)}
                    >
                      {showInstanceDetails ? (
                        <span className="flex items-center">
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Hide Details
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Show Details
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {showInstanceDetails && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Initiated By</div>
                        <div className="text-sm text-gray-900 dark:text-white">{getUserName(instance.initiatedBy)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Initiated At</div>
                        <div className="text-sm text-gray-900 dark:text-white">{new Date(instance.initiatedAt).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
                        <div className="text-sm text-gray-900 dark:text-white capitalize">{instance.status}</div>
                      </div>
                      {instance.completedAt && (
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Completed At</div>
                          <div className="text-sm text-gray-900 dark:text-white">{new Date(instance.completedAt).toLocaleString()}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Current Step</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {instance.currentStepId ? 
                            workflow.steps.find(step => step.id === instance.currentStepId)?.name || 'Unknown Step' : 
                            'No active step'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Workflow Steps Visualization */}
            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* Steps */}
              <div className="space-y-6">
                {workflow.steps.map((step, index) => {
                  // Get step status from instance if available
                  const stepStatus = instance && instance.stepStatuses[step.id] 
                    ? instance.stepStatuses[step.id].status 
                    : step.status;
                  
                  return (
                    <div key={step.id} className="relative">
                      {/* Step indicator */}
                      <div className="absolute left-4 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                        {getStepTypeIcon(step.type)}
                      </div>
                      
                      {/* Step content */}
                      <div className="ml-16 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">{step.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="capitalize mr-3">{step.type}</span>
                            {step.assignedTo && (
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {getUserName(step.assignedTo)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 flex items-center">
                          {/* Step status */}
                          <div className="flex items-center">
                            {getStatusIcon(stepStatus)}
                            <span className="ml-1.5 text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {stepStatus}
                            </span>
                          </div>
                          
                          {/* Step actions */}
                          {instance && instance.status === 'in-progress' && stepStatus === 'in-progress' && (
                            <div className="ml-4 flex space-x-2">
                              <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                              >
                                Complete
                              </button>
                              {step.type === 'approval' && (
                                <button
                                  type="button"
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                                >
                                  Reject
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Step details (for instance) */}
                      {instance && instance.stepStatuses[step.id] && (
                        <div className="ml-16 mt-2 bg-gray-50 dark:bg-gray-900/30 rounded-md p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {instance.stepStatuses[step.id].startedAt && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Started: </span>
                                <span className="text-gray-900 dark:text-white">
                                  {new Date(instance.stepStatuses[step.id].startedAt!).toLocaleString()}
                                </span>
                              </div>
                            )}
                            {instance.stepStatuses[step.id].completedAt && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Completed: </span>
                                <span className="text-gray-900 dark:text-white">
                                  {new Date(instance.stepStatuses[step.id].completedAt!).toLocaleString()}
                                </span>
                              </div>
                            )}
                            {instance.stepStatuses[step.id].notes && (
                              <div className="sm:col-span-2">
                                <span className="text-gray-500 dark:text-gray-400">Notes: </span>
                                <span className="text-gray-900 dark:text-white">
                                  {instance.stepStatuses[step.id].notes}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No workflow selected</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a workflow from the dropdown to visualize its steps and instances.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowVisualizer;
