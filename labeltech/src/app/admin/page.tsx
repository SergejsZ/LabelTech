"use client";

import React, { ReactNode } from 'react';
import SideBar from '@/components/SideBar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      {children}
    </div>
  );
};

export default PageLayout;
