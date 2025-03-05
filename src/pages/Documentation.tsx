import React, { useState } from 'react';
import { services } from '../data/mockData';
import { Search, FileText, ExternalLink, BookOpen, Code, Server } from 'lucide-react';

const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const documentationCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      documents: [
        { id: 'doc1', name: 'Developer Onboarding', description: 'Guide for new developers joining the team' },
        { id: 'doc2', name: 'Development Environment Setup', description: 'How to set up your local development environment' },
        { id: 'doc3', name: 'Contribution Guidelines', description: 'Guidelines for contributing to our codebase' },
      ]
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: <Server className="h-5 w-5 text-indigo-500" />,
      documents: [
        { id: 'doc4', name: 'System Architecture Overview', description: 'High-level overview of our system architecture' },
        { id: 'doc5', name: 'Data Flow Diagrams', description: 'Diagrams showing data flow between services' },
        { id: 'doc6', name: 'Infrastructure Documentation', description: 'Documentation for our infrastructure setup' },
      ]
    },
    {
      id: 'apis',
      name: 'APIs & SDKs',
      icon: <Code className="h-5 w-5 text-indigo-500" />,
      documents: [
        { id: 'doc7', name: 'API Standards', description: 'Standards for API design and implementation' },
        { id: 'doc8', name: 'Authentication Guide', description: 'Guide for implementing authentication in services' },
        { id: 'doc9', name: 'SDK Documentation', description: 'Documentation for our client SDKs' },
      ]
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600 mt-1">Access documentation for all services and systems</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search documentation..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {documentationCategories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {category.documents.map(doc => (
                  <a 
                    key={doc.id} 
                    href="#" 
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Service Documentation</h2>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No services found
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                          service.status === 'healthy' ? 'bg-green-500' :
                          service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          <div className="text-xs text-gray-500">{service.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a 
                        href={service.documentation} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        View Docs
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
