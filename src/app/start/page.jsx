'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Apple, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChooseRolePage() {
  React.useEffect(() => {
    // Load Google Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      {/* Top Header Section - Layered Over Everything */}
      <div className="absolute left-1/2 top-0 z-30 w-full max-w-4xl -translate-x-1/2 px-6 py-8 text-center sm:py-12 md:py-16">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-3 text-3xl font-medium text-white drop-shadow-2xl sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}
        >
          Choose How You Want to Use NutriGrow
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm text-white/80 drop-shadow-lg sm:text-base md:text-lg lg:text-xl"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          NutriGrow AI provides tailored recommendations based on your role.
        </motion.p>
      </div>

      {/* Split Screen Container */}
      <div className="flex w-full flex-1 flex-col md:flex-row">
        {/* Left Side - For Farmers */}
        <motion.div
          className="relative flex flex-1 items-center justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(farmer.jpg)',
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 to-emerald-800/70" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 py-12 pt-32 text-center sm:px-8 sm:pt-40 md:px-12 md:pt-48 lg:py-16 lg:pt-56">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-20 sm:w-20"
            >
              <Sprout className="h-8 w-8 text-white sm:h-10 sm:w-10" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-4 text-3xl font-medium text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}
            >
              For Farmers
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8 max-w-md text-sm leading-relaxed text-gray-100 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Get crop recommendations based on soil, climate, and nutrient availability to improve yield and sustainability.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/farmer')}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-xl transition-all sm:px-8 sm:py-4 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Get Crop Recommendations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - For Consumers */}
        <motion.div
          className="relative flex flex-1 items-center justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(consumer.jpg)',
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-teal-900/85 to-teal-800/70" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 py-12 pt-32 text-center sm:px-8 sm:pt-40 md:px-12 md:pt-48 lg:py-16 lg:pt-56">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-20 sm:w-20"
            >
              <Apple className="h-8 w-8 text-white sm:h-10 sm:w-10" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-4 text-3xl font-medium text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}
            >
              For Consumers
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8 max-w-md text-sm leading-relaxed text-gray-100 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Receive personalized nutrition guidance based on age, health conditions, and dietary preferences.
            </motion.p>

            <motion.button
              onClick={() => router.push('/consumer')}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-xl transition-all sm:px-8 sm:py-4 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Get Nutrition Plan
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}