import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-cream-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍰
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="warning" size="sm">
              Featured
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="success" size="sm">
              New
            </Badge>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="danger" size="sm">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
        >
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            disabled={product.stock === 0 || isInCart(product._id)}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          {product.category && (
            <span className="text-xs text-primary-600 font-medium uppercase tracking-wider">
              {product.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-display font-bold text-dark-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 font-body mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              GH₵ {product.price?.toFixed(2) || '0.00'}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                GH₵ {product.compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>

          {product.stock === 0 ? (
            <Badge variant="danger">Sold Out</Badge>
          ) : isInCart(product._id) ? (
            <Badge variant="success">In Cart</Badge>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;