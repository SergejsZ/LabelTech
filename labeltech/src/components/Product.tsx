"use client";

import React from 'react'
import { useState } from 'react'

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

const Product = ({ productName, productCode, productCustomerID, productExpiryDate }: { productName: string, productCode: number, productCustomerID: number, productExpiryDate: string }) => {

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div onClick={() => setIsClicked(!isClicked)}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {/* <img src={imageUrl} alt={name} className="w-64 h-64" /> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{productName}</div>
          <p className="text-gray-700 text-base">
            Product code: {productCode}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{productCustomerID}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Expiry: {productExpiryDate}</span>
        </div>
      </div>
      {isClicked && 
        <div className='flex items-center justify-center'>
            <div className="product-details border-solid border-2 rounded-lg border-black flex justify-around w-2/3 ml-16 pt-4 h-3/4">
              <div>
                <h2 className="font-bold text-center">Product detail</h2>
                <div className="max-w-[100%]">
                  {/* Display all columns for the selected product */}

                </div>
              </div>
              <div className="border-l-solid border-l-2 border-black pl-8">
                <h2 className="font-bold text-center">
                  Edit the product detail
                </h2>
              </div>
            </div>
        </div>}
    </div>
  )
}

export default Product