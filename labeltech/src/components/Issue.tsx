import React from 'react'

const Issue = () => {
  return (
    <div className='border-solid border-2 border-black rounded-lg'>
        <h1 className='text-center'>Report an Issue</h1>
        <form>
            <label>
                <input type="text" name="issue" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Issue