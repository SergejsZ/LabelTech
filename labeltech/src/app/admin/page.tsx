"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Page: React.FC = () => {
  useEffect(() => {
    window.location.href = "/admin/productManagement";
  }, []);
  return null;
};

export default Page;