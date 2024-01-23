"use client";

import PageLayout from '@/app/admin/page';
import ProductGrid from '@/components/ProductGrid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fakeProducts = [
  { name: 'Mini portobello', code: 1234, retailer: 12, expiryDate: '2024/01/19'},
  // { name: 'Baby button', code: 6543, retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },
  // { name: 'White button', code: 9876, retailer: 'Tesco', expiryDate: '2024/01/21', imageUrl: '../../../../utils/images/button.jpeg' },
  // { name: 'Baby button', code: 6544, retailer: 'Dubbes', expiryDate: '2024/01/20', imageUrl: '../../../../utils/images/babyButton.jpeg' },

];

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
  ProductImage: string;
};

const page = () => {

  const [products, setProducts] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const products = response.data;
        setProducts(products);
        console.log(products);
        console.log(fakeProducts);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);
  

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
      const ProductImage = formData.get('productImage') as File;

      // const NameImage = ProductImage.name;
    

      // Log the form data
      console.log('Product Code:', productCode);
      console.log('Product Name:', productName);
      console.log('Product Weight:', productWeight);
      console.log('Product Customer ID:', productCustomerID);
      console.log('Product Expiry Date:', productExpiryDate);
      // console.log('Product Image:', NameImage);

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
          // NameImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Product added successfully, you can handle this as needed
        console.log('Product added successfully:', data);
        setIsFormVisible(false); // Hide the form after successful submission
        // rerender the page
        window.location.reload();
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
      <ProductGrid products={products.map((product) => ({ productName: product.productName, productCode: product.productCode,productWeight:product.productWeight, productCustomerID: product.productCustomerID, productExpiryDate: product.productExpiryDate, ProductImage: product.ProductImage }))} />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ paddingTop: '5px', paddingBottom: '5px' }}
        onClick={handleAddProduct}
      >
        Add Product
      </button>

      {/* Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 border-solid border-2 p-3">
        <div className='flex flex-row justify-center'>
          <div className="flex flex-col mr-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCode">
              Product Code:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productCode" id="productCode" required />
          </div>
        
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productName" id="productName" required />
          </div>
        </div>
      
        <div className='flex flex-row justify-center'>
          <div className="flex flex-col mr-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productWeight">
              Product Weight:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productWeight" id="productWeight" required />
          </div>
        
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCustomerID">
              Product Customer ID:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="productCustomerID" id="productCustomerID" required />
          </div>
        </div>
      
        <div className='flex justify-center'>
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productExpiryDate">
              Product Expiry Date:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" name="productExpiryDate" id="productExpiryDate" required />
          </div>
        </div>
      
        {/* 
        <div className="flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
            Product Image:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="productImage" id="productImage" accept="image/*" required />
        </div>
        */}
      
        <div className="flex justify-center">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
      
      )}

    </div>
    </PageLayout >
  );
};

export default page;