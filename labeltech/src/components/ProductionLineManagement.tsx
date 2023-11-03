import React from 'react'

const ProductionLineManagement = () => {
  const lines = Array.from({length: 8}, (_, i) => i + 1);

  return (
    <div className='border-solid border-2 border-black rounded-lg'>
        <h1 className='text-center'>Production Line Management</h1>
        <div className='flex flex-wrap'>
            <div className='border-solid border-2 border-black rounded m-2'>
                <ul>
                    {lines.map((line) => (
                        <li key={line}>Line {line}</li>
                    ))}
                </ul>
            </div>
            <div className='border-solid border-2 border-black rounded m-2'>
                <h2>Edit production line</h2>
            </div>
            <div className='flex flex-col border-solid border-2 border-black rounded m-2'>
                <button>Stop</button>
                <button>Resume</button>
                <button>Edit production line</button>
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