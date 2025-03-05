import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Teams from './pages/Teams';
import Documentation from './pages/Documentation';
import AnsibleIntegrationPage from './pages/AnsibleIntegrationPage';
import AzureDevOpsIntegrationPage from './pages/AzureDevOpsIntegrationPage';
import AssetManagementPage from './pages/AssetManagementPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="teams" element={<Teams />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="integrations/ansible" element={<AnsibleIntegrationPage />} />
            <Route path="integrations/azure-devops" element={<AzureDevOpsIntegrationPage />} />
            <Route path="asset-management" element={<AssetManagementPage />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
