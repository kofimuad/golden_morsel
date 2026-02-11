import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Star, Heart, Share2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import productService from '../services/productService';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import Badge from '../components/common/Badge';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      setProduct(response.data);
      if (response.data.variants && response.data.variants.length > 0) {
        setSelectedVariant(response.data.variants[0]);
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl font-display font-bold text-dark-900 mb-4">
          {error || 'Product not found'}
        </p>
        <Button onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </div>
    );
  }

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-cream-100 flex items-center justify-center shadow-lg">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-9xl">{product.category === 'treaties' ? '🍰' : '🍪'}</span>
              )}

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  -{discountPercentage}%
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Category and Title */}
            <div className="mb-6">
              {product.category && (
                <span className="inline-block text-xs text-primary-600 font-bold uppercase tracking-wider mb-2">
                  {product.category}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-dark-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating || 0} stars (based on reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-700 font-body text-lg mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-primary-600">
                  GH₵ {product.price?.toFixed(2) || '0.00'}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    GH₵ {product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-dark-900 mb-3">
                  Variants
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-dark-900">{variant.name}</p>
                      <p className="text-sm text-gray-600">
                        +GH₵ {variant.price && variant.price > 0 ? variant.price.toFixed(2) : '0.00'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dark-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  max={product.stock || 100}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-center"
                />
                <span className="text-gray-600 font-body">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                fullWidth
                size="lg"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                icon={<ShoppingBag className="w-5 h-5" />}
              >
                Add to Cart
              </Button>
              <Button
                fullWidth
                variant="outline"
                size="lg"
                icon={<Share2 className="w-5 h-5" />}
              >
                Share Product
              </Button>
            </div>

            {/* Additional Info */}
            <div className="bg-cream-100 rounded-lg p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Delivery</span>
                <span className="text-gray-900 font-semibold">Free Delivery</span>
              </div>
              <div className="flex justify-between border-t border-cream-200 pt-3">
                <span className="text-gray-700 font-medium">Preparation</span>
                <span className="text-gray-900 font-semibold">2-3 Days</span>
              </div>
              <div className="flex justify-between border-t border-cream-200 pt-3">
                <span className="text-gray-700 font-medium">Guarantee</span>
                <span className="text-gray-900 font-semibold">Quality Assured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;