import { Link } from 'react-router-dom'
import ProductGrid from '../product/ProductGrid'

export default function FeaturedProducts({ products = [], loading = false }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-sans mb-1">
            Handpicked for You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
            Featured <span className="italic text-primary">Products</span>
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors font-sans border-b border-transparent hover:border-primary pb-0.5"
        >
          View All
          <span className="material-icons-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      <ProductGrid products={products} loading={loading} />

      {/* Mobile view all */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-sans border-b border-primary pb-0.5"
        >
          View All Products
          <span className="material-icons-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}