"use client";

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import UserList from '@/components/UserList';
import { useAuth } from '@/app/hooks/useAuth';
import Loading from '@/components/Loading';

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
    return(
      <Loading />
    );
  }
  else{
    return (
      <PageLayout >
      <div className='ml-8 mt-10 w-full'>
        <h2 className='text-2xl font-bold mb-10'>User Managment</h2>
        <UserList />
      </div>
      </PageLayout >
    );
  }
};

export default Page;