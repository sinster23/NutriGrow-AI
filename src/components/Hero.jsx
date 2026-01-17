'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Translations - in production, import from separate file
const translations = {
  en: {
    badge: 'AI for Agriculture & Nutrition',
    headline: 'Where Smart Farming Meets Better Nutrition',
    description: 'NutriGrow AI bridges the gap between agriculture and health by aligning crop recommendations with nutrition needs, enabling healthier and more sustainable communities.',
    cta: 'Get Started',
    ctaSubtext: 'Takes less than a minute'
  },
  hi: {
    badge: 'कृषि और पोषण के लिए AI',
    headline: 'जहां स्मार्ट खेती मिलती है बेहतर पोषण से',
    description: 'NutriGrow AI कृषि और स्वास्थ्य के बीच की खाई को पाटता है, फसल सिफारिशों को पोषण की जरूरतों के साथ संरेखित करके स्वस्थ और अधिक टिकाऊ समुदायों को सक्षम बनाता है।',
    cta: 'शुरू करें',
    ctaSubtext: 'एक मिनट से भी कम समय लगता है'
  },
  pa: {
    badge: 'ਖੇਤੀਬਾੜੀ ਅਤੇ ਪੋਸ਼ਣ ਲਈ AI',
    headline: 'ਜਿੱਥੇ ਸਮਾਰਟ ਖੇਤੀ ਮਿਲਦੀ ਹੈ ਬਿਹਤਰ ਪੋਸ਼ਣ ਨਾਲ',
    description: 'NutriGrow AI ਖੇਤੀਬਾੜੀ ਅਤੇ ਸਿਹਤ ਵਿਚਕਾਰ ਪਾੜੇ ਨੂੰ ਪੂਰਾ ਕਰਦਾ ਹੈ, ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਨੂੰ ਪੋਸ਼ਣ ਦੀਆਂ ਲੋੜਾਂ ਨਾਲ ਜੋੜ ਕੇ ਸਿਹਤਮੰਦ ਅਤੇ ਵਧੇਰੇ ਟਿਕਾਊ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਂਦਾ ਹੈ।',
    cta: 'ਸ਼ੁਰੂ ਕਰੋ',
    ctaSubtext: 'ਇੱਕ ਮਿੰਟ ਤੋਂ ਵੀ ਘੱਟ ਸਮਾਂ ਲੱਗਦਾ ਹੈ'
  },
  mr: {
    badge: 'शेती आणि पोषण साठी AI',
    headline: 'जिथे स्मार्ट शेती भेटते चांगल्या पोषणाला',
    description: 'NutriGrow AI शेती आणि आरोग्य यांच्यातील अंतर पूर्ण करते, पीक शिफारसींना पोषण गरजांशी संरेखित करून निरोगी आणि अधिक टिकाऊ समुदाय सक्षम करते।',
    cta: 'सुरु करा',
    ctaSubtext: 'एक मिनिटापेक्षा कमी वेळ लागतो'
  },
  bn: {
    badge: 'কৃষি এবং পুষ্টির জন্য AI',
    headline: 'যেখানে স্মার্ট চাষাবাদ মিলিত হয় উন্নত পুষ্টির সাথে',
    description: 'NutriGrow AI কৃষি এবং স্বাস্থ্যের মধ্যে ব্যবধান পূরণ করে, ফসলের সুপারিশকে পুষ্টির চাহিদার সাথে সারিবদ্ধ করে স্বাস্থ্যকর এবং আরও টেকসই সম্প্রদায়গুলিকে সক্ষম করে।',
    cta: 'শুরু করুন',
    ctaSubtext: 'এক মিনিটেরও কম সময় লাগে'
  },
  or: {
  badge: 'କୃଷି ଏବଂ ପୋଷଣ ପାଇଁ AI',
  headline: 'ଯେଉଁଠାରେ ସ୍ମାର୍ଟ ଚାଷ ମିଳେ ଉନ୍ନତ ପୋଷଣ ସହିତ',
  description: 'NutriGrow AI କୃଷି ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ମଧ୍ୟରେ ଥିବା ଫାଟକୁ ପୂରଣ କରେ, ଫସଲ ସୁପାରିଶକୁ ପୋଷଣ ଆବଶ୍ୟକତା ସହିତ ସମନ୍ୱିତ କରି ସ୍ୱାସ୍ଥ୍ୟକର ଏବଂ ଅଧିକ ସ୍ଥାୟୀ ସମ୍ପ୍ରଦାୟକୁ ସକ୍ଷମ କରେ।',
  cta: 'ଆରମ୍ଭ କରନ୍ତୁ',
  ctaSubtext: 'ଏକ ମିନିଟରୁ କମ୍ ସମୟ ଲାଗେ'
}
};

// Custom hook for translation
const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    setCurrentLang(savedLang);

    const handleLanguageChange = (event) => {
      setCurrentLang(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return translations[currentLang];
};

export default function HeroSection() {
  const [isUnboxed, setIsUnboxed] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      setIsUnboxed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Navigate to start page
    window.location.href = '/start';
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <motion.div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(hero_bg1.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/60" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center py-8 sm:py-12 md:justify-between md:py-20 lg:py-24">
        <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-8 px-4 sm:gap-12 sm:px-6 md:justify-between md:px-8 lg:px-10">
          
          {/* Top Section - Badge and Headline */}
          <div className="flex w-full flex-col items-start pt-8 sm:pt-12 md:pt-16 lg:pt-20">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isUnboxed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-3 sm:mb-4 md:mb-6"
            >
              <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                {t.badge}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isUnboxed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="max-w-5xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500, letterSpacing: '-0.01em' }}
            >
              {t.headline}
            </motion.h1>
          </div>

          {/* Bottom Section - Paragraph and CTA */}
          <div className="flex w-full flex-col items-start justify-end gap-6 lg:flex-row lg:items-end lg:gap-12">
            <div className="hidden flex-1 lg:block" />

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isUnboxed ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="flex w-full max-w-xl flex-col gap-4 sm:gap-6 lg:max-w-md xl:max-w-lg"
            >
              {/* Description */}
              <p
                className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {t.description}
              </p>

              {/* CTA Button */}
              <div className="flex flex-col items-start gap-1.5 sm:gap-2">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-800 to-green-800 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {t.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </motion.button>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isUnboxed ? { opacity: 1 } : {}}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="text-xs text-gray-400 sm:text-sm"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {t.ctaSubtext}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isUnboxed ? { opacity: 0.1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-500 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96"
      />
    </div>
  );
}