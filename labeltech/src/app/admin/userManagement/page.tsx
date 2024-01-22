"use client";

import PageLayout from '@/app/admin/page';
import Issue from '@/components/Issue';
import UserList from '@/components/UserList';

const page = () => {
  return (
    <PageLayout >
    <div className='ml-96 mt-10 w-9/12'>
      <h2 className='text-2xl font-bold mb-10'>users managment</h2>
      <UserList />
    </div>
    </PageLayout >
  );
};

export default page;