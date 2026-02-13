import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X, Heart } from 'lucide-react';
import ProductCard from "../components/navigation/ProductCard";
import Button from '../components/common/Button';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products] = useState([
    { id: 1, name: 'Golden Treat Box', price: 125.00, category: 'treaties', image: 'https://via.placeholder.com/250', rating: 4.8, reviews: 25 },
    { id: 2, name: 'Deluxe Memoria', price: 89.50, category: 'memoria', image: 'https://via.placeholder.com/250', rating: 4.6, reviews: 18 },
    { id: 3, name: 'Premium Collection', price: 250.00, category: 'pop-ups', image: 'https://via.placeholder.com/250', rating: 4.9, reviews: 42 },
    { id: 4, name: 'Golden Treat Deluxe', price: 175.00, category: 'treaties', image: 'https://via.placeholder.com/250', rating: 4.7, reviews: 31 },
  ]);

  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 500],
    rating: 0,
  });

  const filteredAndSortedProducts = products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
    const matchesRating = product.rating >= filters.rating;

    return matchesQuery && matchesPrice && matchesCategory && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category],
    }));
  };

  const handleClearFilters = () => {
    setFilters({ category: [], priceRange: [0, 500], rating: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            Found {filteredAndSortedProducts.length} products matching your search
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-4 mb-8 flex items-center justify-between gap-4 flex-wrap"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-dark-900">Filters</h2>
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-primary-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-dark-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    {['treaties', 'memoria', 'pop-ups'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-gray-700 capitalize">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-dark-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                        }))
                      }
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                      GH₵ 0 - GH₵ {filters.priceRange[1]}
                    </p>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold text-dark-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters(prev => ({ ...prev, rating }))}
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-gray-700">{rating}+ Stars</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === 0}
                        onChange={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-gray-700">All</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-600" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-dark-900">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2 mb-4">
                        <p className="text-primary-600 font-bold">GH₵ {product.price.toFixed(2)}</p>
                        <span className="text-xs text-gray-600">
                          ⭐ {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <Button variant="primary" size="sm" className="w-full">
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No products found for "{query}"</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
