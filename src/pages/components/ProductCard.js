// components/ProductCard.js
import React from 'react';
import Link from 'next/link'; // Assuming you might link to a detail page

export default function ProductCard({ item }) {
  // Destructure item properties for easier use
  const { id, imageUrl, title, category, size, condition, description } = item;

  return (
    <div className="
      bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
      transform hover:scale-105 transition-all duration-300 ease-in-out
      flex flex-col
    ">
      {/* Product Image with aspect ratio */}
      <div className="relative w-full pb-[75%] md:pb-[66.66%] overflow-hidden"> {/* Aspect ratio 4:3 on mobile, 3:2 on desktop */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-medium capitalize">{category}</span> • <span className="uppercase">{size}</span>
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <span className="mr-1 text-yellow-500">
            {/* You can use an icon here for condition, e.g., a star or checkmark */}
            {/* For now, just a dot for visual separation */}•
          </span>
          <span className="capitalize">{condition}</span>
        </p>
        
        {/* Short description/excerpt - optional, based on item data */}
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
            {description}
          </p>
        )}

        {/* View Details Button */}
        <Link href={`/item/${id}`} className="block mt-auto"> {/* Use Link for navigation */}
          <button className="
            w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white
            px-6 py-2 rounded-lg font-semibold text-base
            hover:from-blue-600 hover:to-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            transition duration-300 ease-in-out transform hover:-translate-y-0.5
          ">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}