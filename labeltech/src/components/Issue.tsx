import React from 'react'

const Issue = () => {
  return (
    <div className='p-5'>
        <h2 className='text-center font-bold'>Report an Issue</h2>
        <form className='mt-5 flex justify-around flex-wrap'>
            <label>
                <input className='border-solid border-black border-2 rounded-lg w-64 mt-1' type="text" name="issue" placeholder='describe your issue' />
            </label>
            <input className='greenbtn' type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Issue