// components/CategoryFilter.js
import React from 'react';

export default function CategoryFilter({ categories = [], selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-6 px-4 sm:px-6 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      {Array.isArray(categories) && categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            px-5 py-2 text-base font-medium rounded-full transition-all duration-300 ease-in-out
            ${
              selected === cat
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-blue-300'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
            min-w-[100px] text-center
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
