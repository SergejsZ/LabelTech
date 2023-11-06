import React from 'react'

const ActivationProductionLine = () => {
  const lines = Array.from({length: 8}, (_, i) => i + 1);
  return (
    <div>
      <h2 className='text-center font-bold'>Active/inactive production lines</h2>
      <div className='flex flex-raw'>
        <div className='m-2'>
            <ul className='w-32'>
                {lines.map((line) => (
                  <>
                    {line % 2 === 0 ? (
                      <li key={line} className='border-solid border-black border-y active'>Line {line}</li>
                    ) : (
                      <li key={line} className='border-solid border-black border-y inactive'>Line {line}</li>
                    )}

                  </>
                ))}
            </ul>
        </div>
        <div className='flex flex-col mt-5'>
            <p className='active'>Activate</p>
            <p className='inactive'>Inactive</p>
        </div>
      </div>  
    </div>
  )
}

export default ActivationProductionLine