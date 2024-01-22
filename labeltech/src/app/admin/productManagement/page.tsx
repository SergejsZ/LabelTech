"use client";

import PageLayout from '@/app/admin/page';
import ProductGrid from '@/components/ProductGrid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductionManagement from '@/components/ProductionManagement';

const fakeProducts = [
  { name: 'Mini portobello', code: '1234', retailer: 'Tesco', expiryDate: '2024/01/19', imageUrl: '../../../../utils/images/miniPortobello.jpeg' },
  { name: 'Baby button', code: '6543', retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },
  { name: 'White button', code: '9876', retailer: 'Tesco', expiryDate: '2024/01/21', imageUrl: '../../../../utils/images/button.jpeg' },
  { name: 'Baby button', code: '6543', retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },

];

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

const page = () => {
  

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddProduct = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const productCode = formData.get('productCode') as string;
      const productName = formData.get('productName') as string;
      const productWeight = formData.get('productWeight') as string;
      const productCustomerID = formData.get('productCustomerID') as string;
      const productExpiryDate = formData.get('productExpiryDate') as string;

      // Log the form data
      console.log('Product Code:', productCode);
      console.log('Product Name:', productName);
      console.log('Product Weight:', productWeight);
      console.log('Product Customer ID:', productCustomerID);
      console.log('Product Expiry Date:', productExpiryDate);

      // You can now send this data to the server to add it to the database
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode,
          productName,
          productWeight,
          productCustomerID,
          productExpiryDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Product added successfully, you can handle this as needed
        console.log('Product added successfully:', data);
        setIsFormVisible(false); // Hide the form after successful submission
      } else {
        // Error adding product, handle accordingly
        console.error('Error adding product:', data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  
  return (
    <PageLayout >
    <div className='ml-96 mt-10'>
      <h2 className='text-2xl font-bold mb-10'>products managment</h2>
      <ProductGrid products={fakeProducts} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ paddingTop: '5px', paddingBottom: '5px' }}
        onClick={handleAddProduct}
      >
        Add Product
      </button>

      {/* Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4">
          <label>
            Product Code:
            <input type="text" name="productCode" required />
          </label>
          <br />
          <label>
            Product Name:
            <input type="text" name="productName" required />
          </label>
          <br />
          <label>
            Product Weight:
            <input type="text" name="productWeight" required />
          </label>
          <br />
          <label>
            Product Customer ID:
            <input type="text" name="productCustomerID" required />
          </label>
          <br />
          <label>
            Product Expiry Date:
            <input type="date" name="productExpiryDate" required />
          </label>
          <br />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      )}
      <ProductionManagement />

    </div>
    </PageLayout >
  );
};

export default page;