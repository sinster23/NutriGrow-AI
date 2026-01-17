import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { 
  diversityTranslations, 
  getTranslatedText, 
  getTranslatedBenefits 
} from '@/lib/translations/diversityTranslations';

const CropDiversityScore = ({ diversityData }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    setCurrentLang(savedLang);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLang(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  if (!diversityData) return null;

  const { level, unique_crops, total_recommendations, diversity_percentage } = diversityData;

  const getLevelConfig = () => {
    switch (level) {
      case 'LOW':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          icon: AlertTriangle,
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-700',
          progressColor: 'bg-red-500'
        };
      case 'MEDIUM':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          icon: Info,
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-700',
          progressColor: 'bg-yellow-500'
        };
      case 'HIGH':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          icon: CheckCircle,
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-700',
          progressColor: 'bg-green-500'
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600',
          icon: Info,
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-700',
          progressColor: 'bg-gray-500'
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;
  const t = diversityTranslations;

  // Get translated content
  const title = t.title[currentLang] || t.title.en;
  const levelText = t.levels[level]?.[currentLang] || t.levels[level]?.en || level;
  const message = t.messages[level]?.[currentLang] || t.messages[level]?.en;
  const recommendation = t.recommendations[level]?.[currentLang] || t.recommendations[level]?.en;
  const translatedBenefits = getTranslatedBenefits(level, currentLang);
  
  // Get header text based on level
  const benefitsHeaderKey = level === 'HIGH' ? 'benefitsHeader' : 
                            level === 'MEDIUM' ? 'considerationsHeader' : 
                            'risksHeader';
  const benefitsHeader = t[benefitsHeaderKey]?.[currentLang] || t[benefitsHeaderKey]?.en;

  // Stats text
  const uniqueText = t.unique[currentLang] || t.unique.en;
  const ofText = t.uniqueOf[currentLang] || t.uniqueOf.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-6 shadow-lg`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${config.badgeBg}`}>
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${config.textColor}`}>
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${config.badgeBg} ${config.badgeText}`}>
                {levelText}
              </span>
              <span className="text-sm text-gray-600">
                {unique_crops} {ofText} {total_recommendations} {uniqueText} ({diversity_percentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${diversity_percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${config.progressColor}`}
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <p className={`text-sm leading-relaxed ${config.textColor}`}>
          {message}
        </p>
      </div>

      {/* Recommendation */}
      <div className={`mb-4 rounded-lg ${config.badgeBg} p-3`}>
        <p className={`text-sm font-medium ${config.badgeText}`}>
          💡 {recommendation}
        </p>
      </div>

      {/* Benefits/Risks */}
      {translatedBenefits && translatedBenefits.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {benefitsHeader}
          </p>
          <ul className="space-y-1">
            {translatedBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className={`mt-1 ${level === 'HIGH' ? 'text-green-500' : level === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {level === 'HIGH' ? '✓' : level === 'MEDIUM' ? '•' : '⚠'}
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default CropDiversityScore;