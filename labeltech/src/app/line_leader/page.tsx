import React from 'react'

const page = () => {
  return (
    <div className='text-3xl'>
      <div className='flex justify-end w-full mt-10'>
        <p className='mr-5'>Today's date</p>
        <p className='greyinput mr-16'>29/11/2023</p>
      </div>
      <div className='flex justify-around py-5'>
        <div className='border-solid border-2 border-black rounded-lg w-5/12 py-5 px-3'>
          <div className='flex flex-raw py-5'>
            <p>Select product code</p>
            <p className='input ml-5'>532</p>
          </div>
          <div className='flex flex-raw py-5'>
            <p>Select depot date</p>
            <p className='input ml-5'>30/11/2023</p>
          </div>
          <div className='flex flex-raw py-5'>
            <p className='pt-2'>Confirm details before scanning</p>
            <button className='greenbtn'>Confirm</button>
          </div>
        </div>
        <div className='border-solid border-2 border-black rounded-lg w-5/12 py-5 px-3'>
          <p className='text-center mb-5'>Scanning in progress</p>
          <div className='flex flex-raw py-5'>
            <p>Packing error</p>
            <p className='input ml-5'>0</p>
          </div>
          <div className='flex flex-raw py-5'>
            <p>Packed without error</p>
            <p className='input ml-5'>0</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-16'>
        <p className='mr-10 pt-2'>Start scanning</p>
        <button className='greenbtn'>Start</button>
      </div>
    </div>
  )
}

export default page