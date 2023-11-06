import React from 'react'

const Issue = () => {
  return (
    <div className='p-5'>
        <h2 className='text-center font-bold'>Report an Issue</h2>

        {/*TODO: insert form in the database */}
        <form className='mt-5 flex flex-col items-center'>
          <textarea
            id="issue"
            name="issue"
            className='border-solid border-black border-2 rounded-lg w-full mt-1 p-2'
            placeholder='Please provide a detailed description of your issue.'
          />
          <input className='greenbtn mt-3' type="submit" value="Submit" />
        </form>

    </div>
  )
}

export default Issue