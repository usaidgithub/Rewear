import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';

const categories = ["All", "Outerwear", "Dresses", "Tops", "Footwear", "Bottoms"];

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchItems = async () => {
      try {
        const authRes = await fetch("/api/check-auth");
        if (!authRes.ok) {
          router.push("/login");
          return;
        }

        const { user } = await authRes.json();
        setUserId(user._id);

        const itemRes = await fetch(`/api/others?userId=${user._id}`);
        const { items } = await itemRes.json();
        setItems(items);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-8 w-full max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for items, categories, brands, or sizes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-60 transition-all duration-200 ease-in-out text-lg font-light"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">Loading items...</p>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => <ProductCard key={item._id} item={item} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
