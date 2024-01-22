"use client";

import PageLayout from '@/app/admin/page';
import Issue from '@/components/Issue';

const page = () => {
  return (
    <PageLayout >
    <div className='ml-96 mt-10 w-9/12'>
      <p>users managment</p>
      <Issue />
    </div>
    </PageLayout >
  );
};

export default page;