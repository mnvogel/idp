import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AzureDevOpsPipeline } from '../../types';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Search, GitBranch, Filter } from 'lucide-react';

interface AzureDevOpsIntegrationProps {
  pipelines: AzureDevOpsPipeline[];
}

const AzureDevOpsIntegration: React.FC<AzureDevOpsIntegrationProps> = ({ pipelines }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('service');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('main');

  const pipelineOptions = [
    { id: 'pipeline1', name: 'Customer Dashboard CI', repository: 'customer-dashboard' },
    { id: 'pipeline2', name: 'Payment API CI/CD', repository: 'payment-api' },
    { id: 'pipeline3', name: 'Inventory Service CI', repository: 'inventory-service' },
    { id: 'pipeline4', name: 'Analytics Pipeline Build', repository: 'analytics-pipeline' },
    { id: 'pipeline5', name: 'Auth Service Security Scan', repository: 'auth-service' },
  ];

  const branchOptions = ['main', 'develop', 'feature/new-payment-method', 'hotfix/security-patch'];

  const filteredPipelines = pipelines.filter(pipeline => {
    const matchesSearch = 
      pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.branch.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pipeline.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'canceled':
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'canceled':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  const handleRunPipeline = () => {
    if (!selectedPipeline) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Pipeline started successfully: ${pipelineOptions.find(p => p.id === selectedPipeline)?.name} on branch ${selectedBranch}`);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Azure DevOps Integration</h1>
      
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Pipelines</h2>
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row mb-4 gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search pipelines..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="running">Running</option>
                      <option value="failed">Failed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                  <button 
                    className="ml-3 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                    title="Refresh pipelines"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pipeline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Repository / Branch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Started
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Triggered By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPipelines.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No pipelines found
                        </td>
                      </tr>
                    ) : (
                      filteredPipelines.map((pipeline) => (
                        <tr key={pipeline.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(pipeline.status)}`}>
                              {getStatusIcon(pipeline.status)}
                              <span className="ml-1 capitalize">{pipeline.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{pipeline.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{pipeline.repository}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <GitBranch className="h-3 w-3 mr-1" />
                              {pipeline.branch}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTime(pipeline.startTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pipeline.triggeredBy}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Run Pipeline</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="pipeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Pipeline
                </label>
                <select
                  id="pipeline"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedPipeline}
                  onChange={(e) => setSelectedPipeline(e.target.value)}
                >
                  <option value="">Select a pipeline</option>
                  {pipelineOptions.map((pipeline) => (
                    <option key={pipeline.id} value={pipeline.id}>
                      {pipeline.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {serviceId && (
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This pipeline will be run for service ID: <span className="font-medium">{serviceId}</span>
                        </p>
                      </div>
                    </div></div>
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  id="branch"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  {branchOptions.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="variables" className="block text-sm font-medium text-gray-700 mb-1">
                  Pipeline Variables (optional)
                </label>
                <textarea
                  id="variables"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="KEY=value&#10;ANOTHER_KEY=another value"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  Enter one variable per line in KEY=value format
                </p>
              </div>
              
              <div>
                <button
                  type="button"
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    selectedPipeline ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  disabled={!selectedPipeline || isLoading}
                  onClick={handleRunPipeline}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="-ml-1 mr-2 h-4 w-4" />
                      Run Pipeline
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AzureDevOpsIntegration;
