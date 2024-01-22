import React from 'react'

const Product = ({ name, code, retailer, expiryDate, imageUrl }: { name: string, code: string, retailer: string, expiryDate: string, imageUrl: string }) => {
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img src={imageUrl} alt={name} className="w-64 h-64" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            Product code: {code}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{retailer}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Expiry: {expiryDate}</span>
        </div>
      </div>
  )
}

export default Product