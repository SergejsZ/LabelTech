import React from 'react'

const ProductionManagement = () => {
    const productCode = Array.from({length: 8}, (_, i) => i + 1);
    return (
        <div>
            <h2 className='text-center font-bold'>Product Management</h2>
            <div className='flex flex-wrap mt-5'>
                <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                    <h2 className='text-center'>Edit product details</h2>
                    <div className='pl-2 flex flex-raw mx-5'>
                        <div className='flex flex-col'>
                            <p className='mr-2 py-2'>Product code</p>
                            <p className='mr-2 py-2'>Product name</p>
                            <p className='mr-2 py-3'>Product description</p>
                            <p className='mr-2 py-3'>Product Weight in Grams</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='basicinput'>986</p>
                            <p className='basicinput'>white mushrooms</p>
                            <p className='basicinput'>pack of 6 big white mushrooms</p>                            
                            <p className='basicinput'>250</p>
                        </div>
                            
                    </div>
                    <button className='greenbtn mx-30pc my-5'>Save and change</button>
                </div>
                <div className='ml-2'>
                    <h2 className='text-center'>Product Code</h2>
                    <ul className='border-solid border-2 border-black rounded m-2 w-32'>
                        {productCode.map((productCode) => (
                            <li key={productCode} className='border-solid border-black border-y'> {productCode}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col m-2'>
                    <button className='yellowbtn m-1'>Edit product details</button>
                    <button className='yellowbtn m-1'>Add product</button>
                    <button className='yellowbtn m-1'>Delete product</button>
                    <button className='greenbtn m-1'>Save and Exit</button>
                    <button className='greenbtn m-1'>Exit without saving</button>
                </div>
            </div>
        </div>
    )
}

export default ProductionManagement