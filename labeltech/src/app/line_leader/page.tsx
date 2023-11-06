import React from 'react'

const page = () => {

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const currentDate = `${day}/${month}/${year}`;

  return (
    <div className='text-3xl'>
      <div className='flex justify-end w-full mt-10'>
        <p className='mr-5'>Today's date</p>
        <p className='greyinput mr-16'>{currentDate}</p>
      </div>
      <div className='flex justify-around py-5'>
      <form className='border-solid border-2 border-black rounded-lg w-5/12 py-5 px-3'>
        <div className='flex flex-row py-5 items-center'>
          <label htmlFor="productCode" className='mr-2'>Select product code:</label>
          <input 
            type="text"
            id="productCode"
            name="productCode"
            className='basicinput w-1/2'
            placeholder='Enter product code'
            //TODO: add the regex pattern for the product code
          />
        </div>
        <div className='flex flex-row py-5 items-center'>
          <label htmlFor="depotDate" className='mr-2'>Select depot date:</label>
          <input 
            type="text"
            id="depotDate"
            name="depotDate"
            className='basicinput w-1/2'
            placeholder='DD/MM/YYYY'
            pattern="\d{2}/\d{2}/\d{4}"
            title="Date should be in the format DD/MM/YYYY."
          />
        </div>
        <div className='flex flex-row py-5 items-center'>
          <span className='pt-2 mr-4'>Confirm details before scanning:</span>
          <button type="submit" className='greenbtn'>Confirm</button>
        </div>
      </form>
      <div className='border-solid border-2 border-black rounded-lg w-5/12 py-5 px-3'>
        <p className='text-center mb-5'>Scanning in progress</p>
        <div className='flex flex-raw py-5'>
          <p>Packing error</p>
          <p className='basicinput ml-5'>0</p>
        </div>
        <div className='flex flex-raw py-5'>
          <p>Packed without error</p>
          <p className='basicinput ml-5'>0</p>
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