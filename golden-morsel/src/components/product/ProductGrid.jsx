import ProductCard from './ProductCard'
import { Skeleton } from '../ui/Skeleton'

export default function ProductGrid({
  products = [],
  loading = false,
  emptyMessage = 'No products found.',
}) {

  // ── Loading state — skeleton cards ──────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="card" />
        ))}
      </div>
    )
  }

  // ── Empty state ──────────────────────────────────────────────
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span className="material-icons-outlined text-5xl text-gray-300 dark:text-gray-700">
          inventory_2
        </span>
        <p className="font-serif text-xl text-gray-400 dark:text-gray-600">{emptyMessage}</p>
        <p className="text-xs text-gray-400 font-sans uppercase tracking-widest">
          Try a different category or search term
        </p>
      </div>
    )
  }

  // ── Grid ─────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}