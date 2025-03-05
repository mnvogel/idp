import React, { useState } from 'react';
import { useAssetManagement } from '../../context/AssetManagementContext';
import { ComputerSystem } from '../../types/assetManagement';
import { Laptop, Server, Monitor, Smartphone, HardDrive, Cpu, Memory, Database, Clock, Tool, FileText, User } from 'lucide-react';

interface SystemDetailViewProps {
  systemId: string;
}

const SystemDetailView: React.FC<SystemDetailViewProps> = ({ systemId }) => {
  const { 
    getSystemById, 
    getHardwareForSystem, 
    getOSForSystem, 
    getSoftwareForSystem,
    getMaintenanceForSystem,
    getUserById,
    isLoading 
  } = useAssetManagement();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const system = getSystemById(systemId);
  const hardware = getHardwareForSystem(systemId);
  const os = getOSForSystem(systemId);
  const software = getSoftwareForSystem(systemId);
  const maintenance = getMaintenanceForSystem(systemId);
  const assignedUser = system?.assignedTo ? getUserById(system.assignedTo) : undefined;

  // Get icon for system type
  const getSystemTypeIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-6 w-6 text-blue-500" />;
      case 'desktop':
        return <Monitor className="h-6 w-6 text-green-500" />;
      case 'server':
        return <Server className="h-6 w-6 text-purple-500" />;
      case 'virtual machine':
        return <HardDrive className="h-6 w-6 text-indigo-500" />;
      case 'mobile':
        return <Smartphone className="h-6 w-6 text-orange-500" />;
      default:
        return <HardDrive className="h-6 w-6 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!system) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          System not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {getSystemTypeIcon(system.type)}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{system.hostname}</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Asset Tag: {system.assetTag}</span>
              <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">S/N: {system.serialNumber}</span>
            </div>
          </div>
          <div className="ml-auto">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              system.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
              system.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
              system.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'hardware'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('hardware')}
          >
            Hardware
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'software'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('software')}
          >
            Software
          </button>
          <button
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'maintenance'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Manufacturer</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.manufacturer}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Model</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.model}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">{system.type}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Serial Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.serialNumber}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Purchase Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(system.purchaseDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Warranty Expiration</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {system.warrantyExpiration === 'N/A' ? 'N/A' : new Date(system.warrantyExpiration).toLocaleDateString()}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.notes || 'No notes available'}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Assignment Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {assignedUser ? (
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{assignedUser.displayName}</span>
                      </div>
                    ) : 'Not assigned'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.department || 'N/A'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{system.location || 'N/A'}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(system.lastUpdated).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
              
              {os && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Operating System</h4>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {os.name} {os.version} ({os.architecture})
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date(os.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Hardware Tab */}
        {activeTab === 'hardware' && (
          <div>
            {hardware ? (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    <div className="flex items-center">
                      <Cpu className="h-5 w-5 text-gray-500 mr-2" />
                      <span>Processor & Memory</span>
                    </div>
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{hardware.cpu}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU Cores</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{hardware.cpuCores}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{hardware.ramTotal} GB</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-gray-500 mr-2" />
                      <span>Storage</span>
                    </div>
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Disk Space</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{hardware.diskTotal} GB</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Free Disk Space</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{hardware.diskFree} GB</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Used</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {Math.round(((hardware.diskTotal - hardware.diskFree) / hardware.diskTotal) * 100)}%
                      </dd>
                    </div>
                  </dl>
                  
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.round(((hardware.diskTotal - hardware.diskFree) / hardware.diskTotal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Network Interfaces</h3>
                  {hardware.networkInterfaces.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MAC Address</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {hardware.networkInterfaces.map((nic, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{nic.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{nic.macAddress}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{nic.ipAddress}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{nic.isWireless ? 'Wireless' : 'Wired'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">No network interfaces found</div>
                  )}
                </div>
                
                {hardware.peripherals.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Peripherals</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Manufacturer</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Model</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Serial Number</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {hardware.peripherals.map((peripheral, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{peripheral.type}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{peripheral.manufacturer}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{peripheral.model}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{peripheral.serialNumber}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No hardware information available for this system
              </div>
            )}
          </div>
        )}
        
        {/* Software Tab */}
        {activeTab === 'software' && (
          <div>
            {os && (
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Operating System</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{os.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Version</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{os.version}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className<boltAction type="file" filePath="src/components/assets/SystemDetailView.tsx">                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Architecture</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{os.architecture}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Install Date</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(os.installDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(os.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Patch Level</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{os.patchLevel}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Boot Time</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(os.lastBootTime).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Installed Software</h3>
            {software.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Version</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Publisher</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Install Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">License Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {software.map((sw) => (
                      <tr key={sw.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{sw.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sw.version}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sw.publisher}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(sw.installDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sw.licenseType === 'commercial' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            sw.licenseType === 'open source' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {sw.licenseType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {sw.size < 1000 ? `${sw.size} MB` : `${(sw.size / 1000).toFixed(2)} GB`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No software information available for this system
              </div>
            )}
          </div>
        )}
        
        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Maintenance History</h3>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                <Tool className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </button>
            </div>
            
            {maintenance.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Type</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Performed By</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Duration</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {maintenance.map((record) => (
                      <tr key={record.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 capitalize">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.type === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            record.type === 'emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            record.type === 'upgrade' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {record.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{record.description}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{record.performedBy}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {record.duration < 60 ? `${record.duration} min` : `${Math.floor(record.duration / 60)}h ${record.duration % 60}min`}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                            View<span className="sr-only">, {record.description}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No maintenance records found for this system
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemDetailView;
