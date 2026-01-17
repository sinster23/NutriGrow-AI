'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Brain, User, Shield, MapPin, CloudRain } from 'lucide-react';

// Translations
const translations = {
  en: {
    sectionBadge: 'Our Services',
    sectionTitle: 'Bridging Agriculture & Nutrition with AI',
    sectionSubtitle: 'Transparent, science-backed solutions for healthier farming and better nutrition',
    services: [
      {
        title: 'Nutrition-Driven Crop Planning',
        description: 'Recommend crops based on soil, climate, and local nutrition needs — not just yield.',
        highlights: ['Soil + weather based', 'Region nutrition awareness', 'Explainable recommendations']
      },
      {
        title: 'Explainable Crop & Food AI',
        description: 'Know why a crop or food is recommended — complete transparency.',
        highlights: ['Temperature, soil & nutrient match', 'Clear suitability scores', 'No black-box AI']
      },
      {
        title: 'Personalized Nutrition Guidance',
        description: 'Get food suggestions tailored to age, BMI, and health conditions.',
        highlights: ['Diabetes, anemia, wellness', 'Dietary preference aware', 'Simple & safe nutrition logic']
      },
      {
        title: 'Sustainable Crop Strategy',
        description: 'Avoid monoculture and reduce risk with smart crop diversity insights.',
        highlights: ['Category-based diversity check', 'Nutrition + climate resilience', 'Long-term farm health']
      },
      {
        title: 'Regional Nutrition Insights',
        description: 'Understand what your community lacks nutritionally — before you grow.',
        highlights: ['Region-level deficiency signals', 'Awareness-first approach', 'Health-aligned farming']
      }
    ]
  },
  hi: {
    sectionBadge: 'हमारी सेवाएं',
    sectionTitle: 'AI के साथ कृषि और पोषण को जोड़ना',
    sectionSubtitle: 'स्वस्थ खेती और बेहतर पोषण के लिए पारदर्शी, विज्ञान-आधारित समाधान',
    services: [
      {
        title: 'पोषण-संचालित फसल योजना',
        description: 'मिट्टी, जलवायु और स्थानीय पोषण जरूरतों के आधार पर फसलों की सिफारिश करें — केवल उपज नहीं।',
        highlights: ['मिट्टी + मौसम आधारित', 'क्षेत्रीय पोषण जागरूकता', 'समझाने योग्य सिफारिशें']
      },
      {
        title: 'समझाने योग्य फसल और खाद्य AI',
        description: 'जानें कि किसी फसल या भोजन की सिफारिश क्यों की गई है — पूर्ण पारदर्शिता।',
        highlights: ['तापमान, मिट्टी और पोषक तत्व मिलान', 'स्पष्ट उपयुक्तता स्कोर', 'कोई ब्लैक-बॉक्स AI नहीं']
      },
      {
        title: 'व्यक्तिगत पोषण मार्गदर्शन',
        description: 'उम्र, BMI और स्वास्थ्य स्थितियों के अनुरूप भोजन सुझाव प्राप्त करें।',
        highlights: ['मधुमेह, एनीमिया, कल्याण', 'आहार वरीयता जागरूक', 'सरल और सुरक्षित पोषण तर्क']
      },
      {
        title: 'सतत फसल रणनीति',
        description: 'स्मार्ट फसल विविधता अंतर्दृष्टि के साथ एकल फसल से बचें और जोखिम कम करें।',
        highlights: ['श्रेणी-आधारित विविधता जांच', 'पोषण + जलवायु लचीलापन', 'दीर्घकालिक खेत स्वास्थ्य']
      },
      {
        title: 'क्षेत्रीय पोषण अंतर्दृष्टि',
        description: 'समझें कि आपके समुदाय में पोषण की कमी क्या है — उगाने से पहले।',
        highlights: ['क्षेत्र-स्तरीय कमी संकेत', 'जागरूकता-प्रथम दृष्टिकोण', 'स्वास्थ्य-संरेखित खेती']
      }
    ]
  },
  pa: {
    sectionBadge: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
    sectionTitle: 'AI ਨਾਲ ਖੇਤੀਬਾੜੀ ਅਤੇ ਪੋਸ਼ਣ ਨੂੰ ਜੋੜਨਾ',
    sectionSubtitle: 'ਸਿਹਤਮੰਦ ਖੇਤੀ ਅਤੇ ਬਿਹਤਰ ਪੋਸ਼ਣ ਲਈ ਪਾਰਦਰਸ਼ੀ, ਵਿਗਿਆਨ-ਆਧਾਰਿਤ ਹੱਲ',
    services: [
      {
        title: 'ਪੋਸ਼ਣ-ਸੰਚਾਲਿਤ ਫਸਲ ਯੋਜਨਾ',
        description: 'ਮਿੱਟੀ, ਜਲਵਾਯੂ ਅਤੇ ਸਥਾਨਕ ਪੋਸ਼ਣ ਲੋੜਾਂ ਦੇ ਆਧਾਰ ਤੇ ਫਸਲਾਂ ਦੀ ਸਿਫਾਰਸ਼ ਕਰੋ — ਸਿਰਫ਼ ਉਪਜ ਨਹੀਂ।',
        highlights: ['ਮਿੱਟੀ + ਮੌਸਮ ਆਧਾਰਿਤ', 'ਖੇਤਰੀ ਪੋਸ਼ਣ ਜਾਗਰੂਕਤਾ', 'ਸਮਝਾਉਣਯੋਗ ਸਿਫਾਰਸ਼ਾਂ']
      },
      {
        title: 'ਸਮਝਾਉਣਯੋਗ ਫਸਲ ਅਤੇ ਭੋਜਨ AI',
        description: 'ਜਾਣੋ ਕਿ ਕਿਸੇ ਫਸਲ ਜਾਂ ਭੋਜਨ ਦੀ ਸਿਫਾਰਸ਼ ਕਿਉਂ ਕੀਤੀ ਗਈ ਹੈ — ਪੂਰੀ ਪਾਰਦਰਸ਼ਤਾ।',
        highlights: ['ਤਾਪਮਾਨ, ਮਿੱਟੀ ਅਤੇ ਪੋਸ਼ਕ ਤੱਤ ਮੇਲ', 'ਸਪਸ਼ਟ ਢੁਕਵੇਂਪਣ ਸਕੋਰ', 'ਕੋਈ ਬਲੈਕ-ਬਾਕਸ AI ਨਹੀਂ']
      },
      {
        title: 'ਵਿਅਕਤੀਗਤ ਪੋਸ਼ਣ ਮਾਰਗਦਰਸ਼ਨ',
        description: 'ਉਮਰ, BMI ਅਤੇ ਸਿਹਤ ਸਥਿਤੀਆਂ ਦੇ ਅਨੁਸਾਰ ਭੋਜਨ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।',
        highlights: ['ਸ਼ੂਗਰ, ਅਨੀਮੀਆ, ਤੰਦਰੁਸਤੀ', 'ਖੁਰਾਕ ਤਰਜੀਹ ਜਾਗਰੂਕ', 'ਸਧਾਰਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਪੋਸ਼ਣ ਤਰਕ']
      },
      {
        title: 'ਟਿਕਾਊ ਫਸਲ ਰਣਨੀਤੀ',
        description: 'ਸਮਾਰਟ ਫਸਲ ਵਿਭਿੰਨਤਾ ਸੂਝ ਨਾਲ ਇੱਕ ਫਸਲ ਤੋਂ ਬਚੋ ਅਤੇ ਜੋਖਮ ਘਟਾਓ।',
        highlights: ['ਸ਼੍ਰੇਣੀ-ਆਧਾਰਿਤ ਵਿਭਿੰਨਤਾ ਜਾਂਚ', 'ਪੋਸ਼ਣ + ਜਲਵਾਯੂ ਲਚਕੀਲਾਪਣ', 'ਲੰਬੇ ਸਮੇਂ ਦੀ ਖੇਤ ਸਿਹਤ']
      },
      {
        title: 'ਖੇਤਰੀ ਪੋਸ਼ਣ ਸੂਝ',
        description: 'ਸਮਝੋ ਕਿ ਤੁਹਾਡੇ ਭਾਈਚਾਰੇ ਵਿੱਚ ਪੋਸ਼ਣ ਦੀ ਕਮੀ ਕੀ ਹੈ — ਉਗਾਉਣ ਤੋਂ ਪਹਿਲਾਂ।',
        highlights: ['ਖੇਤਰ-ਪੱਧਰ ਕਮੀ ਸੰਕੇਤ', 'ਜਾਗਰੂਕਤਾ-ਪਹਿਲਾਂ ਪਹੁੰਚ', 'ਸਿਹਤ-ਸੰਰੇਖਿਤ ਖੇਤੀ']
      }
    ]
  },
  mr: {
    sectionBadge: 'आमच्या सेवा',
    sectionTitle: 'AI सह शेती आणि पोषण जोडणे',
    sectionSubtitle: 'निरोगी शेती आणि चांगल्या पोषणासाठी पारदर्शक, विज्ञान-आधारित उपाय',
    services: [
      {
        title: 'पोषण-चालित पीक नियोजन',
        description: 'माती, हवामान आणि स्थानिक पोषण गरजांवर आधारित पिकांची शिफारस करा — फक्त उत्पन्न नाही.',
        highlights: ['माती + हवामान आधारित', 'प्रादेशिक पोषण जागरूकता', 'स्पष्ट शिफारसी']
      },
      {
        title: 'स्पष्ट पीक आणि अन्न AI',
        description: 'पीक किंवा अन्नाची शिफारस का केली आहे हे जाणून घ्या — संपूर्ण पारदर्शकता.',
        highlights: ['तापमान, माती आणि पोषक जुळणी', 'स्पष्ट योग्यता स्कोअर', 'ब्लॅक-बॉक्स AI नाही']
      },
      {
        title: 'वैयक्तिक पोषण मार्गदर्शन',
        description: 'वय, BMI आणि आरोग्य स्थितीनुसार अन्न सूचना मिळवा.',
        highlights: ['मधुमेह, अशक्तपणा, कल्याण', 'आहार प्राधान्य जागरूक', 'सोपे आणि सुरक्षित पोषण तर्क']
      },
      {
        title: 'टिकाऊ पीक धोरण',
        description: 'स्मार्ट पीक विविधता अंतर्दृष्टीसह एकल पीक टाळा आणि जोखीम कमी करा.',
        highlights: ['श्रेणी-आधारित विविधता तपासणी', 'पोषण + हवामान लवचिकता', 'दीर्घकालीन शेत आरोग्य']
      },
      {
        title: 'प्रादेशिक पोषण अंतर्दृष्टी',
        description: 'तुमच्या समुदायात पोषणाची काय कमतरता आहे हे समजून घ्या — वाढण्यापूर्वी.',
        highlights: ['प्रदेश-स्तरीय कमतरता संकेत', 'जागरूकता-प्रथम दृष्टीकोन', 'आरोग्य-संरेखित शेती']
      }
    ]
  },
  bn: {
    sectionBadge: 'আমাদের সেবা',
    sectionTitle: 'AI দিয়ে কৃষি এবং পুষ্টি সংযুক্ত করা',
    sectionSubtitle: 'স্বাস্থ্যকর চাষাবাদ এবং উন্নত পুষ্টির জন্য স্বচ্ছ, বিজ্ঞান-ভিত্তিক সমাধান',
    services: [
      {
        title: 'পুষ্টি-চালিত ফসল পরিকল্পনা',
        description: 'মাটি, জলবায়ু এবং স্থানীয় পুষ্টির চাহিদার উপর ভিত্তি করে ফসলের সুপারিশ করুন — শুধু ফলন নয়।',
        highlights: ['মাটি + আবহাওয়া ভিত্তিক', 'আঞ্চলিক পুষ্টি সচেতনতা', 'ব্যাখ্যাযোগ্য সুপারিশ']
      },
      {
        title: 'ব্যাখ্যাযোগ্য ফসল এবং খাদ্য AI',
        description: 'জানুন কেন একটি ফসল বা খাবারের সুপারিশ করা হয়েছে — সম্পূর্ণ স্বচ্ছতা।',
        highlights: ['তাপমাত্রা, মাটি এবং পুষ্টির মিল', 'স্পষ্ট উপযুক্ততা স্কোর', 'কোনও ব্ল্যাক-বক্স AI নেই']
      },
      {
        title: 'ব্যক্তিগত পুষ্টি নির্দেশনা',
        description: 'বয়স, BMI এবং স্বাস্থ্যের অবস্থা অনুযায়ী খাবারের পরামর্শ পান।',
        highlights: ['ডায়াবেটিস, রক্তাল্পতা, সুস্থতা', 'খাদ্য পছন্দ সচেতন', 'সহজ এবং নিরাপদ পুষ্টি যুক্তি']
      },
      {
        title: 'টেকসই ফসল কৌশল',
        description: 'স্মার্ট ফসল বৈচিত্র্য অন্তর্দৃষ্টি দিয়ে একক ফসল এড়িয়ে চলুন এবং ঝুঁকি কমান।',
        highlights: ['শ্রেণী-ভিত্তিক বৈচিত্র্য পরীক্ষা', 'পুষ্টি + জলবায়ু স্থিতিস্থাপকতা', 'দীর্ঘমেয়াদী খামার স্বাস্থ্য']
      },
      {
        title: 'আঞ্চলিক পুষ্টি অন্তর্দৃষ্টি',
        description: 'বুঝুন আপনার সম্প্রদায়ে পুষ্টির ঘাটতি কী — চাষের আগে।',
        highlights: ['অঞ্চল-স্তরের ঘাটতি সংকেত', 'সচেতনতা-প্রথম পদ্ধতি', 'স্বাস্থ্য-সংরেখিত চাষাবাদ']
      }
    ]
  },
  or: {
  sectionBadge: 'ଆମର ସେବାଗୁଡିକ',
  sectionTitle: 'AI ସହିତ କୃଷି ଏବଂ ପୋଷଣକୁ ସଂଯୋଗ କରିବା',
  sectionSubtitle: 'ସ୍ୱାସ୍ଥ୍ୟକର ଚାଷ ଏବଂ ଉନ୍ନତ ପୋଷଣ ପାଇଁ ସ୍ୱଚ୍ଛ, ବିଜ୍ଞାନ-ଆଧାରିତ ସମାଧାନ',
  services: [
    {
      title: 'ପୋଷଣ-ଚାଳିତ ଫସଲ ଯୋଜନା',
      description: 'ମାଟି, ଜଳବାୟୁ ଏବଂ ସ୍ଥାନୀୟ ପୋଷଣ ଆବଶ୍ୟକତା ଉପରେ ଆଧାରିତ ଫସଲ ସୁପାରିଶ କରନ୍ତୁ — କେବଳ ଅମଳ ନୁହେଁ।',
      highlights: ['ମାଟି + ପାଗ ଆଧାରିତ', 'ଆଞ୍ଚଳିକ ପୋଷଣ ସଚେତନତା', 'ବ୍ୟାଖ୍ୟାଯୋଗ୍ୟ ସୁପାରିଶ']
    },
    {
      title: 'ବ୍ୟାଖ୍ୟାଯୋଗ୍ୟ ଫସଲ ଏବଂ ଖାଦ୍ୟ AI',
      description: 'ଜାଣନ୍ତୁ କାହିଁକି ଏକ ଫସଲ କିମ୍ବା ଖାଦ୍ୟ ସୁପାରିଶ କରାଯାଇଛି — ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତା।',
      highlights: ['ତାପମାତ୍ରା, ମାଟି ଏବଂ ପୋଷକ ତତ୍ତ୍ୱ ମେଳ', 'ସ୍ପଷ୍ଟ ଉପଯୁକ୍ତତା ସ୍କୋର', 'କୌଣସି ବ୍ଲାକ-ବକ୍ସ AI ନାହିଁ']
    },
    {
      title: 'ବ୍ୟକ୍ତିଗତ ପୋଷଣ ମାର୍ଗଦର୍ଶନ',
      description: 'ବୟସ, BMI ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ଅବସ୍ଥା ଅନୁଯାୟୀ ଖାଦ୍ୟ ପରାମର୍ଶ ପାଆନ୍ତୁ।',
      highlights: ['ମଧୁମେହ, ରକ୍ତହୀନତା, ସୁସ୍ଥତା', 'ଖାଦ୍ୟ ପସନ୍ଦ ସଚେତନ', 'ସରଳ ଏବଂ ନିରାପଦ ପୋଷଣ ତର୍କ']
    },
    {
      title: 'ସ୍ଥାୟୀ ଫସଲ ରଣନୀତି',
      description: 'ସ୍ମାର୍ଟ ଫସଲ ବିବିଧତା ଅନ୍ତର୍ଦୃଷ୍ଟି ସହିତ ଏକକ ଫସଲରୁ ଦୂରେଇ ରୁହନ୍ତୁ ଏବଂ ବିପଦ କମାନ୍ତୁ।',
      highlights: ['ଶ୍ରେଣୀ-ଆଧାରିତ ବିବିଧତା ଯାଞ୍ଚ', 'ପୋଷଣ + ଜଳବାୟୁ ସ୍ଥିରତା', 'ଦୀର୍ଘମେୟାଦୀ ଚାଷ ସ୍ୱାସ୍ଥ୍ୟ']
    },
    {
      title: 'ଆଞ୍ଚଳିକ ପୋଷଣ ଅନ୍ତର୍ଦୃଷ୍ଟି',
      description: 'ବୁଝନ୍ତୁ ଆପଣଙ୍କ ସମ୍ପ୍ରଦାୟରେ ପୋଷଣର ଅଭାବ କଣ — ବୃଦ୍ଧି କରିବା ପୂର୍ବରୁ।',
      highlights: ['ଅଞ୍ଚଳ-ସ୍ତରର ଅଭାବ ସଙ୍କେତ', 'ସଚେତନତା-ପ୍ରଥମ ଉପାୟ', 'ସ୍ୱାସ୍ଥ୍ୟ-ସମନ୍ୱିତ ଚାଷ']
    }
  ]
}
};

const serviceIcons = [Sprout, Brain, User, Shield, MapPin];

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

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const t = useTranslation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <section id="services" className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(service-bg1.jpeg)',
          }}
        />
             <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/60" />
      </div>

      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-400 opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-green-400 opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm">
              {t.sectionBadge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            {t.sectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base text-emerald-50 sm:text-lg md:text-xl"
          >
            {t.sectionSubtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {t.services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:p-8"
                >
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500"
                  />

                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 sm:h-16 sm:w-16"
                    >
                      <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="relative mb-3 text-xl font-semibold text-gray-900 sm:mb-4 sm:text-2xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mb-4 text-sm leading-relaxed text-gray-600 sm:mb-6 sm:text-base">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="relative space-y-2 sm:space-y-3">
                    {service.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={hIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + hIndex * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        <span className="text-xs text-gray-700 sm:text-sm">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-emerald-500 to-green-500"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center sm:mt-16 lg:mt-20"
        >
          <p className="mb-6 text-base text-emerald-100 sm:text-lg">
            Ready to transform your farming and nutrition approach?
          </p>
          <motion.a
            href="/start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/40"
          >
            Get Started Today
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}