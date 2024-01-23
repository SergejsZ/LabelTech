import Product from "./Product";
import { useState } from "react";

type ProductDetails = {
  productCode: number;
  productName: string;
  productWeight: number;
  productCustomerID: number;
  productExpiryDate: string;
};

function ProductList({ products }: { products: Array<{ productName: string, productCode: number,productWeight:number, productCustomerID: number, productExpiryDate: string, ProductImage: string}> }) {
    return (
      <div className="flex flex-col space-y-4">
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
            </div>
          );
        })}
      </div>
    );
}

export default ProductList