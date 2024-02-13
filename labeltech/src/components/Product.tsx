"use client";

import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/solid";

type Customer = {
  CustomerID: number;
  CustomerName: string;
};



const Product = ({productId, productName, productCode, productWeight,  productCustomerID, productExpiryDate, ProductImage, onClick }: { productId: number, productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage:string, onClick: () => void }) => {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${productName}?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:4000/api/products/${productCode}`
        );
        // Refresh the user list after deletion
        const response = await axios.get('http://localhost:4000/api/products');
        const updatedProducts = response.data;
        setProducts(updatedProducts);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div>
      <button onClick={onClick} className="absolute top-1 right-8 px-4 py-2 text-black rounded">
        <PencilIcon className="h-5 w-5" />
      </button>
      <button onClick={handleDelete} className="absolute top-0 right-0 px-4 py-2 text-black rounded">
        <TrashIcon
         className="h-6 w-6" />
      </button>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{productName}</div>
          <p className="text-gray-700 text-base">
            Product code: <span className='font-bold'>{productCode}</span>
          </p>
        </div>
        <div>
            <div className="px-6">
              <p className="text-gray-700 text-base">
                Product weight: <span className='font-bold'>{productWeight} </span>grams 
              </p>
            </div>

        </div>
        {/* <div className="flex justify-center">
          <img src={ProductImage} alt={ProductImage} className="w-64 h-64" />
        </div> */}
        <div className="px-6 pt-4 pb-2 flex flex-col">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Customer: {customers.find((customer) => customer.CustomerID === productCustomerID)?.CustomerName}</span>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Expiry: {productExpiryDate}</span> */}
        </div>
      </div> 
    </div>
  )
}

export default Product
