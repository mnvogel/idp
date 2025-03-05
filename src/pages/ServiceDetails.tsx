import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../data/mockData';
import ServiceDetail from '../components/services/ServiceDetail';

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <ServiceDetail services={services} />
  );
};

export default ServiceDetails;
