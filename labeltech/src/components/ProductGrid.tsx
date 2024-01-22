import Product from "./Product";

function ProductGrid({ products }: { products: Array<{ name: string, code: string, retailer: string, expiryDate: string, imageUrl: string }> }) {
    return (
    // <div className="flex flex-wrap justify-between p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
        {products.map((product) => (
          <Product
            key={product.code}
            name={product.name}
            code={product.code}
            retailer={product.retailer}
            expiryDate={product.expiryDate}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    );
  }

export default ProductGrid
  