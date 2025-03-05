import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Service } from '../../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  GitBranch, 
  Users, 
  Clock, 
  ArrowLeft,
  Server,
  Code,
  FileText,
  Terminal
} from 'lucide-react';

interface ServiceDetailProps {
  services: Service[];
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ services }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Not Found</h2>
        <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/services" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (service.status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-6 w-6 text-red-500" />;
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
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{service.name}</h1>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()}`}>
                {getStatusIcon()}
                <span className="ml-1.5">{getStatusText()}</span>
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTierClass()}`}>
                {service.tier.charAt(0).toUpperCase() + service.tier.slice(1)} Tier
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-8">{service.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <Server className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Service Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Owner</p>
                      <p className="text-sm font-medium text-gray-900">{service.owner}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Team</p>
                      <Link to={`/teams/${service.team}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        {service.team.charAt(0).toUpperCase() + service.team.slice(1)} Team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <Code className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Development</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Language</p>
                      <p className="text-sm font-medium text-gray-900">{service.language}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Repository</p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dependencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {service.dependencies.map((dep, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-3 flex items-center"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                  <span className="text-sm text-gray-700">{dep}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={service.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FileText className="mr-2 h-5 w-5 text-gray-500" />
              Documentation
            </a>
            <Link
              to={`/integrations/ansible?service=${service.id}`}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Terminal className="mr-2 h-5 w-5 text-gray-500" />
              Run Ansible Job
            </Link>
            <Link
              to={`/integrations/azure-devops?service=${service.id}`}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <GitBranch className="mr-2 h-5 w-5 text-gray-500" />
              View Pipelines
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Deployments</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Deployed v2.3.0 to production</p>
                  <p className="text-xs text-gray-500">June 15, 2023 at 10:35 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Deployed v2.2.5 to staging</p>
                  <p className="text-xs text-gray-500">June 14, 2023 at 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Deployment to production failed</p>
                  <p className="text-xs text-gray-500">June 12, 2023 at 11:20 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Michael Rodriguez" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Backend Lead</p>
                </div>
                <div className="ml-auto">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">Contact</button>
                </div>
              </div>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Emily Wong" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Emily Wong</p>
                  <p className="text-xs text-gray-500">Senior Backend Developer</p>
                </div>
                <div className="ml-auto">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
