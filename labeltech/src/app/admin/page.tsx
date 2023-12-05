"use client"

import ActivationProductionLine from '@/components/ActivationProductionLine';
import CreateUser from '@/components/CreateUsers';
import Grid from '@/components/Grid'
import Issue from '@/components/Issue';
import LabelErrorHistory from '@/components/LabelErrorHistory';
import ProductionLineManagement from '@/components/ProductionLineManagement';
import ProductionManagement from '@/components/ProductionManagement';
import Statistics from '@/components/Statistics';
import React from 'react'
//Adding missing files from previous push
const page = () => {

  const fakeStats = {
    totalErrors: 78,
    errorRate: '2.5%',
    informationLogs: 1500
  };

  const gridComponents = [
    <ProductionLineManagement key="ProductionLineManagement" />,
    <ProductionManagement key="ProductionManagement" />,
    <LabelErrorHistory key="LabelErrorHistory" />,
    <ActivationProductionLine key="ActivationProductionLine" />,
    <Statistics key="Statistics" stats={fakeStats} />,
    <Issue key="Issue" />,
    // <CreateUser key="CreateUser" />
  ];

  return (
    <div className='mt-16 mx-16'>
        <Grid items={gridComponents} />
    </div>    
  )
}

export default page