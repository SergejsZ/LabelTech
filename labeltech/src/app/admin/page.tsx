"use client";

import React from 'react';
import SideBar from '@/components/SideBar';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <SideBar />
      {children}
    </div>
  );
};

export default PageLayout;