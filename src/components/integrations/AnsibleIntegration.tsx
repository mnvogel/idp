import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnsibleJob } from '../../types';
import { Play, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Search } from 'lucide-react';

interface AnsibleIntegrationProps {
  jobs: AnsibleJob[];
}

const AnsibleIntegration: React.FC<AnsibleIntegrationProps> = ({ jobs }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('service');
  
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const templates = [
    { id: 'template1', name: 'Deploy Service', description: 'Deploy the service to the selected environment' },
    { id: 'template2', name: 'Restart Service', description: 'Restart the service in the selected environment' },
    { id: 'template3', name: 'Backup Database', description: 'Create a backup of the service database' },
    { id: 'template4', name: 'Run Health Check', description: 'Execute health checks on the service' },
    { id: 'template5', name: 'Scale Service', description: 'Scale the service up or down' },
    { id: 'template6', name: 'Apply Security Patches', description: 'Apply security patches to the service' },
  ];

  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'pending':
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  const handleRunTemplate = () => {
    if (!selectedTemplate) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Job started successfully using template: ${templates.find(t => t.id === selectedTemplate)?.name}`);
      setSelectedTemplate('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ansible/AWX Integration</h1>
      
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
              <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
            </div>
            <div className="p-4">
              <div className="flex mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="ml-3 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                  title="Refresh jobs"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Started
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Initiated By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No jobs found
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(job.status)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.template}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTime(job.startTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.initiatedBy}
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
              <h2 className="text-lg font-semibold text-gray-900">Run Job Template</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Template
                </label>
                <select
                  id="template"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Select a template</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                {selectedTemplate && (
                  <p className="mt-2 text-sm text-gray-500">
                    {templates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                )}
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
                          This job will be run for service ID: <span className="font-medium">{serviceId}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="environment" className="block text-sm font-medium text-gray-700 mb-1">
                  Environment
                </label>
                <select
                  id="environment"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>Development</option>
                  <option>Staging</option>
                  <option>Production</option>
                </select>
              </div>
              
              <div>
                <button
                  type="button"
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    selectedTemplate ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  disabled={!selectedTemplate || isLoading}
                  onClick={handleRunTemplate}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="-ml-1 mr-2 h-4 w-4" />
                      Run Template
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

export default AnsibleIntegration;
