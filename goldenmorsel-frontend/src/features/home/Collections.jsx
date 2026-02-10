import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      name: 'Sweet',
      description: 'MINCAKE & MORE',
      image: '🧁',
      gradient: 'from-primary-200 to-primary-300',
      path: '/collections/sweet',
    },
    {
      id: 2,
      name: 'Savory',
      description: 'SPICED NUT MIXES',
      image: '🥜',
      gradient: 'from-orange-200 to-orange-300',
      path: '/collections/savory',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate(collection.path)}
          className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg group bg-gradient-to-br ${collection.gradient}`}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <span className="text-6xl mb-4">{collection.image}</span>
            <h3 className="text-3xl font-display font-bold mb-2">{collection.name}</h3>
            <p className="text-sm font-medium tracking-wider opacity-90">
              {collection.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Collections;