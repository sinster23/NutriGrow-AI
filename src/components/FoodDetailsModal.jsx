'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, Award, TrendingUp, Heart, CheckCircle2 } from 'lucide-react';
import { foodDetailsTranslations } from '@/lib/translations/foodmodeltranslations';

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

  return foodDetailsTranslations[currentLang];
};

export default function FoodDetailsModal({ isOpen, onClose, foodDetails, isLoading }) {
  const t = useTranslation();

  if (!isOpen) return null;

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-blue-600';
    return 'text-amber-600';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-emerald-50';
    if (percentage >= 60) return 'bg-blue-50';
    return 'bg-amber-50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 z-10 text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600">{t.analyzingNutritional}</p>
            </div>
          </div>
        ) : foodDetails?.error ? (
          <div className="text-center py-12">
            <div className="rounded-full bg-red-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-600 text-lg font-semibold">{foodDetails.error}</p>
          </div>
        ) : foodDetails ? (
          <div className="pr-8">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{foodDetails.food_name}</h3>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-gray-600">
                  {t.servingSize}: {foodDetails.serving_size}
                </span>
              </div>
            </div>

            {/* Overall Match Score */}
            <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                  <h4 className="text-lg font-semibold text-emerald-900">{t.overallMatch}</h4>
                </div>
                <span className="text-3xl font-bold text-emerald-600">{foodDetails.overall_match}%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{t.dietMatch}</p>
                  <p className="text-lg font-semibold text-gray-900">{foodDetails.match_breakdown.diet_compatibility}%</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{t.healthMatch}</p>
                  <p className="text-lg font-semibold text-gray-900">{foodDetails.match_breakdown.condition_suitability}%</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{t.bmiMatch}</p>
                  <p className="text-lg font-semibold text-gray-900">{foodDetails.match_breakdown.bmi_alignment}%</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{t.ageMatch}</p>
                  <p className="text-lg font-semibold text-gray-900">{foodDetails.match_breakdown.age_appropriateness}%</p>
                </div>
              </div>
            </div>

            {/* Nutritional Information */}
            <div className="mb-6 rounded-2xl bg-blue-50 p-6">
              <h4 className="mb-4 font-semibold text-blue-900 text-lg flex items-center gap-2">
                <Heart className="h-5 w-5" />
                {t.nutritionalInformation}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.calories}</p>
                  <p className="text-xs text-gray-600 mt-1">{t.calories}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.protein}g</p>
                  <p className="text-xs text-gray-600 mt-1">{t.protein}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.carbs}g</p>
                  <p className="text-xs text-gray-600 mt-1">{t.carbs}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.sugars}g</p>
                  <p className="text-xs text-gray-600 mt-1">{t.sugars}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.sodium}mg</p>
                  <p className="text-xs text-gray-600 mt-1">{t.sodium}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{foodDetails.cholesterol}mg</p>
                  <p className="text-xs text-gray-600 mt-1">{t.cholesterol}</p>
                </div>
              </div>
            </div>

            {/* Why This Food */}
            <div className="mb-6 rounded-2xl bg-purple-50 p-6">
              <h4 className="mb-3 font-semibold text-purple-900 text-lg">{t.whyRecommended}</h4>
              <p className="text-gray-700 leading-relaxed">{foodDetails.recommendation_reason}</p>
            </div>

            {/* Suitability */}
            <div className="mb-6 rounded-2xl bg-amber-50 p-6">
              <h4 className="mb-3 font-semibold text-amber-900 text-lg">{t.perfectForProfile}</h4>
              <p className="text-gray-700 leading-relaxed mb-4">{foodDetails.suitability}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">{t.dietType}:</span>
                  <span className="ml-2 font-semibold text-gray-900">{foodDetails.dietary_info.diet_type}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t.ageGroup}:</span>
                  <span className="ml-2 font-semibold text-gray-900">{foodDetails.dietary_info.age_group}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t.bmiCategory}:</span>
                  <span className="ml-2 font-semibold text-gray-900">{foodDetails.dietary_info.bmi_category}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t.healthFocus}:</span>
                  <span className="ml-2 font-semibold text-gray-900">{foodDetails.dietary_info.suitable_for}</span>
                </div>
              </div>
            </div>

            {/* Specific Benefits */}
            {foodDetails.specific_benefits && foodDetails.specific_benefits.length > 0 && (
              <div className="rounded-2xl bg-emerald-50 p-6">
                <h4 className="mb-4 font-semibold text-emerald-900 text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  {t.keyBenefits}
                </h4>
                <ul className="space-y-2">
                  {foodDetails.specific_benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}