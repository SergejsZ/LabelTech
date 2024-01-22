import Product from "./Product";

function ProductGrid({ products }: { products: Array<{ productName: string, productCode: number, productCustomerID: number, productExpiryDate: string, ProductImage: string}> }) {
    return (
    // <div className="flex flex-wrap justify-between p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
        {products.map((product) => (
          <Product
            key={product.productCode}
            productName={product.productName}
            productCode={product.productCode}
            productCustomerID={product.productCustomerID}
            productExpiryDate={product.productExpiryDate} 
            ProductImage={product.ProductImage}
          />
        ))}
      </div>
    );
  }

export default ProductGrid
  