import React from 'react'

const Issue = () => {
  return (
    <div>
        <h1>Report an Issue</h1>
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