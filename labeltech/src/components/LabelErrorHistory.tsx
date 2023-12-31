import React from 'react'

const LabelErrorHistory = () => {
  return (
    <div>
      <h2 className='text-center font-bold'>Label Error History</h2>
      <div className='flex justify-around'>
        <div className='flex flex-col'>
          <button className='greyinput my-2'>Select date from</button>
          <button className='greyinput my-2'>Select date until</button>
          <button className='greyinput my-2'>select line</button>
        </div>
        <div className='flex flex-col justify-around border-solid border-2 border-black rounded-lg my-3 px-3'>
          <p>label error</p>
          <p>date and time</p>
          <p>product code</p>
        </div>
      </div>
    </div>
  )
}

export default LabelErrorHistory