import React from 'react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

interface SystemMetricsCardProps {
  metrics: SystemMetric[];
  uptime: string;
}

const SystemMetricsCard: React.FC<SystemMetricsCardProps> = ({ metrics, uptime }) => {
  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-blue-600 dark:bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-blue-600 dark:bg-blue-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Status</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{metric.value}{metric.unit}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${getStatusColor(metric.status)} h-2.5 rounded-full`} 
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">System Uptime</span>
            <span className="font-semibold text-gray-900 dark:text-white">{uptime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetricsCard;
