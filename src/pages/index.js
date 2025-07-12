import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shirt, Recycle, Users, Heart, Star, ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
const ReWearLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Jackets",
      points: 150,
      condition: "Excellent",
      emoji: "🧥",
      owner: "Sarah M."
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      category: "Dresses",
      points: 120,
      condition: "Like New",
      emoji: "👗",
      owner: "Emma K."
    },
    {
      id: 3,
      title: "Designer Sneakers",
      category: "Shoes",
      points: 200,
      condition: "Good",
      emoji: "👟",
      owner: "Alex R."
    },
    {
      id: 4,
      title: "Cozy Knit Sweater",
      category: "Sweaters",
      points: 100,
      condition: "Excellent",
      emoji: "🧶",
      owner: "Maya L."
    },
    {
      id: 5,
      title: "Leather Handbag",
      category: "Accessories",
      points: 180,
      condition: "Very Good",
      emoji: "👜",
      owner: "Zoe T."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(featuredItems[(currentSlide + i) % featuredItems.length]);
    }
    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Browse Items</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              <div className="flex items-center space-x-4">
                <Link href="/login">
                <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  Sign In
                </button></Link>
                <Link href="/register">
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105">
                  Register
                </button></Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600">How It Works</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600">Browse Items</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-600">About</a>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <button className="text-green-600 hover:text-green-700 font-medium text-left">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-blue-600 transition-all">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full text-green-800 text-sm font-medium mb-8">
            <Recycle className="w-4 h-4" />
            <span>Sustainable Fashion Revolution</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Give Your Clothes a
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Second Life
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join ReWear&apos;s community of fashion-forward individuals who swap, share, and sustain. 
            Transform your wardrobe while reducing textile waste through our innovative point-based exchange system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
              Start Swapping 🔄
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-green-300">
              Browse Items 👕
            </button>
            <button className="bg-purple-100 text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-200 transition-all">
              List an Item ➕
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">2.5K+</div>
              <div className="text-gray-600">Items Swapped</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">1.2K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">850kg</div>
              <div className="text-gray-600">Waste Reduced</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Items Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Featured Items</h2>
          <p className="text-gray-600">Discover amazing pieces from our community</p>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-4xl">
              {getVisibleItems().map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden">
                  <div className="p-6">
                    <div className="text-6xl mb-4 text-center">{item.emoji}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.category}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.points} points
                      </span>
                      <span className="text-sm text-gray-500">{item.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">by {item.owner}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white/30 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-gray-600">Simple steps to start your sustainable fashion journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">List Your Items</h3>
              <p className="text-gray-600">Upload photos and details of clothes you no longer wear</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔄
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Swap or Earn Points</h3>
              <p className="text-gray-600">Exchange directly with others or earn points for future swaps</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🌱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Make an Impact</h3>
              <p className="text-gray-600">Reduce waste and refresh your wardrobe sustainably</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl text-green-100 mb-8">Join thousands of fashion lovers making a difference</p>
          <Link href="/register"><button className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Get Started Today <ArrowRight className="w-5 h-5 inline ml-2" />
          </button></Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">Sustainable fashion for a better tomorrow</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">How It Works</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Browse Items</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">List an Item</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Blog</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Success Stories</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Sustainability Tips</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ReWear. All rights reserved. 🌍 Made with love for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReWearLanding;