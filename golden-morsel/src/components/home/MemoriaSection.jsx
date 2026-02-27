import { Link } from 'react-router-dom'
import memoriaLogoGold from '../../assets/logos/memoria-logo-gold.png'

export function MemoriaSection() {
  return (
    <section className="relative overflow-hidden bg-background-dark py-24">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/6 rounded-full blur-3xl" />
      </div>

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Eyebrow */}
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans mb-6 opacity-80">
          A Taste of Ghana
        </p>

        {/* Memoria logo */}
        <div className="flex justify-center mb-8">
          <img
            src={memoriaLogoGold}
            alt="Memoria"
            className="h-14 md:h-16 object-contain opacity-90"
          />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
          Gifting Made{' '}
          <span className="italic gold-text-gradient">Memorable</span>
        </h2>

        {/* Description */}
        <p className="text-base text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
          Memoria by Golden Morsel is our premium gifting line — thoughtfully curated
          Ghanaian treats and keepsakes for birthdays, weddings, corporate events,
          and every celebration worth remembering.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { icon: 'card_giftcard', label: 'Custom Hampers'   },
            { icon: 'celebration',   label: 'Event Gifting'    },
            { icon: 'verified',      label: 'Premium Quality'  },
            { icon: 'local_shipping',label: 'Ghana Delivery'   },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-sans uppercase tracking-widest"
            >
              <span className="material-icons-outlined text-base">{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/memoria"
          className="shimmer-btn inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-black text-xs uppercase tracking-widest font-sans font-medium px-8 py-4 rounded-sm transition-colors shadow-gold-glow"
        >
          Explore Memoria
          <span className="material-icons-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      {/* Gold bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  )
}

export default MemoriaSection