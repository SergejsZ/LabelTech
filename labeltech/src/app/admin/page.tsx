"use client";

import React, { useEffect } from 'react';

const Page: React.FC = () => {
  useEffect(() => {
    window.location.href = "/admin/productManagement";
  }, []);

  return null;
};

export default Page;