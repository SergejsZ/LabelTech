import React, { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className='h-screen'>
        {/* <SideBar /> */}
        <NavBar />
      {children}
    </div>
  );
};

export default PageLayout;
