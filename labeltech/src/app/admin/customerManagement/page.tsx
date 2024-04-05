"use client";

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import CustomerList from '@/components/CustomerList';
import { useAuth } from '@/app/hooks/useAuth';

const Page = () => {
  useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }
  else{
    return (
      <PageLayout >
      <div className='ml-8 mt-10 w-full'>
        <h2 className='text-2xl font-bold mb-10'>Customer Managment</h2>
        <CustomerList />
      </div>
      </PageLayout >
    );
  }
};

export default Page;