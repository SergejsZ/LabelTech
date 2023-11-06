import React from 'react'

const ProductionLineManagement = () => {
  const lines = Array.from({length: 8}, (_, i) => i + 1);

  return (
    <div>
        <h2 className='text-center font-bold'>Production Line Management</h2>
        <div className='flex flex-wrap'>
            <div className='m-2 w-32'>
                <ul>
                    {lines.map((line) => (
                        <li key={line} className='border-solid border-black border rounded-lg'>Line {line}</li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                    <h2 className='text-center'>Edit production line</h2>
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
            <div className='flex flex-col justify-around m-2'>
                <button className='greyinput'>Stop</button>
                <button className='greyinput'>Resume</button>
                <button className='greyinput'>Edit line</button>
            </div>
            <div className='flex flex-col m-2 p-5'>
                <button className='greenbtn mb-1'>Save and Exit</button>
                <button className='greenbtn mt-1'>Exit without saving</button>
            </div>
        </div>
    </div>
  )
}

export default ProductionLineManagement