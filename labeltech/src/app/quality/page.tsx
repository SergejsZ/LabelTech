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
  
  const productCodes = ['12471', '31741', '14567', '13567', '12784', '87452', '83647'];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const products = response.data;
        setProducts(products);
        console.log(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  const handleProductCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductCode(e.target.value);
  };

  const takePicture = () => {
    // Logic to take a picture, probably integrating with a device camera
    console.log('Open camera to take a picture');
  };

  const analyseMushrooms = () => {
    // Logic to analyse the mushrooms using machine learning
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
      </div>
    </div>
  );
};

export default Page