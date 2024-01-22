"use client";

import React from 'react';
import SideBar from '@/components/SideBar';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      {children}
    </div>
  );
};

export default PageLayout;