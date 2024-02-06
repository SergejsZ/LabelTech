"use client";

import PageLayout from '@/components/PageLayout';
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
  productId: number;
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
  ProductImage: string;
};

const Page = () => {

  const [products, setProducts] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const products = response.data;
        setProducts(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);
  

  // const [isFormVisible, setIsFormVisible] = useState(false);

  // const handleAddProduct = () => {
  //   setIsFormVisible(true);
  // };

  
  
  return (
    <PageLayout >
    <div className='ml-96 mt-10'>
      <h2 className='text-2xl font-bold mb-10'>Product Managment</h2>
      <ProductGrid products={products.map((product) => ({ productId: product.productId,productName: product.productName, productCode: product.productCode,productWeight:product.productWeight, productCustomerID: product.productCustomerID, productExpiryDate: product.productExpiryDate, ProductImage: product.ProductImage }))} />
    </div>
    </PageLayout >
  );
};

export default Page;