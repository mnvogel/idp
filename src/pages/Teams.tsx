import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { teams, services } from '../data/mockData';
import { Search, Users, Server, ChevronRight } from 'lucide-react';

const Teams: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTeamServices = (teamId: string) => {
    return services.filter(service => service.team === teamId);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">View and manage your organization's teams</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Team
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search teams..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredTeams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No teams found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTeams.map(team => {
            const teamServices = getTeamServices(team.id);
            
            return (
              <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Users className="h-5 w-5 text-indigo-500 mr-2" />
                      {team.name}
                    </h2>
                    <Link
                      to={`/teams/${team.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      View details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{team.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        Team Members ({team.members.length})
                      </h3>
                      <div className="space-y-3">
                        {team.members.map(member => (
                          <div key={member.id} className="flex items-center">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <Server className="h-4 w-4 text-gray-500 mr-2" />
                        Services ({teamServices.length})
                      </h3>
                      <div className="space-y-2">
                        {teamServices.map(service => (
                          <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="block p-2 hover:bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  service.status === 'healthy' ? 'bg-green-500' :
                                  service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-sm font-medium text-gray-900">{service.name}</span>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                service.tier === 'critical' ? 'bg-red-100 text-red-800' :
                                service.tier === 'high' ? 'bg-orange-100 text-orange-800' :
                                service.tier === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {service.tier.charAt(0).toUpperCase() + service.tier.slice(1)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Teams;
