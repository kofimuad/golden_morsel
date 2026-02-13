import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Golden Treat Box', price: 125.00, image: 'https://via.placeholder.com/200', inStock: true },
    { id: 2, name: 'Deluxe Memoria', price: 89.50, image: 'https://via.placeholder.com/200', inStock: true },
    { id: 3, name: 'Premium Collection', price: 250.00, image: 'https://via.placeholder.com/200', inStock: false },
    { id: 4, name: 'Limited Edition Box', price: 450.00, image: 'https://via.placeholder.com/200', inStock: true },
  ]);

  const handleAddToCart = (item) => {
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from wishlist');
  };

  const handleShare = (item) => {
    const text = `Check out this product: ${item.name} - GH₵${item.price.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlistItems.length} items in your wishlist</p>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white font-semibold">Out of Stock</p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-900 text-sm mb-2">{item.name}</h3>
                    <p className="text-primary-600 font-bold text-lg mb-4">GH₵ {item.price.toFixed(2)}</p>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        variant={item.inStock ? 'primary' : 'secondary'}
                        size="sm"
                        className="w-full"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(item)}
                          className="flex-1 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition text-sm flex items-center justify-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="flex-1 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition text-sm flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total items in wishlist</p>
                  <p className="text-3xl font-bold text-dark-900 mt-2">{wishlistItems.length}</p>
                </div>
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start adding items to your wishlist!</p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
