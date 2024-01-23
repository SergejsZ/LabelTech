"use client";

import React from 'react'
import { useState } from 'react'
import axios from 'axios';

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

const Product = ({ productName, productCode, productWeight,  productCustomerID, productExpiryDate, ProductImage }: { productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage:string }) => {

  const [isClicked, setIsClicked] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Récupérez les valeurs des champs du formulaire
    const formData = new FormData(event.target as HTMLFormElement);
    const updatedProduct = Object.fromEntries(formData);
  
    // Mettez à jour le produit dans la base de données
    // Remplacez cette ligne par le code réel pour mettre à jour le produit
    console.log('Mise à jour du produit', updatedProduct);
  
  };

  const renderInputFields = () => {
    const productProperties = ['name', 'product code', 'weight', 'customerId', 'expiryDate'];
  
    return productProperties.map((property) => (
      <label key={property} className="flex flex-col mt-4">
        {property.charAt(0).toUpperCase() + property.slice(1)}
        <input type="text" name={property} required />
      </label>
    ));
  };

  const handleDeleteClick = async () => {  
    console.log('Suppression du produit');
    try {
      await axios.put(
        `http://localhost:4000/api/products/${productCode}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div 
    className={`relative transition-colors duration-500 ${isHovered ? 'bg-gray-500' : 'bg-white'}`} 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Customer: {productCustomerID}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Expiry: {productExpiryDate}</span>
        </div>
      </div> 
      {isHovered && (
        <div>
          <button 
            onClick={() => setIsClicked(true)}
            className="absolute center top-1/4 right-2/4 m-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => handleDeleteClick()}
            className="absolute center top-1/4 right-1/4 m-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete  
          </button>
        </div>
      )}
    </div>
  )
}

export default Product
