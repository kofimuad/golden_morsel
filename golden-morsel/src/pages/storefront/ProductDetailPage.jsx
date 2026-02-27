import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, getProducts } from '../../services/productService'
import { useCart } from '../../hooks/useCart'
import { showToast } from '../../components/ui/Toast'
import { formatPrice } from '../../utils/formatters'
import ProductImageGallery from '../../components/product/ProductImageGallery'
import VariantSelector from '../../components/product/VariantSelector'
import ProductGrid from '../../components/product/ProductGrid'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import StarRating from '../../components/ui/StarRating'
import { Skeleton } from '../../components/ui/Skeleton'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product,  setProduct]  = useState(null)
  const [related,  setRelated]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [variant,  setVariant]  = useState(null)
  const [qty,      setQty]      = useState(1)
  const [adding,   setAdding]   = useState(false)

  // ── Fetch product ────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      setVariant(null)
      setQty(1)
      try {
        const res = await getProductById(id)
        const data = res.data.data
        setProduct(data)

        // Auto-select first variant if exists
        if (data.variants?.length) {
          setVariant(data.variants[0].name)
        }

        // Fetch related products from same category
        const relatedRes = await getProducts({ category: data.category, limit: 4 })
        setRelated(relatedRes.data.data.filter(p => p._id !== id))
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  // ── Compute active price ─────────────────────────────────────
  const activePrice = variant
    ? (product?.variants?.find(v => v.name === variant)?.price ?? product?.price)
    : product?.price

  // ── Add to cart ──────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (product?.variants?.length && !variant) {
      showToast.error('Please select an option first')
      return
    }
    setAdding(true)
    await new Promise(r => setTimeout(r, 300)) // small UX delay
    addItem(product, variant, qty)
    showToast.success(`${product.title} added to cart`)
    setAdding(false)
  }

  // ── Loading skeleton ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Skeleton variant="image" className="aspect-square rounded-sm" />
          <div className="space-y-4">
            <Skeleton variant="text" lines={1} className="w-1/3" />
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" lines={1} className="w-1/4" />
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </div>
    )
  }

  // ── Error state ──────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="material-icons-outlined text-5xl text-gray-300 dark:text-gray-700 mb-4 block">
          search_off
        </span>
        <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-400 font-sans text-sm mb-8">{error}</p>
        <Button onClick={() => navigate('/products')} leftIcon="arrow_back">
          Back to Products
        </Button>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0
  const isLowStock   = product.stock > 0 && product.stock <= product.lowStockThreshold

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-sans text-gray-400 mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-icons-outlined text-sm">chevron_right</span>
        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
        <span className="material-icons-outlined text-sm">chevron_right</span>
        <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Left — Image gallery */}
        <ProductImageGallery image={product.image} title={product.title} />

        {/* Right — Product info */}
        <div className="flex flex-col gap-6">

          {/* Category + badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
              {product.category}
            </p>
            {isOutOfStock && <Badge status="out" />}
            {isLowStock   && <Badge status="low" />}
            {product.category === 'memoria' && (
              <Badge variant="gold" label="Memoria" dot={false} />
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          {product.rating > 0 && (
            <StarRating value={product.rating} size="md" showValue />
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary font-semibold">
              {formatPrice(activePrice)}
            </span>
            {variant && activePrice !== product.price && (
              <span className="text-sm text-gray-400 line-through font-sans">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-border-dark" />

          {/* Variant selector */}
          {product.variants?.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selected={variant}
              onChange={setVariant}
            />
          )}

          {/* Quantity selector */}
          {!isOutOfStock && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-sans mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 border border-gray-200 dark:border-border-dark flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary/50 hover:text-primary transition-colors rounded-l-sm"
                >
                  <span className="material-icons-outlined text-lg">remove</span>
                </button>
                <div className="w-14 h-10 border-t border-b border-gray-200 dark:border-border-dark flex items-center justify-center text-sm font-sans font-medium text-gray-900 dark:text-white">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 border border-gray-200 dark:border-border-dark flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary/50 hover:text-primary transition-colors rounded-r-sm"
                >
                  <span className="material-icons-outlined text-lg">add</span>
                </button>
                <span className="ml-4 text-xs text-gray-400 font-sans">
                  {product.stock} in stock
                </span>
              </div>
            </div>
          )}

          {/* Add to cart / Out of stock */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {isOutOfStock ? (
              <Button variant="dark" fullWidth disabled>
                Out of Stock
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  loading={adding}
                  onClick={handleAddToCart}
                  leftIcon="add_shopping_cart"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    handleAddToCart()
                    setTimeout(() => navigate('/checkout'), 400)
                  }}
                >
                  Buy Now
                </Button>
              </>
            )}
          </div>

          {/* WhatsApp payment note */}
          <div className="flex items-start gap-3 p-4 rounded-sm bg-primary/5 border border-primary/15">
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.75.75 0 00.918.919l5.733-1.474A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.372-.214-3.853.99.998-3.827-.229-.38A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
              Payment is made securely via WhatsApp. After checkout, we'll send payment
              instructions directly to your number.
            </p>
          </div>

        </div>
      </div>

      {/* ── Related products ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
                You May Also Like
              </p>
              <h2 className="font-serif text-2xl text-gray-900 dark:text-white">
                Related <span className="italic text-primary">Products</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors font-sans border-b border-transparent hover:border-primary pb-0.5"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={related} />
        </div>
      )}

    </div>
  )
}