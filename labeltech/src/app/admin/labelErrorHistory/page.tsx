"use client";

import PageLayout from '@/components/PageLayout';
import CustomCalendar from '@/components/Calendar/Calendar';
import { useState } from 'react';
import "@/styles/calendar.css";
import "@/styles/timeline.css";
import ErrorBarChart from '@/components/ErrorBarChart';
import Timeline from '@/components/TimeLine';
import axios from 'axios';
import { useEffect } from 'react';


const Page = () => {

  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/labelErrors');
        setErrorData(response.data);
      } catch (error) {
        console.error("Error fetching error data:", error);
      }
    };

    fetchErrorData();
  }, []);

  interface DataObject {
    [key: string]: any;
  }

  function exportToCSV(data: DataObject[], filename: string) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).toString().replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <PageLayout >
      <div className='ml-96 mt-10 w-9/12'>
        <h2 className='text-2xl font-bold mb-10'>Label Error History</h2>
        <button className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const today = new Date();
          const dateString = today.toISOString().split('T')[0];
          const fileName = `label_error_data_${dateString}.csv`; 
          exportToCSV(errorData, fileName);
        }}>
            Export Label Error Data to CSV
        </button>
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
            <Timeline selectedDate={date} />
          </div>
        </div>
      </div>
    </PageLayout >
  );
};

export default Page;