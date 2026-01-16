import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Info, TrendingUp } from 'lucide-react';
import { 
  regionalAdvisoryTranslations,
  getTranslatedAdvisoryMessage,
  getTranslatedCropName,
  getTranslatedNutrient,
  getTranslatedAwarenessNote
} from '@/lib/translations/regionalAdvisoryTranslations';

const RegionalAdvisoryBanner = ({ advisory, onDismiss }) => {
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

  if (!advisory) return null;

  const getSeverityConfig = (severity) => {
    const configs = {
      very_high: {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        textColor: 'text-red-900',
        badgeColor: 'bg-red-100 text-red-800'
      },
      high: {
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-600',
        textColor: 'text-orange-900',
        badgeColor: 'bg-orange-100 text-orange-800'
      },
      moderate: {
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        iconColor: 'text-amber-600',
        textColor: 'text-amber-900',
        badgeColor: 'bg-amber-100 text-amber-800'
      },
      low: {
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        iconColor: 'text-emerald-600',
        textColor: 'text-emerald-900',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      }
    };
    return configs[severity] || configs.moderate;
  };

  const config = getSeverityConfig(advisory.severity);
  const t = regionalAdvisoryTranslations;
  
  // Get translated content
  const translatedMessage = getTranslatedAdvisoryMessage(advisory.region, currentLang);
  const translatedAwarenessNote = getTranslatedAwarenessNote(currentLang);
  const severityText = t.severity[advisory.severity]?.[currentLang] || t.severity[advisory.severity]?.en;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`relative mb-6 overflow-hidden rounded-2xl border-2 ${config.borderColor} ${config.bgColor} shadow-lg`}
      >
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className={`absolute right-3 top-3 rounded-full p-1.5 transition-all hover:bg-white/50 ${config.iconColor}`}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <h3 className={`text-base font-semibold sm:text-lg ${config.textColor}`}>
                  {t.title[currentLang]} {advisory.region}
                </h3>
                <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.badgeColor}`}>
                  {severityText} {t.priority[currentLang]}
                </span>
              </div>

              {/* Deficiencies */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm font-medium ${config.textColor}`}>
                  {t.commonDeficiencies[currentLang]}
                </span>
                {advisory.deficiencies.map((deficiency, index) => (
                  <span
                    key={index}
                    className={`rounded-full bg-white/70 px-3 py-1 text-xs font-semibold shadow-sm ${config.textColor}`}
                  >
                    {getTranslatedNutrient(deficiency, currentLang)}
                  </span>
                ))}
              </div>

              {/* Message */}
              <p className={`text-sm leading-relaxed sm:text-base ${config.textColor}`}>
                {translatedMessage}
              </p>

              {/* Statistics */}
              {advisory.statistics && (
                <div className="flex items-center gap-2 rounded-lg bg-white/50 p-3">
                  <Info className={`h-4 w-4 flex-shrink-0 ${config.iconColor}`} />
                  <p className="text-xs text-gray-700 sm:text-sm">
                    <span className="font-semibold">{t.regionalData[currentLang]}</span> {advisory.statistics}
                  </p>
                </div>
              )}

              {/* Recommended Crops */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-4 w-4 ${config.iconColor}`} />
                  <span className={`text-sm font-semibold ${config.textColor}`}>
                    {t.recommendedCrops[currentLang]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {advisory.recommended_crops.map((crop, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {getTranslatedCropName(crop, currentLang)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awareness Note */}
              {advisory.awareness_note && (
                <p className="text-xs italic text-gray-600">
                  {translatedAwarenessNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegionalAdvisoryBanner;