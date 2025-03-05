import React from 'react';
import { Service } from '../../types';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ServiceStatusCardProps {
  services: Service[];
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ services }) => {
  const healthyServices = services.filter(service => service.status === 'healthy');
  const degradedServices = services.filter(service => service.status === 'degraded');
  const outageServices = services.filter(service => service.status === 'outage');

  const getStatusIcon = (status: Service['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: Service['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'outage':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Status</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{healthyServices.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Healthy Services</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{degradedServices.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Degraded Services</div>
              </div>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-500 dark:text-red-400 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{outageServices.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Services with Outages</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.owner}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.tier.charAt(0).toUpperCase() + service.tier.slice(1)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatusCard;
