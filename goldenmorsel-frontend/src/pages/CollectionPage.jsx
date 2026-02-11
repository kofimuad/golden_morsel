import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '../components/navigation/ProductCard';
import Spinner from '../components/common/Spinner';
import productService from '../services/productService';

const CollectionPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionInfo = {
    sweet: {
      title: 'Sweet Delights',
      description: 'Our signature collection of decadent sweet treats',
      emoji: '🧁',
      color: 'from-pink-500 to-rose-500',
    },
    savory: {
      title: 'Savory Bites',
      description: 'Crispy and delicious savory creations',
      emoji: '🥜',
      color: 'from-orange-500 to-amber-500',
    },
    memoria: {
      title: 'Memoria Boxes',
      description: 'Nostalgic curated collections of childhood favorites',
      emoji: '📦',
      color: 'from-purple-500 to-indigo-500',
    },
    default: {
      title: 'Our Collections',
      description: 'Explore our curated selection of treats',
      emoji: '🍰',
      color: 'from-primary-500 to-primary-600',
    },
  };

  const currentCollection = collectionInfo[category] || collectionInfo.default;

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      if (category) {
        const response = await productService.getProductsByCategory(category);
        setProducts(response.data || []);
      } else {
        const response = await productService.getAllProducts();
        setProducts(response.data || []);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${currentCollection.color} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-4">
              <span className="text-6xl">{currentCollection.emoji}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              {currentCollection.title}
            </h1>
            <p className="text-lg text-white/90 font-body max-w-2xl mx-auto">
              {currentCollection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-96">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg font-body mb-6">
                  No products found in this collection
                </p>
                <button
                  onClick={() => navigate('/shop')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Browse All Products →
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-gray-600 font-body">
                    Showing <span className="font-semibold">{products.length}</span> product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      {!loading && products.length > 0 && (
        <section className="bg-dark-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Can't decide?
            </h2>
            <p className="text-cream-200 font-body mb-8">
              Chat with our concierge for personalized recommendations
            </p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CollectionPage;