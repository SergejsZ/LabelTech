import Product from "./Product";
import { useState } from "react";
import axios from "axios";

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

function ProductGrid({ products }: { products: Array<{ productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage: string}> }) {

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>, productCode: number) => {
    event.preventDefault();


      // Récupérer les valeurs des champs de saisie
      const form = event.currentTarget;
      const formData = new FormData(form);
      const updatedProduct = {
        productName: formData.get('name') as string,
        productCode: formData.get('product code') as string,
        productWeight: formData.get('weight') as string,
        productCustomerID: formData.get('customerId') as string,
        productExpiryDate: formData.get('expiryDate') as string,
      };
    
      console.log('Mise à jour du produit', updatedProduct);
    
      // Faire une requête PUT à l'API pour mettre à jour le produit
      try {
        const response = await axios.put(`http://localhost:4000/api/products/${productCode}`, updatedProduct);
        console.log('Réponse de l\'API', response);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du produit', error);
      }
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

  const handleDeleteClick = async (productCode: number) => {  
    console.log('product deleted');
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
        {products.map((product) => {
          const [isHovered, setIsHovered] = useState(false);
          return (
            <div 
              className="relative transform transition-transform duration-500 hover:scale-110"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Product
                key={product.productCode}
                productName={product.productName}
                productCode={product.productCode}
                productWeight={product.productWeight}
                productCustomerID={product.productCustomerID}
                productExpiryDate={product.productExpiryDate} 
                ProductImage={product.ProductImage}
              />
              {isHovered && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <button 
                  onClick={() => renderInputFields()}
                  className="absolute center top-1/4 right-2/4 m-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteClick(product.productCode)}
                  className="absolute center top-1/4 right-1/4 m-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete  
                </button>
              </div>
              )}
            </div>
          );
        })}
      </div>
    );
}

export default ProductGrid