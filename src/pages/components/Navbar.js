// components/Navbar.js
import Link from "next/link";
import { useState } from "react"; // Import useState for managing mobile menu state

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg dark:from-gray-800 dark:to-gray-900 px-4 sm:px-6 py-4 flex justify-between items-center relative z-10">
      {/* Logo/Brand */}
      <h1 className="text-3xl font-extrabold text-white tracking-wide">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-4xl">👕</span>
          <span>ReWear</span>
        </Link>
      </h1>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-white font-semibold text-lg">
        <li><Link href="/dashboard" className="hover:text-blue-200 transition duration-300">Home</Link></li>
        <li><Link href="/additem" className="hover:text-blue-200 transition duration-300">Add Item</Link></li>
        <li><Link href="/my-swaps" className="hover:text-blue-200 transition duration-300">My Swaps</Link></li>
        <li><Link href="/profile" className="hover:text-blue-200 transition duration-300">Profile</Link></li>
      </ul>

      {/* Mobile Menu Toggle Button (Hamburger) */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-blue-600 dark:bg-gray-800 shadow-lg py-4 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col items-center space-y-4 text-white text-lg font-medium">
            <li><Link href="/dashboard" className="block w-full text-center py-2 px-4 hover:bg-blue-700 dark:hover:bg-gray-700 rounded transition duration-300" onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link href="/add-item" className="block w-full text-center py-2 px-4 hover:bg-blue-700 dark:hover:bg-gray-700 rounded transition duration-300" onClick={toggleMobileMenu}>Add Item</Link></li>
            <li><Link href="/my-swaps" className="block w-full text-center py-2 px-4 hover:bg-blue-700 dark:hover:bg-gray-700 rounded transition duration-300" onClick={toggleMobileMenu}>My Swaps</Link></li>
            <li><Link href="/profile" className="block w-full text-center py-2 px-4 hover:bg-blue-700 dark:hover:bg-gray-700 rounded transition duration-300" onClick={toggleMobileMenu}>Profile</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}