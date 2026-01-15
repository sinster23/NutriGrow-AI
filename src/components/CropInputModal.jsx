'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { cropInputModalTranslations } from '@/lib/translations/modelTranslations';

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

  return cropInputModalTranslations[currentLang];
};

export default function CropInputModal({ isOpen, onClose, formData, onInputChange, onSubmit, isLoading }) {
  const t = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.temperature} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={onInputChange}
              placeholder={t.temperaturePlaceholder}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.humidity} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={onInputChange}
              placeholder={t.humidityPlaceholder}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.soilMoisture} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="soilMoisture"
              value={formData.soilMoisture}
              onChange={onInputChange}
              placeholder={t.soilMoisturePlaceholder}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.soilType} <span className="text-red-500">*</span>
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={onInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="">{t.selectSoilType}</option>
              <option value="sandy">{t.sandy}</option>
              <option value="loamy">{t.loamy}</option>
              <option value="black">{t.black}</option>
              <option value="red">{t.red}</option>
              <option value="clayey">{t.clayey}</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-sm font-medium text-gray-700">
            {t.optional}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.nitrogen}
              </label>
              <input
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={onInputChange}
                placeholder={t.nitrogenPlaceholder}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.phosphorous}
              </label>
              <input
                type="number"
                name="phosphorous"
                value={formData.phosphorous}
                onChange={onInputChange}
                placeholder={t.phosphorousPlaceholder}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t.potassium}
              </label>
              <input
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={onInputChange}
                placeholder={t.potassiumPlaceholder}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {t.processing}
              </span>
            ) : (
              t.getRecommendations
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}