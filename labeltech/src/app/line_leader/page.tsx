"use client";

import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import ProgressionBar from '@/components/ProgressionBar';
import { useAuth } from '../hooks/useAuth';
import Loading from '@/components/Loading';
import { json } from 'stream/consumers';

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

async function logout() {
  localStorage.removeItem('token');
  await fetch('/api/logout');
  window.location.href = '/login';
}

const Page = () => {
  useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const today = new Date();
  const currentDate = formatDate(today);

  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [packingError, setPackingError] = useState(0);
  const [criticalPackingError, setCriticalPackingError] = useState(0);
  const [running, setRunning] = useState(false);
  const [packedWithoutError, setPackedWithoutError] = useState(0);
  const [productCode, setProductCode] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [products, setProducts] = useState([]);
  const [previouscriticalPackingError, setPreviouscriticalPackingError] = useState(criticalPackingError);
  const [showAlert, setShowAlert] = useState(false);
  const [productLog, setProductLog] = useState({ totalScanned: 0, totalNumberErrors: 0 });

  //last ten scans is a list of strings, each string represents a scan
  const [lastTenScans, setLastTenScans] = useState<string[]>([]);
  
const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);  

  useEffect(() => {
    if (showAlert) {
      if (navigator.vibrate) {
        // Vibrate until showAlert is false
        const interval = setInterval(() => {
          navigator.vibrate(200);
          console.log('Vibrating');
        }, 200);
      }
    }
  }, [showAlert]);

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

useEffect(() => {
  if (criticalPackingError > previouscriticalPackingError) {
    setShowAlert(true);
  }
  setPreviouscriticalPackingError(criticalPackingError);
}, [criticalPackingError]);



  useEffect(() => {
    const storedProductCode = localStorage.getItem('productCode');
    const storedDispatchDate = localStorage.getItem('dispatchDate');
    if (storedProductCode && storedDispatchDate) {
      setProductCode(storedProductCode);
      setDispatchDate(formatDate(new Date(storedDispatchDate)));
      setIsButtonDisabled(false);
    }
  }, []);  

  const handleConfirm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    createNewLog();
    console.log('Product code:', productLog);

    localStorage.setItem('productCode', productCode);
    localStorage.setItem('dispatchDate', dispatchDate);
    setIsButtonDisabled(false);
  };


  const clearLocalStorage = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to reset? This action will stop the Scan and reset the data!`
    );
    if (confirmDelete) {
      setRunning(false);
      localStorage.removeItem('productCode');
      localStorage.removeItem('dispatchDate');
      setCriticalPackingError(0);
      setPackingError(0);
      setPackedWithoutError(0);
      setProductCode('');
      setDispatchDate('');
      setIsButtonDisabled(true);
      setLastTenScans([]);
      setProductLog({ totalScanned: 0, totalNumberErrors: 0 });
    }
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (running) {
      interval = setInterval(() => {


        //--------- Use this function to perform real time scanning 
        // fetchScansLog();

        //---------- Use this code to simulate scanning
        simulateScanning();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [running, packedWithoutError]);

  function fetchScansLog() {
    console.log(productCode);
    fetch(`http://localhost:4000/api/productscanlogs/${productCode}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setPackedWithoutError(data.totalScanned);
        setCriticalPackingError(data.totalNumberErrors);
        
        const prevTotalScan = (productLog as { totalScanned: number }).totalScanned;
        const prevTotalError = (productLog as { totalNumberErrors: number }).totalNumberErrors;
        if (data.totalScanned > prevTotalScan) {
          console.log('New scan detected');
          if (data.totalNumberErrors > prevTotalError) {
            console.log('New error detected');
              
            if (lastTenScans.length === 10) {
              setLastTenScans((prev) => prev.slice(1).concat('date'));
            } else {
              setLastTenScans((prev) => prev.concat('date'));
            }
          }
          else{ 
            console.log('No new error');
            if (lastTenScans.length === 10) {
              setLastTenScans((prev) => prev.slice(1).concat(''));
            } else {
              setLastTenScans((prev) => prev.concat(''));
            }
              
          }
        }
        setProductLog(data);
      })

  }

  function simulateScanning() {
    setPackedWithoutError((prev) => prev + 1);
      if ((packedWithoutError + 1) % 5 === 0) {
        setPackingError((err) => err + 1);
        // add a new scan to the last ten scans, if the last ten scans is full, remove the first scan
        if (lastTenScans.length === 10) {
          setLastTenScans((prev) => prev.slice(1).concat('missplacement'));
        } else {
          setLastTenScans((prev) => prev.concat('missplacement'));
        }
      }
      else if ((packedWithoutError + 1) % 8 === 0) {
        setCriticalPackingError((err) => err + 1);
        // add a new scan to the last ten scans, if the last ten scans is full, remove the first scan
        if (lastTenScans.length === 10) {
          setLastTenScans((prev) => prev.slice(1).concat('date'));
        } else {
          setLastTenScans((prev) => prev.concat('date'));
        }
      }
      else{
        // add a new scan to the last ten scans, if the last ten scans is full, remove the first scan
        if (lastTenScans.length === 10) {
          setLastTenScans((prev) => prev.slice(1).concat(''));
        } else {
          setLastTenScans((prev) => prev.concat(''));
        }
      }
  }

  function createNewLog() {
    const newLog = {
      productCode: productCode,
      productScannedDate: currentDate
    };
    fetch('http://localhost:4000/api/productscanlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setProductLog(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  const switchState = () => {
    setRunning(!running);
  }

  if (loading) {
    return <Loading />;
  }

  else{
    return (
      <div className='text-3xl'>
        {/* Page content */}
        <div className='flex flex-col md:flex-row justify-end items-center w-full mt-10'>
          <p className='md:mr-5 mb-2 md:mb-0'>Today&apos;s date:</p>
          <p className='greyinput mb-2 md:mb-0 md:mr-8'>{currentDate}</p>
          <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
        </div>

        
        <div className="flex p-5 flex-col space-y-10 md:flex-row md:space-x-5 md:space-y-0">
          {/* Form for product code and dispatch date */}
          <form onSubmit={handleConfirm} className="flex-1 bg-white shadow-lg rounded-lg p-6 mr-3 text-center">
            {/* Product Code Input */}
            <div className="mb-4">
              <label htmlFor="productCode" className="block text-lg font-semibold mb-2">Select product code:</label>
              <select 
                id="productCode" 
                name="productCode"
                className="w-full p-2 border border-gray-300 rounded"
                value={productCode} onChange={(e) => setProductCode(e.target.value)}
                required
              >
                <option value="">Select product code</option>
                {products.map((product: { productCode: string; name: string; productName: string; }) => (
                  <option key={product.productCode} value={product.productCode}>
                    {product.productCode} - {product.productName}
                  </option>
                ))}
              </select>
            </div>

            {/* Dispatch Date Input */}
            <div className="mb-6">
              <label htmlFor="dispatchDate" className="block text-lg font-semibold mb-2">Select dispatch date:</label>
              <input 
                type="date" 
                id="dispatchDate" 
                name="dispatchDate"
                value={dispatchDate} 
                onChange={(e) => setDispatchDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center space-x-4">
              <button 
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${!isButtonDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : ''}`}
                disabled={!isButtonDisabled}
              >
                Confirm
              </button>
              {!isButtonDisabled && <CheckCircleIcon className="h-10 w-10 text-green-500 mt-2" />}
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded space-x-4 mt-4" onClick={clearLocalStorage}>Reset</button>
          </form>
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-lg font-semibold mb-4">Scanning</div>
              
              {/* Packed Without Error Display */}
              <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 border border-gray-300 rounded">
                <span>Scanned package:</span>
                <span className="text-xl font-bold p-2 bg-gray-200 rounded">{packedWithoutError}</span>
              </div>

              {/* Packing Error Display */}
              {/* <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 border border-gray-300 rounded">
                <span>Non-critical error:</span>
                <span className="text-xl font-bold p-2 bg-gray-200 rounded flex">{packingError} {packingError !== 0 && <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />}</span>
              </div> */}
              <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 border border-gray-300 rounded">
                <span>Errors:</span>
                <span className="text-xl font-bold p-2 bg-gray-200 rounded flex">{criticalPackingError} {criticalPackingError !== 0 && <ExclamationCircleIcon className='h-8 h-8 text-red-500' />}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-16'>
          <button 
            className={`px-4 py-2 text-white ${running ? 'bg-red-500' : 'bg-blue-500'} rounded ${isButtonDisabled ? 'cursor-not-allowed bg-gray-400' : ''}`}
            onClick={switchState}
            disabled={isButtonDisabled}
          >
            {running ? 'Stop' : 'Start'} Scanning
          </button>
        </div>
        {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded">
          <div>
            <ExclamationTriangleIcon className="h-30 w-30 text-red-500 animate-blink" />
            <h1 className="text-lg font-semibold">Critical error detected, please stop the production line</h1>
          </div>
          <button className="mt-4" onClick={() => setShowAlert(false)}>Close</button>
        </div>
      </div>
      )}
      
        <ProgressionBar errorData={lastTenScans} />
      </div>
    );
  }
};

export default Page;
