import React from 'react';
import { Service } from '../../types';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface ServiceTierDistributionProps {
  services: Service[];
}

const ServiceTierDistribution: React.FC<ServiceTierDistributionProps> = ({ services }) => {
  const criticalCount = services.filter(s => s.tier === 'critical').length;
  const highCount = services.filter(s => s.tier === 'high').length;
  const mediumCount = services.filter(s => s.tier === 'medium').length;
  const lowCount = services.filter(s => s.tier === 'low').length;
  
  const totalServices = services.length;
  
  const calculatePercentage = (count: number) => {
    return Math.round((count / totalServices) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Tiers</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <ShieldAlert className="h-5 w-5 text-red-500 dark:text-red-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Critical</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{criticalCount} ({calculatePercentage(criticalCount)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 dark:bg-red-600 h-2 rounded-full" style={{ width: `${calculatePercentage(criticalCount)}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <ShieldAlert className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">High</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{highCount} ({calculatePercentage(highCount)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 dark:bg-orange-600 h-2 rounded-full" style={{ width: `${calculatePercentage(highCount)}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{mediumCount} ({calculatePercentage(mediumCount)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 dark:bg-yellow-600 h-2 rounded-full" style={{ width: `${calculatePercentage(mediumCount)}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Low</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{lowCount} ({calculatePercentage(lowCount)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 dark:bg-green-600 h-2 rounded-full" style={{ width: `${calculatePercentage(lowCount)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Service tiers determine priority levels for incidents and support.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTierDistribution;
