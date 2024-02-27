"use client";

import React from 'react';
import PageLayout from '@/components/PageLayout';
import UserList from '@/components/UserList';

const Page = () => {
  return (
    <PageLayout >
    <div className='ml-8 mt-10 w-full'>
      <h2 className='text-2xl font-bold mb-10'>User Managment</h2>
      <UserList />
    </div>
    </PageLayout >
  );
};

export default Page;