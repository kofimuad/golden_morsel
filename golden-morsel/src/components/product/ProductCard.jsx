import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { showToast } from '../ui/Toast'
import { formatPrice } from '../../utils/formatters'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault() // prevent Link navigation
    e.stopPropagation()
    addItem(product)
    showToast.success(`${product.title} added to cart`)
  }

  const isOutOfStock = product.stock === 0
  const isLowStock   = product.stock > 0 && product.stock <= product.lowStockThreshold

  return (
    <Link
      to={`/products/${product._id}`}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* ── Image ───────────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 dark:bg-surface-dark-3 mb-3">
        <img
          src={product.image}
          alt={product.title}
          className={[
            'w-full h-full object-cover transition-transform duration-700',
            'group-hover:scale-105',
            isOutOfStock ? 'opacity-50 grayscale' : '',
          ].join(' ')}
          loading="lazy"
        />

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-white text-xs uppercase tracking-widest font-sans font-medium px-3 py-1.5 border border-white/30 rounded-sm backdrop-blur-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Low stock badge */}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 left-2">
            <Badge status="low" />
          </div>
        )}

        {/* Category badge */}
        {product.category === 'memoria' && (
          <div className="absolute top-2 right-2">
            <Badge variant="gold" label="Memoria" dot={false} />
          </div>
        )}

        {/* Add to cart — appears on hover */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            className={[
              'absolute bottom-0 left-0 right-0 py-3',
              'bg-primary text-black text-[10px] font-sans font-medium uppercase tracking-widest',
              'translate-y-full group-hover:translate-y-0 transition-transform duration-300',
              'flex items-center justify-center gap-2',
            ].join(' ')}
          >
            <span className="material-icons-outlined text-base">add_shopping_cart</span>
            Add to Cart
          </button>
        )}
      </div>

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 px-0.5">
        {/* Category label */}
        <p className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-sans">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="font-serif text-base text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <StarRating value={product.rating} size="sm" showValue />
        )}

        {/* Price */}
        <p className="text-sm font-medium text-primary mt-0.5">
          {formatPrice(product.price)}
        </p>

        {/* Variants hint */}
        {product.variants?.length > 0 && (
          <p className="text-[10px] text-gray-400 font-sans">
            {product.variants.length} option{product.variants.length > 1 ? 's' : ''} available
          </p>
        )}
      </div>
    </Link>
  )
}