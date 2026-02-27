import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../services/productService'
import HeroSection from '../../components/home/HeroSection'
import FeaturedProducts from '../../components/home/FeaturedProducts'
import MemoriaSection from '../../components/home/MemoriaSection'
import NewsletterBanner from '../../components/home/NewsletterBanner'

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    getProducts({ limit: 4, featured: true })
      .then(res => setFeatured(res.data.data || []))
      .catch(() => {
        // Fall back to just latest products if no featured flag
        getProducts({ limit: 4 })
          .then(res => setFeatured(res.data.data || []))
          .catch(console.error)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <HeroSection />
      <FeaturedProducts products={featured} loading={loading} />
      <MemoriaSection />
      <NewsletterBanner />
    </div>
  )
}