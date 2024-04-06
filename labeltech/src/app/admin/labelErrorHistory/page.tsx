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
import { useAuth } from '@/app/hooks/useAuth';
import Loading from '@/components/Loading';


const Page = () => {

  useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

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

  function startSimulation() {
    axios.post('http://localhost:4000/api/systemSimulation1', {
      // Any data you want to send to the endpoint goes here
    })
    .then((response) => {
      console.log("Simulation started successfully:");
      // Handle success (e.g., display a confirmation message)
    })
    .catch((error) => {
      console.error("Error running simulation:", error);
    }); 
  }

  function stopSimulation() {
    axios.post('http://localhost:4000/api/simulation/stop', {
      // Any data you want to send to the endpoint goes here
    })
    .then((response) => {
      console.log("Simulation stopped successfully:");
      // Handle success (e.g., display a confirmation message)
    })
    .catch((error) => {
      console.error("Error running simulation:", error);
    }); 
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  else{
    return (
      <PageLayout >
        <div className='pl-8 mt-10 w-full'>
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

          <button className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // const today = new Date();
            // const dateString = today.toISOString().split('T')[0];
            // const fileName = `label_error_data_${dateString}.csv`; 
            // exportToCSV(errorData, fileName);
            startSimulation();
          }}>
              Simulate Test Performance
          </button>

          <button className="bg-blue-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // const today = new Date();
            // const dateString = today.toISOString().split('T')[0];
            // const fileName = `label_error_data_${dateString}.csv`; 
            // exportToCSV(errorData, fileName);
            stopSimulation();
          }}>
              stopSimulation
          </button>

          

          {/* si l'écran est petit, affiche en colonne, sinon en ligne */}
          <div className='w-full flex flex-col lg:flex-row'>
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
  }
};

export default Page;