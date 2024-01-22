"use client";

import PageLayout from '@/app/admin/page';
import CustomCalendar from '@/components/Calendar/Calendar';
import { useState } from 'react';
import "@/styles/calendar.css";


const page = () => {

  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);

  return (
    <PageLayout >
    <div className='ml-96 mt-10 w-9/12'>
      <h2 className='text-2xl font-bold mb-10'>Label error history</h2>
      <CustomCalendar 
        date={date}
        setDate={setDate}
        selectRange={selectRange}
        setSelectRange={setSelectRange}
      />
    </div>
    </PageLayout >
  );
};

export default page;