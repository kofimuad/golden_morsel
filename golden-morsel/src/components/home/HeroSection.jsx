import { Link } from 'react-router-dom'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'
import memoriaPattern from '../../assets/patterns/memoria-pattern.png'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark -mt-16 pt-16">

      {/* ── Background texture / glow ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Memoria pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url(${memoriaPattern})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            filter: 'invert(1)',
          }}
        />
        {/* Radial gold glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl" />
        {/* Top left subtle glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl" />
        {/* Bottom right */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-2xl" />
      </div>

      {/* ── Gold horizontal rule top ──────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

        {/* Eyebrow */}
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans mb-6 opacity-80">
          Handcrafted in Ghana
        </p>

        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <img
            src={gmLogoGold}
            alt="Golden Morsel"
            className="h-16 md:h-20 object-contain opacity-90"
          />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.05] mb-6">
          Taste the{' '}
          <span className="italic gold-text-gradient">Golden</span>
          <br />
          Difference
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-400 font-sans leading-relaxed max-w-xl mx-auto mb-10">
          Premium Ghanaian confections and gifting experiences,
          crafted with love and tradition for every occasion.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/products"
            className="shimmer-btn inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-black text-xs uppercase tracking-widest font-sans font-medium px-8 py-4 rounded-sm transition-colors shadow-gold-glow hover:shadow-gold-glow-lg"
          >
            <span className="material-icons-outlined text-base">shopping_bag</span>
            Shop Now
          </Link>
          <Link
            to="/memoria"
            className="inline-flex items-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 text-xs uppercase tracking-widest font-sans font-medium px-8 py-4 rounded-sm transition-colors"
          >
            Discover Memoria
            <span className="material-icons-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* ── Scroll hint — anchored to bottom of section ───────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-sans">Scroll</span>
        <span className="material-icons-outlined text-gray-400 text-lg animate-bounce">
          keyboard_arrow_down
        </span>
      </div>

      {/* ── Gold bottom rule ─────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  )
}