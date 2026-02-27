import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../services/productService'
import ProductGrid from '../../components/product/ProductGrid'
import memoriaLogoGold from '../../assets/logos/memoria-logo-gold.png'
import memoriaLogoBlack from '../../assets/logos/memoria-logo-black.png'

const FEATURES = [
  {
    icon: 'card_giftcard',
    title: 'Custom Hampers',
    description: 'Bespoke gift hampers tailored to your occasion, budget, and recipient.',
  },
  {
    icon: 'celebration',
    title: 'Event Gifting',
    description: 'Bulk gifting solutions for weddings, corporate events, and celebrations.',
  },
  {
    icon: 'handshake',
    title: 'Personal Touch',
    description: 'Every package is crafted with care and can include personalised notes.',
  },
  {
    icon: 'local_shipping',
    title: 'Ghana-wide Delivery',
    description: 'We deliver across all regions of Ghana with care and speed.',
  },
]

export default function MemoriaPage() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    getProducts({ category: 'memoria', limit: 8 })
      .then(res => setProducts(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-background-dark overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/7 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        </div>

        {/* Gold top rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

          <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans mb-6 opacity-80">
            By Golden Morsel
          </p>

          {/* Memoria logo */}
          <div className="flex justify-center mb-8">
            <img
              src={memoriaLogoGold}
              alt="Memoria"
              className="h-16 md:h-20 object-contain"
            />
          </div>

          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-6">
            A <span className="italic gold-text-gradient">Taste</span> of Ghana
          </h1>

          <p className="text-base text-gray-400 font-sans leading-relaxed max-w-xl mx-auto mb-10">
            Memoria is our premium gifting line — thoughtfully curated Ghanaian treats
            and keepsakes for every celebration worth remembering.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-black text-xs uppercase tracking-widest font-sans font-medium px-8 py-4 rounded-sm transition-colors shadow-gold-glow shimmer-btn"
          >
            Explore Collection
            <span className="material-icons-outlined text-base">arrow_downward</span>
          </a>
        </div>

        {/* Gold bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-20 bg-background-light dark:bg-surface-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
              Why Memoria
            </p>
            <h2 className="font-serif text-3xl text-gray-900 dark:text-white">
              Gifting, <span className="italic text-primary">Elevated</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-6 rounded-sm border border-gray-100 dark:border-border-dark bg-white dark:bg-surface-dark-2 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-icons-outlined text-primary text-xl">{icon}</span>
                </div>
                <h3 className="font-display text-base text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────── */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
              Memoria Collection
            </p>
            <h2 className="font-serif text-3xl text-gray-900 dark:text-white">
              Our <span className="italic text-primary">Offerings</span>
            </h2>
          </div>
          <Link
            to="/products?category=memoria"
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors font-sans border-b border-transparent hover:border-primary pb-0.5"
          >
            View All
            <span className="material-icons-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          emptyMessage="No Memoria products yet — check back soon."
        />
      </section>

      {/* ── CTA banner ───────────────────────────────────────────── */}
      <section className="relative py-20 bg-background-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Planning a <span className="italic text-primary">Special Event?</span>
          </h2>
          <p className="text-sm text-gray-400 font-sans leading-relaxed mb-8">
            Let us help you create unforgettable gifting experiences. Reach out to us
            via WhatsApp and we'll put together something truly special for you.
          </p>
          <a
            href="https://wa.me/233269191308"
            target="_blank"
            rel="noreferrer"
            className="shimmer-btn inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-black text-xs uppercase tracking-widest font-sans font-medium px-8 py-4 rounded-sm transition-colors shadow-gold-glow"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.75.75 0 00.918.919l5.733-1.474A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.372-.214-3.853.99.998-3.827-.229-.38A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

    </div>
  )
}