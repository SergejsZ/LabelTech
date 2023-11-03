import React from 'react'

const page = () => {
  return (
    <div className="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
      <div className="relative hidden xl:block xl:w-1/2 h-full">
        <img
          className="absolute h-auto w-full object-cover"
          src="../../utils/images/Logo_lablelTech.png"
          alt="logo labeltech"/>
      </div>
      <div className="w-full xl:w-1/2 p-8">
        <form method="post" action="#">
          <h1 className=" text-2xl font-bold">Log in</h1>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2">
              ID
            </label>
            <input
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="id"
              type="text"
              placeholder="Your ID"/>
          </div>
          <div className="mb-6 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"/>
          </div>
          <div className="flex w-full mt-8">
            <button
              className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              type="button">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page