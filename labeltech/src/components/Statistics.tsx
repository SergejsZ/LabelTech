import React from 'react';

interface StatisticsProps {
  stats: {
    totalErrors: number;
    informationLogs: number;
    errorRate: string;
  };
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 m-6'>
      <h2 className='font-bold text-center mb-4'>Statistics</h2>
      <div className='flex flex-wrap justify-around text-center'>
        <div className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
          <h3 className='text-lg font-semibold'>Total Errors</h3>
          <p className='text-3xl'>{stats.totalErrors}</p>
        </div>
        <div className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
          <h3 className='text-lg font-semibold'>Total Check</h3>
          <p className='text-3xl'>{stats.informationLogs}</p>
        </div>
        <div className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
          <h3 className='text-lg font-semibold'>Error Rate</h3>
          <p className='text-3xl'>{stats.errorRate}</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics;
