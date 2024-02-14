"use client";

import Camera from '@/components/Camera'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ProductList from '@/components/ProductList'



type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
  ProductImage: string;
};

const Page = () => {

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [selectedProductCode, setSelectedProductCode] = useState('');
  
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
      const fetchErrorData = async () => {
          try {
              const response = await axios.get('http://localhost:4000/api/qualityErrors');
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
  

  const handleProductCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductCode(e.target.value);
  };

  const takePicture = () => {
    console.log('Open camera to take a picture');
  };

  const analyseMushrooms = () => {
    console.log('Analyse mushrooms with machine learning model');
  };

  return (
    <div className='flex'>
      <div className="flex flex-col items-center justify-center p-6">
        <ProductList products={products.map((product) => ({ productName: product.productName, productCode: product.productCode,productWeight:product.productWeight, productCustomerID: product.productCustomerID, productExpiryDate: product.productExpiryDate, ProductImage: product.ProductImage }))} />
      </div>
      <div className='p-5'>
        <button
          onClick={takePicture}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-4"
        >
          Take a picture
        </button>
        <button
          onClick={analyseMushrooms}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Analyse the mushrooms
        </button>
        <button className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => exportToCSV(errorData, 'error_data.csv')}>
            Export to CSV
          </button>
      </div>
    </div>
  );
};

export default Page