import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Server, Users, FileText, GitBranch, Settings, HardDrive } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">DevPortal</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <Server className="h-5 w-5 mr-3" />
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/teams" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <Users className="h-5 w-5 mr-3" />
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/documentation" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <FileText className="h-5 w-5 mr-3" />
              Documentation
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/asset-management" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <HardDrive className="h-5 w-5 mr-3" />
              IT Asset Management
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-8 px-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Integrations
          </h3>
          <ul className="mt-2 space-y-1 px-3">
            <li>
              <NavLink 
                to="/integrations/ansible" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <GitBranch className="h-5 w-5 mr-3" />
                Ansible
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/integrations/azure-devops" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <GitBranch className="h-5 w-5 mr-3" />
                Azure DevOps
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Settings className="h-4 w-4 mr-2" />
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
