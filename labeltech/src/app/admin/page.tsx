"use client";

import React, { ReactNode } from 'react';
import SideBar from '@/components/SideBar';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <SideBar />
      {children}
    </div>
  );
};

export default PageLayout;
