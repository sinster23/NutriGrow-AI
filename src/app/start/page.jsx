'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Apple, ArrowRight } from 'lucide-react';

// Translations
const translations = {
  en: {
    title: 'Choose How You Want to Use NutriGrow',
    subtitle: 'NutriGrow AI provides tailored recommendations based on your role.',
    farmerTitle: 'For Farmers',
    farmerDescription: 'Get crop recommendations based on soil, climate, and nutrient availability to improve yield and sustainability.',
    farmerButton: 'Get Crop Recommendations',
    consumerTitle: 'For Consumers',
    consumerDescription: 'Receive personalized nutrition guidance based on age, health conditions, and dietary preferences.',
    consumerButton: 'Get Nutrition Plan'
  },
  hi: {
    title: 'चुनें कि आप NutriGrow का उपयोग कैसे करना चाहते हैं',
    subtitle: 'NutriGrow AI आपकी भूमिका के आधार पर अनुकूलित सिफारिशें प्रदान करता है।',
    farmerTitle: 'किसानों के लिए',
    farmerDescription: 'उपज और स्थिरता में सुधार के लिए मिट्टी, जलवायु और पोषक तत्वों की उपलब्धता के आधार पर फसल की सिफारिशें प्राप्त करें।',
    farmerButton: 'फसल सिफारिशें प्राप्त करें',
    consumerTitle: 'उपभोक्ताओं के लिए',
    consumerDescription: 'उम्र, स्वास्थ्य स्थितियों और आहार प्राथमिकताओं के आधार पर व्यक्तिगत पोषण मार्गदर्शन प्राप्त करें।',
    consumerButton: 'पोषण योजना प्राप्त करें'
  },
  pa: {
    title: 'ਚੁਣੋ ਕਿ ਤੁਸੀਂ NutriGrow ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ',
    subtitle: 'NutriGrow AI ਤੁਹਾਡੀ ਭੂਮਿਕਾ ਦੇ ਆਧਾਰ ਤੇ ਅਨੁਕੂਲਿਤ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।',
    farmerTitle: 'ਕਿਸਾਨਾਂ ਲਈ',
    farmerDescription: 'ਉਪਜ ਅਤੇ ਸਥਿਰਤਾ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨ ਲਈ ਮਿੱਟੀ, ਜਲਵਾਯੂ ਅਤੇ ਪੌਸ਼ਟਿਕ ਤੱਤ ਉਪਲਬਧਤਾ ਦੇ ਆਧਾਰ ਤੇ ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।',
    farmerButton: 'ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    consumerTitle: 'ਖਪਤਕਾਰਾਂ ਲਈ',
    consumerDescription: 'ਉਮਰ, ਸਿਹਤ ਸਥਿਤੀਆਂ ਅਤੇ ਖੁਰਾਕ ਤਰਜੀਹਾਂ ਦੇ ਆਧਾਰ ਤੇ ਵਿਅਕਤੀਗਤ ਪੋਸ਼ਣ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ।',
    consumerButton: 'ਪੋਸ਼ਣ ਯੋਜਨਾ ਪ੍ਰਾਪਤ ਕਰੋ'
  },
  mr: {
    title: 'तुम्हाला NutriGrow कसा वापरायचा आहे ते निवडा',
    subtitle: 'NutriGrow AI तुमच्या भूमिकेवर आधारित अनुकूलित शिफारसी प्रदान करते.',
    farmerTitle: 'शेतकऱ्यांसाठी',
    farmerDescription: 'उत्पादन आणि टिकाऊपणा सुधारण्यासाठी माती, हवामान आणि पोषक घटकांच्या उपलब्धतेवर आधारित पीक शिफारसी मिळवा.',
    farmerButton: 'पीक शिफारसी मिळवा',
    consumerTitle: 'ग्राहकांसाठी',
    consumerDescription: 'वय, आरोग्य स्थिती आणि आहार प्राधान्यांवर आधारित वैयक्तिक पोषण मार्गदर्शन प्राप्त करा.',
    consumerButton: 'पोषण योजना मिळवा'
  },
  bn: {
    title: 'আপনি কীভাবে NutriGrow ব্যবহার করতে চান তা চয়ন করুন',
    subtitle: 'NutriGrow AI আপনার ভূমিকার উপর ভিত্তি করে উপযোগী সুপারিশ প্রদান করে।',
    farmerTitle: 'কৃষকদের জন্য',
    farmerDescription: 'ফলন এবং স্থায়িত্ব উন্নত করতে মাটি, জলবায়ু এবং পুষ্টির উপাদান প্রাপ্যতার উপর ভিত্তি করে ফসলের সুপারিশ পান।',
    farmerButton: 'ফসলের সুপারিশ পান',
    consumerTitle: 'ভোক্তাদের জন্য',
    consumerDescription: 'বয়স, স্বাস্থ্যের অবস্থা এবং খাদ্যতালিকাগত পছন্দের উপর ভিত্তি করে ব্যক্তিগত পুষ্টি নির্দেশনা পান।',
    consumerButton: 'পুষ্টি পরিকল্পনা পান'
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

export default function ChooseRolePage() {
  const t = useTranslation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleFarmerClick = () => {
    window.location.href = '/farmer';
  };

  const handleConsumerClick = () => {
    window.location.href = '/consumer';
  };

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
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm text-white/80 drop-shadow-lg sm:text-base md:text-lg lg:text-xl"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          {t.subtitle}
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
              {t.farmerTitle}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8 max-w-md text-sm leading-relaxed text-gray-100 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {t.farmerDescription}
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
              onClick={handleFarmerClick}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-xl transition-all sm:px-8 sm:py-4 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {t.farmerButton}
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
              {t.consumerTitle}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8 max-w-md text-sm leading-relaxed text-gray-100 sm:text-base lg:text-lg"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {t.consumerDescription}
            </motion.p>

            <motion.button
              onClick={handleConsumerClick}
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
              {t.consumerButton}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}