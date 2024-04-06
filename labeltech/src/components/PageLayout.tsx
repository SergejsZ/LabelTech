import React, { ReactNode } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className='h-screen'>
        <div id="loader-wrapper">
          <div className='loader-section section-left'></div>
          <div className='loader-section section-right'></div>
        </div>
        {/* <SideBar /> */}
        <NavBar />
      {children}
    </div>
  );
};

export default PageLayout;
