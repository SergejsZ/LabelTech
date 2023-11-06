"use client"

import ActivationProductionLine from '@/components/ActivationProductionLine';
import Grid from '@/components/Grid'
import Issue from '@/components/Issue';
import LabelErrorHistory from '@/components/LabelErrorHistory';
import ProductionLineManagement from '@/components/ProductionLineManagement';
import ProductionManagement from '@/components/ProductionManagement';
import Statistics from '@/components/Statistics';
import React from 'react'

const page = () => {

  const fakeStats = {
    totalErrors: 78,
    downtime: '2h 35m',
    mostCommonError: 'Porduct code input error',
    errorRate: '2.5%',
    warnings: 56,
    informationLogs: 1500
  };

  const gridComponents = [
    <ProductionLineManagement />,
    <ProductionManagement />,
    <LabelErrorHistory />,
    <ActivationProductionLine />,
    <Statistics stats={fakeStats}/>,
    <Issue />,
  ];

  return (
    <div className='mt-16 mx-16'>
        <Grid items={gridComponents} />
    </div>    
  )
}

export default page