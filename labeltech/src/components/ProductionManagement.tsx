import { useEffect, useState } from "react";
import axios from "axios";

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

const ProductionManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [editDetails, setEditDetails] = useState<ProductDetails | null>(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showOnlyProductList, setShowOnlyProductList] = useState(false);
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

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedProduct) {
        const { productCode } = selectedProduct;
        await axios.put(
          `http://localhost:4000/api/products/${productCode}`,
          editDetails
        );

        //refresh products
        const response = await axios.get("http://localhost:4000/api/products");
        const updatedProducts = response.data;
        setProducts(updatedProducts);
        setSelectedProduct(null); //clear the selected product after update
        setShowDeleteButton(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditDetails({
      ...editDetails,
      [event.target.name]: event.target.value,
    } as ProductDetails);
  };

  const handleProductClick = (productCode: number) => {
    const product = products.find((p) => p.productCode === productCode);
    if (product) {
      setSelectedProduct(product);
      setSelectedCode(productCode);
      setEditDetails(product); //set initial values for the edit form
      setShowDeleteButton(true);
    }
  };

  const renderInputFields = () => {
    return Object.entries(editDetails || {}).map(([key, value]) => (
      <input
        key={key}
        type="text"
        name={key}
        className="p-2 border-solid border-2 rounded-lg border-black mt-4 mr-3"
        value={value}
        onChange={handleEditChange}
        placeholder={`New ${key}`}
      />
    ));
  };

  const handleDeleteClick = async () => {
    try {
      if (selectedProduct) {
        const { productCode } = selectedProduct;
        await axios.delete(`http://localhost:4000/api/products/${productCode}`);

        //refresh the product list after deletion
        const response = await axios.get("http://localhost:4000/api/products");
        const updatedProducts = response.data;
        setProducts(updatedProducts);
        setSelectedProduct(null); //clear the selected product after deletion
        setShowDeleteButton(false); //hide the delete button after deletion
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (showOnlyProductList) {
    return (
      <div>
        <h2 className="text-center font-bold">Product Management</h2>
        <ul className="m-2 w-32">
          {products.map((product) => (
            <li
              key={product.productCode}
              className={`border-solid border-black border rounded-lg text-center`}
            >
              {product.productCode}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h2 className="text-center font-bold">Product Management</h2>
      <div className="h-full pt-16">
        <div className="flex h-full">
          <ul className="m-2 w-1/4 h-full">
            {products.map((product) => (
              <li
                key={product.productCode}
                className={`border-solid border-black border rounded-lg text-center ${
                  product.productCode === selectedCode ? "bg-green-400" : ""
                }`}
                onClick={() => handleProductClick(product.productCode)}
              >
                {product.productCode}
              </li>
            ))}
          </ul>

          {selectedProduct && (
            <div className="product-details border-solid border-2 rounded-lg border-black flex justify-around w-2/3 ml-16 pt-4 h-3/4">
              <div>
                <h2 className="font-bold text-center">Product detail</h2>
                <div className="max-w-[100%]">
                  {/* Display all columns for the selected product */}
                  {Object.entries(selectedProduct).map(([key, value]) => (
                    <p key={key} className="p-3">
                      {key}: {value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border-l-solid border-l-2 border-black pl-8">
                <h2 className="font-bold text-center">
                  Edit the product detail
                </h2>
                <form onSubmit={handleEditSubmit} className="flex flex-col">
                  {renderInputFields()}
                  <button className="greenbtn m-1 mt-4" type="submit">
                    Save Changes
                  </button>
                  {showDeleteButton && (
                    <button
                      className="redbtn m-1 mt-4"
                      onClick={handleDeleteClick}
                    >
                      Delete Product
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionManagement;
