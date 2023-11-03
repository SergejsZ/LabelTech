import React from 'react'

const ActivationPorductionLine = () => {
  const lines = Array.from({length: 8}, (_, i) => i + 1);
  return (
    <div className='border-solid border-2 border-black rounded-lg'>
      <p>ACTIVE/INACTIVE PRODUCTION LINES</p>
      <div className='flex flex-raw'>
        <div className='border-solid border-2 border-black rounded m-2'>
            <ul>
                {lines.map((line) => (
                    <li key={line}>Line {line}</li>
                ))}
            </ul>
        </div>
        <div>
            <button>Activate</button>
            <button>Inactive</button>
        </div>
      </div>  
    </div>
  )
}

export default ActivationPorductionLine