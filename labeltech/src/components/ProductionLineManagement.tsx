import React from 'react'

const ProductionLineManagement = () => {
  const lines = Array.from({length: 8}, (_, i) => i + 1);

  return (
    <div>
        <h2 className='text-center font-bold'>Production Line Management</h2>
        <div className='flex flex-wrap mt-5'>
            <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                    <h2 className='text-center'>Edit production line</h2>
                    <div className='pl-2 flex flex-raw mx-5'>
                        <div className='flex flex-col'>
                            <p className='mr-2 py-2'>Line</p>
                            <p className='mr-2 py-2'>Username</p>
                            <p className='mr-2 py-3'>Password</p>

                        </div>
                        <div className='flex flex-col'>
                            <p className='basicinput'>2</p>
                            <p className='basicinput'>9018</p>
                            <p className='basicinput'>....</p>                            
                        </div>
                            
                    </div>
                    <button className='greenbtn mx-30pc my-5'>Save</button>
            </div>
            <div className='m-2 w-32'>
                <ul>
                    {lines.map((line) => (
                        <li key={line} className='border-solid border-black border rounded-lg text-center'>Line {line}</li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col justify-around m-2'>
                <button className='greyinput'>Stop</button>
                <button className='greyinput'>Resume</button>
                <button className='greyinput'>Edit line</button>
                <button className='greenbtn mb-1'>Save and Exit</button>
                <button className='greenbtn mt-1'>Exit without saving</button>
            </div>
        </div>
    </div>
  )
}

export default ProductionLineManagement