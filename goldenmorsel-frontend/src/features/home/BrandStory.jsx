import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Award, Heart } from 'lucide-react';

const BrandStory = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Cultural Soulfulness',
      description: 'Rooted deeply in Ghana\'s rich culinary heritage.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Uncompromising Craftsmanship',
      description: 'Handmade with care and attention to detail.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Sustainable Growth',
      description: 'Farm-to-table approach for genuine freshness.',
    },
  ];

  return (
    <section className="py-20 bg-dark-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full filter blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="inline-block bg-primary-500/20 text-primary-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                EST. 2023
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              A Taste of <span className="text-primary-400">Heritage</span>
            </h2>
            <div className="space-y-4 text-cream-200 font-body text-lg">
              <p>
                <span className="text-primary-400 font-bold text-6xl float-left mr-4 leading-none">G</span>
                oldenMorsel was born in Bridge to close the gap between Ghanaian nostalgia and modern artisanal creation. We believe every dish tells a story of craftsmanship, and we honour that legacy in our Memoria and Pop-Up series.
              </p>
              <div className="border-l-4 border-primary-500 pl-6 py-2 my-6">
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  Preserving the Flame
                </h3>
                <p className="text-cream-200">
                  Our mission is to safeguard the authentic techniques of our ancestors while preserving their culinary wisdom for future generations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cream-200 font-body">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Artisan Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 mt-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  👨‍🍳
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Artisan's in Every Crumb
                  </h3>
                  <p className="text-primary-100 text-sm">
                    Small-batch excellence since day one
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-3 bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-full px-6 py-3">
            <Heart className="w-5 h-5 text-primary-400" />
            <p className="text-cream-200 font-body">
              <span className="font-bold text-white">For the Modern Epicurean</span> — Traditional rooted in execution but modern in execution
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;