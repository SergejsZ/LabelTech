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
    // Create an array of components to be rendered in the grid
  const gridComponents = [
    <ProductionLineManagement />,
    <ProductionManagement />,
    <LabelErrorHistory />,
    <ActivationPorductionLine />,
    <Statistics />,
    <Issue />,
  ];

  return (
    <div>
        <h1 className="text-center">Admin</h1>
        <Grid components={gridComponents} />
    </div>    
  )
}

export default page