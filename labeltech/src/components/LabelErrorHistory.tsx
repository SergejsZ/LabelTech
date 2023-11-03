import React from 'react'

const LabelErrorHistory = () => {
  return (
    <div className='border-solid border-2 border-black rounded-lg'>
      <h1 className='text-center'>Label Error History</h1>
      <div>
        <button>Select date from</button>
        <button>Select date until</button>
        <button>select line</button>
      </div>
      <div>
        <p>label error</p>
        <p>date and time</p>
        <p>product code</p>
      </div>
    </div>
  )
}

export default LabelErrorHistory