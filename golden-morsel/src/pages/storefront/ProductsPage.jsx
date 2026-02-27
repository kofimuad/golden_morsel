import { useState, useEffect } from 'react'
import { getProducts } from '../../services/productService'
import ProductGrid from '../../components/product/ProductGrid'
import ProductFilters from '../../components/product/ProductFilters'

const PAGE_SIZE = 12

export default function ProductsPage() {
  const [products,    setProducts]    = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [page,        setPage]        = useState(1)
  const [totalPages,  setTotalPages]  = useState(1)
  const [total,       setTotal]       = useState(0)
  const [filters,     setFilters]     = useState({ category: '', search: '' })

  // ── Fetch whenever filters or page changes ───────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {
          page,
          limit: PAGE_SIZE,
          ...(filters.category && { category: filters.category }),
          ...(filters.search   && { search:   filters.search   }),
        }
        const res = await getProducts(params)
        setProducts(res.data.data)
        setTotalPages(res.data.pages)
        setTotal(res.data.total)
      } catch (err) {
        setError('Failed to load products. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, page])

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
          Our Collection
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
          All <span className="italic text-primary">Products</span>
        </h1>
        {!loading && (
          <p className="text-xs text-gray-400 font-sans mt-1">
            {total} item{total !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <ProductFilters
        category={filters.category}
        search={filters.search}
        onChange={handleFilterChange}
      />

      {/* ── Error state ─────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400">
          <span className="material-icons-outlined text-xl">error_outline</span>
          <p className="text-sm font-sans">{error}</p>
          <button
            onClick={() => setFilters({ ...filters })} // retrigger effect
            className="ml-auto text-xs uppercase tracking-widest underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Product grid ─────────────────────────────────────────── */}
      <ProductGrid
        products={products}
        loading={loading}
        emptyMessage={
          filters.search
            ? `No results for "${filters.search}"`
            : 'No products in this category yet.'
        }
      />

      {/* ── Pagination ──────────────────────────────────────────── */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-medium border border-gray-200 dark:border-border-dark rounded-sm text-gray-600 dark:text-gray-400 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-icons-outlined text-base">chevron_left</span>
            Prev
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1
              // Show first, last, current and neighbours only
              if (
                p === 1 ||
                p === totalPages ||
                Math.abs(p - page) <= 1
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={[
                      'w-9 h-9 rounded-sm text-xs font-sans font-medium transition-colors',
                      p === page
                        ? 'bg-primary text-black'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary border border-gray-200 dark:border-border-dark hover:border-primary/40',
                    ].join(' ')}
                  >
                    {p}
                  </button>
                )
              }
              // Ellipsis
              if (Math.abs(p - page) === 2) {
                return (
                  <span key={p} className="text-gray-400 text-xs px-1">…</span>
                )
              }
              return null
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-medium border border-gray-200 dark:border-border-dark rounded-sm text-gray-600 dark:text-gray-400 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <span className="material-icons-outlined text-base">chevron_right</span>
          </button>
        </div>
      )}

    </div>
  )
}