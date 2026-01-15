'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { nutritionInputModalTranslations } from '@/lib/translations/modelTranslations';

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

  return nutritionInputModalTranslations[currentLang];
};

export default function NutritionInputModal({ isOpen, onClose, formData, onInputChange, onSubmit, isLoading }) {
  const t = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="mb-6 text-2xl font-semibold text-gray-900">
          {t.title}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.age} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onInputChange}
              placeholder={t.agePlaceholder}
              className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.bmi} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={onInputChange}
              placeholder={t.bmiPlaceholder}
              step="0.1"
              className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {t.bmiCalculate}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.healthCondition} <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={onInputChange}
              className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="">{t.selectCondition}</option>
              <option value="general">{t.generalWellness}</option>
              <option value="underweight">{t.underweight}</option>
              <option value="diabetes">{t.diabetes}</option>
              <option value="anemia">{t.anemia}</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.dietaryPreference} <span className="text-red-500">*</span>
            </label>
            <select
              name="diet"
              value={formData.diet}
              onChange={onInputChange}
              className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="">{t.selectPreference}</option>
              <option value="vegetarian">{t.vegetarian}</option>
              <option value="non-vegetarian">{t.nonVegetarian}</option>
              <option value="vegan">{t.vegan}</option>
            </select>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="mt-6 w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.analyzing}
            </span>
          ) : (
            t.getRecommendations
          )}
        </button>
      </motion.div>
    </div>
  );
}