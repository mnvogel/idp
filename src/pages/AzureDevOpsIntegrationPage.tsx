import React from 'react';
import { azureDevOpsPipelines } from '../data/mockData';
import AzureDevOpsIntegration from '../components/integrations/AzureDevOpsIntegration';

const AzureDevOpsIntegrationPage: React.FC = () => {
  return <AzureDevOpsIntegration pipelines={azureDevOpsPipelines} />;
};

export default AzureDevOpsIntegrationPage;
