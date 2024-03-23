"use client";

import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomerList from '@/components/CustomerList';

const Page = () => {
  return (
    <PageLayout >
    <div className='ml-8 mt-10 w-full'>
      <h2 className='text-2xl font-bold mb-10'>Customer Managment</h2>
      <CustomerList />
    </div>
    </PageLayout >
  );
};

export default Page;