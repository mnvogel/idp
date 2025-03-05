import React from 'react';
import { BarChart, Activity, CheckCircle, XCircle } from 'lucide-react';

interface DeploymentMetrics {
  totalDeployments: number;
  successRate: number;
  averageDuration: string;
  deploymentFrequency: string;
  recentSuccesses: number;
  recentFailures: number;
}

interface DeploymentMetricsCardProps {
  metrics: DeploymentMetrics;
}

const DeploymentMetricsCard: React.FC<DeploymentMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Deployment Metrics</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <BarChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.successRate}%</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.deploymentFrequency}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mr-3" />
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{metrics.recentSuccesses}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Recent Successes</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 mr-3" />
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{metrics.recentFailures}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Recent Failures</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Deployments</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{metrics.totalDeployments}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Duration</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{metrics.averageDuration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentMetricsCard;
