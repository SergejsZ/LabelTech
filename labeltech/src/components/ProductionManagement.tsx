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

    const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
    const [selectedCode, setSelectedCode] = useState<number | null>(null);
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
        setSelectedCode(productCode);
    };


    if (showOnlyProductList) {
        return (
            <div>
                <h2 className='text-center font-bold'>Product Management</h2>
                <ul className='m-2 w-32'>
                    {productCodes.map((code) => (
                        <li key={code} className={`border-solid border-black border rounded-lg text-center`}>
                            {code}
                        </li>
                    ))}
                </ul>
                {/* <button onClick={() => setShowOnlyProductList(!showOnlyProductList)}>
                    {showOnlyProductList ? "Show Full View" : "Show Only Product List"}
                 </button> */}
            </div>
        );
    }

    return (
        <div className='h-full'>
            <h2 className='text-center font-bold'>Product Management</h2>
            <div className='h-full pt-16'>
                <div className='flex'>
                    <ul className='m-2 w-1/4'>
                        {productCodes.map((code) => (
                            <li key={code} className={`border-solid border-black border rounded-lg text-center ${code === selectedCode ? 'bg-green-400' : ''}`} onClick={() => handleProductClick(code)}>
                                {code}
                            </li>
                        ))}
                    </ul>

                    {selectedProduct && (
                        <div className='product-details border-solid border-2 rounded-lg border-black flex justify-around w-2/3 ml-16'>
                            <div>
                                <p className='p-3'>Code: {selectedProduct.code}</p>
                                <p className='p-3'>Name: {selectedProduct.name}</p>
                                <p className='p-3'>Description: {selectedProduct.description}</p>
                                <p className='p-3'>Weight: {selectedProduct.weight}g</p>
                            </div>
                            <div> 
                                <h2 className='font-bold text-center'>Edit product detail</h2>
                                <form onSubmit={handleEditSubmit} className='flex flex-col'>
                                    <input type="text" name="name" className='p-3' value={editDetails?.name || ''} onChange={handleEditChange} placeholder="Product Name" />
                                    <input type="text" name="description" className='p-3' value={editDetails?.description || ''} onChange={handleEditChange} placeholder="Product Description" />
                                    <input type="number" name="weight" className='p-3' value={editDetails?.weight || 0} onChange={handleEditChange} placeholder="Product Weight" />
                                    <button className='greenbtn m-1' type="submit">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* <button onClick={() => setShowOnlyProductList(!showOnlyProductList)}>
                    {showOnlyProductList ? "Show Full View" : "Show Only Product List"}
                </button> */}
            </div>
        </div>
    );
};

export default ProductionManagement;
