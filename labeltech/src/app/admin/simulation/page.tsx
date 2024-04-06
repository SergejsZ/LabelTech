"use client";
import React from 'react'
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { useAuth } from '@/app/hooks/useAuth';
import Loading from '@/components/Loading';

const Simuation = () => {
    useAuth();

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500); 
  
      return () => clearTimeout(timer);
    }, []);
  
    const [loading, setLoading] = useState(true);
  
    if (loading) {
      return <Loading />;
    }
    else{
      return (
        <PageLayout >
        <div className='ml-8 mt-10 w-full'>
            <p>Simulation</p>
        </div>
        </PageLayout >
      );
    }
  };

export default Simuation