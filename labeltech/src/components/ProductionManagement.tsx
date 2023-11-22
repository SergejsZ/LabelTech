import React, { useState } from 'react';

// Define types for product details
type ProductDetails = {
    code: number;
    name: string;
    description: string;
    weight: number;
};

const ProductionManagement = () => {
    const productCodes = Array.from({length: 8}, (_, i) => i + 1);

    // State for selected product details
    const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);

    // State for editing product details
    const [editDetails, setEditDetails] = useState<ProductDetails | null>(null);

    const [showOnlyProductList, setShowOnlyProductList] = useState(false);


    // Mock function to simulate fetching product details
    const fetchProductDetails = async (productCode: number): Promise<ProductDetails> => {
        return {
            code: productCode,
            name: `Product Name ${productCode}`,
            description: `Description for product ${productCode}`,
            weight: 100 + productCode // Just a mock value
        };
    };

     // Handle form submission
     const handleEditSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Updated Product Details:', editDetails);
        // send the updated data to the server
    };

    // Handle form field changes
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditDetails({
            ...editDetails,
            [event.target.name]: event.target.value
        } as ProductDetails);
    };

    // Handle product code click
    const handleProductClick = async (productCode: number) => {
        const details = await fetchProductDetails(productCode);
        setSelectedProduct(details);
    };


    if (showOnlyProductList) {
        return (
            <div>
                <h2 className='text-center font-bold'>Product Management</h2>
                <ul className='m-2 w-32'>
                    {productCodes.map((code) => (
                        <li key={code} className='border-solid border-black border rounded-lg text-center'>
                            {code}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowOnlyProductList(!showOnlyProductList)}>
                    {showOnlyProductList ? "Show Full View" : "Show Only Product List"}
                 </button>
            </div>
        );
    }

    return (
        <div>

            <h2 className='text-center font-bold'>Product Management</h2>
            <div className='flex flew-raw'>
                <ul className='m-2 w-32 border-solid border-2 border-black'>
                    {productCodes.map((code) => (
                        <li key={code} className='border-solid border-black border rounded-lg text-center' onClick={() => handleProductClick(code)}>
                            {code}
                        </li>
                    ))}
                </ul>

                {selectedProduct && (
                    <div className='product-details border-solid border-2 border-black'>
                        <div className='border-solid border-2 border-black'>
                            <p>Code: {selectedProduct.code}</p>
                            <p>Name: {selectedProduct.name}</p>
                            <p>Description: {selectedProduct.description}</p>
                            <p>Weight: {selectedProduct.weight}g</p>
                            <h3>Edit Product Details</h3>
                        </div>
                        <div className='border-solid border-2 border-black'> 
                            <form onSubmit={handleEditSubmit}>
                                <input type="text" name="name" value={editDetails?.name || ''} onChange={handleEditChange} placeholder="Product Name" />
                                <input type="text" name="description" value={editDetails?.description || ''} onChange={handleEditChange} placeholder="Product Description" />
                                <input type="number" name="weight" value={editDetails?.weight || 0} onChange={handleEditChange} placeholder="Product Weight" />
                                <button className='greenbtn m-1' type="submit">Save Changes</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <button onClick={() => setShowOnlyProductList(!showOnlyProductList)}>
                {showOnlyProductList ? "Show Full View" : "Show Only Product List"}
            </button>
        </div>
    );
};

export default ProductionManagement;
