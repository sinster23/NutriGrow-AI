'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sprout } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load Google Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Project', href: '#project' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4 md:py-6'
      }`}
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-10">
        <motion.div
          animate={{
            boxShadow: isScrolled
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between rounded-full border border-white/20 bg-white/95 px-3 py-2 backdrop-blur-md sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-8"
        >
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-1.5 text-gray-900 sm:gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 sm:h-7 sm:w-7 md:h-8 md:w-8">
              <Sprout className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </div>
            <span className="text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
              NutriGrow AI
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors lg:px-4 lg:py-2 lg:text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{
                  backgroundColor: 'rgba(243, 244, 246, 1)',
                  color: 'rgba(17, 24, 39, 1)',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Contact Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 sm:flex sm:px-4 sm:py-2 sm:text-sm lg:gap-2 lg:px-5 lg:py-2.5"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(5, 150, 105, 1)',
                boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Contact Us
              <motion.svg
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-1.5 text-gray-700 transition-colors hover:bg-gray-100 sm:p-2 md:hidden"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(243, 244, 246, 1)' }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-2 overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-xl backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-xs font-medium text-gray-700 transition-colors sm:px-4 sm:py-2.5 sm:text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{
                      backgroundColor: 'rgba(243, 244, 246, 1)',
                      color: 'rgba(17, 24, 39, 1)',
                      x: 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 sm:mt-2 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(5, 150, 105, 1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                  <motion.svg
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}