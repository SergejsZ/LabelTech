import React from 'react'

const Home = () => {
//Adding missing files from previous push
  const connected = false;

  return (
    // if !connected
    // else the user is redirect to the dashboard page corresponding to his role (admin or line leader)    
    <div className='mt-32'>
      <div className="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-slate-100 rounded-lg shadow overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src="../utils/images/Logo_lablelTech.png"
            alt="logo labeltech" />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form method="post" action="#">
            <h1 className=" text-2xl font-bold">Log in</h1>
            <div className="mb-4 mt-6">
              <label
                className="loginlabel">
                ID
              </label>
              <input
                className="logininput"
                id="id"
                type="text"
                placeholder="Your ID"/>
            </div>
            <div className="mb-6 mt-6">
              <label
                className="loginlabel"
                htmlFor="password">
                Password
              </label>
              <input
                className="logininput"
                id="password"
                type="password"
                placeholder="Your password"/>
            </div>
            <div className="flex w-full mt-8">
              {/* <button
                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="button">
                Log in
              </button> */}
              <a className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 text-center"
                href="/line_leader">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home


