import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getStatusIcon = () => {
    switch (service.status) {
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

  const getStatusText = () => {
    switch (service.status) {
      case 'healthy':
        return 'Healthy';
      case 'degraded':
        return 'Degraded';
      case 'outage':
        return 'Outage';
      default:
        return 'Unknown';
    }
  };

  const getStatusClass = () => {
    switch (service.status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'outage':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierClass = () => {
    switch (service.tier) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass()} mr-2`}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierClass()}`}>
            {service.tier.charAt(0).toUpperCase() + service.tier.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Owner</p>
            <p className="text-sm font-medium text-gray-900">{service.owner}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Language</p>
            <p className="text-sm font-medium text-gray-900">{service.language}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Repository</p>
          <a 
            href={`https://${service.repository}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            {service.repository}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">Dependencies</p>
          <div className="flex flex-wrap gap-1">
            {service.dependencies.map((dep, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link
            to={`/services/${service.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View details
          </Link>
          <a
            href={service.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center"
          >
            Documentation
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
