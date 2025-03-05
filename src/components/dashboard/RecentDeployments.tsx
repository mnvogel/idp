import React from 'react';
import { AnsibleJob, AzureDevOpsPipeline } from '../../types';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface RecentDeploymentsProps {
  pipelines: AzureDevOpsPipeline[];
  jobs: AnsibleJob[];
}

const RecentDeployments: React.FC<RecentDeploymentsProps> = ({ pipelines, jobs }) => {
  // Combine and sort pipelines and jobs by start time
  const combinedDeployments = [
    ...pipelines.map(pipeline => ({
      id: pipeline.id,
      name: pipeline.name,
      status: pipeline.status,
      startTime: pipeline.startTime,
      endTime: pipeline.endTime,
      type: 'pipeline',
      source: pipeline.repository,
      initiatedBy: pipeline.triggeredBy
    })),
    ...jobs.map(job => ({
      id: job.id,
      name: job.name,
      status: job.status === 'successful' ? 'completed' : job.status,
      startTime: job.startTime,
      endTime: job.endTime,
      type: 'job',
      source: job.template,
      initiatedBy: job.initiatedBy
    }))
  ].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
   .slice(0, 5); // Get only the 5 most recent

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'successful':
        return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case 'running':
        return <Play className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
      case 'successful':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Deployments</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Started
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Initiated By
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {combinedDeployments.map((deployment) => (
              <tr key={`${deployment.type}-${deployment.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{deployment.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(deployment.status)}
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(deployment.status)}`}>
                      {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {deployment.type === 'pipeline' ? 'Azure DevOps' : 'Ansible'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{deployment.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(deployment.startTime)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{deployment.initiatedBy}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          View all deployments →
        </a>
      </div>
    </div>
  );
};

export default RecentDeployments;
