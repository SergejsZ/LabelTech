"use client"

import ActivationPorductionLine from '@/components/ActivationPorductionLine';
import Grid from '@/components/Grid'
import Issue from '@/components/Issue';
import LabelErrorHistory from '@/components/LabelErrorHistory';
import ProductionLineManagement from '@/components/ProductionLineManagement';
import ProductionManagement from '@/components/ProductionManagement';
import Statistics from '@/components/Statistics';
import React from 'react'

const page = () => {

  const gridComponents = [
    <ProductionLineManagement />,
    <ProductionManagement />,
    <LabelErrorHistory />,
    <ActivationPorductionLine />,
    <Statistics />,
    <Issue />,
  ];

  return (
    <div className='mt-16 mx-16'>
        <Grid components={gridComponents} />
    </div>    
  )
}

export default page