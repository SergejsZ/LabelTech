"use client";

import ActivationProductionLine from '@/components/ActivationProductionLine';
import CreateUser from '@/components/CreateUsers';
import Grid from '@/components/Grid';
import Issue from '@/components/Issue';
import LabelErrorHistory from '@/components/LabelErrorHistory';
import ProductionLineManagement from '@/components/ProductionLineManagement';
import ProductionManagement from '@/components/ProductionManagement';
import Statistics from '@/components/Statistics';
import React, { useState } from 'react';
import SideBar from '../../components/SideBar';

const Page = () => {
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

  const fakeStats = {
    totalErrors: 78,
    errorRate: '2.5%',
    informationLogs: 1500,
  };

  const gridComponents = [
    <ProductionLineManagement key="ProductionLineManagement" />,
    <ProductionManagement key="ProductionManagement" />,
    <LabelErrorHistory key="LabelErrorHistory" />,
    <ActivationProductionLine key="ActivationProductionLine" />,
    <Statistics key="Statistics" stats={fakeStats} />,
    <Issue key="Issue" />,
    // <CreateUser key="CreateUser" />
  ];

  return (
    <div>
      <SideBar />
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

      <Grid items={gridComponents} />
    </div>
  );
};

export default Page;
