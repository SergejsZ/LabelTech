import Product from "./Product";
import { useState } from "react";
import axios from "axios";


function ProductGrid({ products }: { products: Array<{ productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage: string}> }) {
  
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddProduct = () => {
    setIsFormVisible(!isFormVisible);
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
          // const [isHovered, setIsHovered] = useState(false);
          return (
            <div 
              className="relative transform transition-transform duration-500 hover:scale-110"
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
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

              {/* {isHovered && (
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
              )} */}
            </div>
          );
        })}
        <div className="flex flex-col justify-center items-center">
        {!isFormVisible && (
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center"
          onClick={handleAddProduct}>
          <span className="text-2xl leading-none">+</span>
        </button>
        )}
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
      </div>
    );
}

export default ProductGrid