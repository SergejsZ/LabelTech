import React from 'react'

const Issue = () => {
  return (
    <div className='border-solid border-2 border-black rounded-lg p-5'>
        <h2 className='text-center'>Report an Issue</h2>
        <form className='mt-5 flex justify-around'>
            <label>
                <input className='border-solid border-black border-2 rounded-lg' type="text" name="issue" placeholder='describe your issue' />
            </label>
            <input className='greenbtn' type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Issue