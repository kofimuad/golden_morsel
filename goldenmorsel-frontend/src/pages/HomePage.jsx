import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../features/home/HeroSection';
import FeaturedProducts from '../features/home/FeaturedProducts';
import Collections from '../features/home/Collections';
import BrandStory from '../features/home/BrandStory';
import Button from '../components/common/Button';
import { MessageCircle } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Treaties Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-2">
                Treaties
              </h2>
              <p className="text-gray-600 font-body">Discover our signature collections</p>
            </div>
            <button
              onClick={() => navigate('/collections')}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              View All →
            </button>
          </div>
          <Collections />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Memoria Boxes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
              Memoria Boxes
            </h2>
            <p className="text-gray-600 font-body max-w-2xl mx-auto">
              A nostalgic curation of 12 iconic childhood favorites
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-primary-50 to-cream-100 rounded-2xl p-8 cursor-pointer"
              onClick={() => navigate('/collections/memoria')}
            >
              <div className="mb-4">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  HERITAGE GIFTING
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">
                The Heritage Box
              </h3>
              <p className="text-gray-700 font-body mb-4">
                A nostalgic curation of 12 iconic childhood favorites.
              </p>
              <p className="text-3xl font-bold text-primary-600">GH₵ 250.00</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-cream-100 to-primary-50 rounded-2xl p-8 cursor-pointer"
              onClick={() => navigate('/collections/memoria')}
            >
              <div className="mb-4">
                <span className="bg-dark-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  TRAVEL READY
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">
                Gold Certified Treats
              </h3>
              <p className="text-gray-700 font-body mb-4">
                Expertly crafted premium selection for gifting.
              </p>
              <p className="text-3xl font-bold text-primary-600">GH₵ 180.00</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <BrandStory />

      {/* Pop-ups Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            <div className="relative z-10">
              <span className="inline-block bg-primary-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                UPCOMING
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                The Artisan Fair
              </h2>
              <p className="text-primary-50 font-body mb-2">📍 Labone, Accra</p>
              <p className="text-primary-100 font-body mb-6 max-w-2xl mx-auto">
                Join us for a live tasting of our limited-edition Hibiscus Infused brittle and small-batch chocolate pairings.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-cream-50"
              >
                RSVP to Event →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
              <span className="text-3xl">🍰</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              The Golden Story
            </h2>
            <p className="text-cream-200 font-body text-lg mb-8 max-w-2xl mx-auto">
              "Born from a kitchen in Osu, GoldenMorsel is a tribute to the grandmothers who made every snack a story and every morsel a celebration."
            </p>
            <p className="text-primary-400 font-medium uppercase tracking-wider text-sm mb-8">
              Crafting Nostalgia Since 2024
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold mb-6">Need a Custom Order?</h3>
            <p className="text-cream-200 font-body mb-6">
              Chat with our concierge for personalized gifting and large events.
            </p>
            <Button
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              className="bg-primary-500 hover:bg-primary-600"
              onClick={() => window.open('https://wa.me/233551283848', '_blank')}
            >
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;