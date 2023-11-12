"use client";

import React, { useState } from 'react'

const page = () => {

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const currentDate = `${day}/${month}/${year}`;

  const [productCode, setProductCode] = useState('');
  const [depotDate, setDepotDate] = useState('');
  const [packingError, setPackingError] = useState(0);
  const [packedWithoutError, setPackedWithoutError] = useState(0);

  const handleConfirm = () => {

  };

  const handleStartScanning = () => {

  };

  return (
    <div className='text-3xl'>
      <div className='flex justify-end w-full mt-10'>
        <p className='mr-5'>Today's date</p>
        <p className='greyinput mr-16'>{currentDate}</p>
      </div>
      <div className="flex justify-between p-5">
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6 mr-3 text-center">
        <div className="mb-4">
          <label htmlFor="productCode" className="block text-lg font-semibold mb-2">Select product code:</label>
          <input 
            type="text" 
            id="productCode" 
            placeholder="Enter product code" 
            value={productCode} 
            onChange={(e) => setProductCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="depotDate" className="block text-lg font-semibold mb-2">Select depot date:</label>
          <input 
            type="date" 
            id="depotDate" 
            value={depotDate} 
            onChange={(e) => setDepotDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button 
          onClick={handleConfirm} 
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
      </div>

      <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-lg font-semibold mb-4">Scanning in progress</div>
        
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-100 border border-gray-300 rounded">
          <label htmlFor="packingError" className="text-lg font-semibold">Packing error:</label>
          <span className="text-xl font-bold p-2 bg-gray-200 rounded">{packingError}</span>
        </div>

        <div className="flex justify-between items-center mb-6 p-3 bg-gray-100 border border-gray-300 rounded">
          <label htmlFor="packedWithoutError" className="text-lg font-semibold">Packed without error:</label>
          <span className="text-xl font-bold p-2 bg-gray-200 rounded">{packedWithoutError}</span>
        </div>
      </div>
    </div>
    <div className='flex justify-center mt-16'>
      <p className='mr-10 pt-2'>Start scanning</p>
      <button className='greenbtn'>Start</button>
    </div>
  </div>
  )
}

export default page