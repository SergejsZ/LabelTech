import React from 'react'

const ProductionManagement = () => {
    const productCode = Array.from({length: 8}, (_, i) => i + 1);
    return (
        <div className='border-solid border-2 border-black rounded-lg'>
            <h1 className='text-center'>Production Management</h1>
            <div className='flex flex-wrap'>
                <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                    <h2 className='text-center'>Edit product details</h2>
                    <div className='pl-2'>
                        <div className='flex flex-row'>
                            <p className='mr-2'>Product code</p>
                            <p>986</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className='mr-2'>Product name</p>
                            <p>white mushrooms</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className='mr-2'>Product description</p>
                            <p>pack of 6 big white mushrooms</p>
                        </div>
                        <div className='flex flex-row'>
                            <p className='mr-2'>Product Weight in Grams</p>
                            <p>250</p>
                        </div>
                    </div>
                    <button>Save and change</button>
                </div>
                <div className='border-solid border-2 border-black rounded m-2'>
                    <h2>Product Code</h2>
                    <ul>
                        {productCode.map((productCode) => (
                            <li key={productCode}> {productCode}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                    <button>Edit product details</button>
                    <button>Add product</button>
                    <button>Delete product</button>
                    <button>Save and Exit</button>
                    <button>Exit without saving</button>
                </div>
            </div>
        </div>
    )
}

export default ProductionManagement