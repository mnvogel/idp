import React from 'react';
import { ansibleJobs } from '../data/mockData';
import AnsibleIntegration from '../components/integrations/AnsibleIntegration';

const AnsibleIntegrationPage: React.FC = () => {
  return <AnsibleIntegration jobs={ansibleJobs} />;
};

export default AnsibleIntegrationPage;
