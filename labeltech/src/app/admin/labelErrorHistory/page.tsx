"use client";

import PageLayout from '@/app/admin/page';
import CustomCalendar from '@/components/Calendar/Calendar';
import { useState } from 'react';
import "@/styles/calendar.css";
import "@/styles/timeline.css";
import ErrorBarChart from '@/components/ErrorBarChart';
import Timeline from '@/components/TimeLine';


const page = () => {

  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);

  return (
    <PageLayout >
      <div className='ml-96 mt-10 w-9/12'>
        <h2 className='text-2xl font-bold mb-10'>Label error history</h2>
        <div className='w-full flex'>
          <div className='w-6/12'>
            <div>
              <CustomCalendar 
                date={date}
                setDate={setDate}
                selectRange={selectRange}
                setSelectRange={setSelectRange}
              />
            </div>
            <div className='mt-16'>
              <ErrorBarChart />
            </div>
          </div>
          <div className='w-9/12'>
            <Timeline />
          </div>
        </div>
      </div>
    </PageLayout >
  );
};

export default page;