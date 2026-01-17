'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, User, Ruler, Weight, Activity, Utensils } from 'lucide-react';
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
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedBMI, setCalculatedBMI] = useState('');

  // Calculate BMI whenever height or weight changes
  useEffect(() => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        setCalculatedBMI(bmi);
        
        const syntheticEvent = {
          target: {
            name: 'bmi',
            value: bmi
          }
        };
        onInputChange(syntheticEvent);
      }
    } else {
      setCalculatedBMI('');
      const syntheticEvent = {
        target: {
          name: 'bmi',
          value: ''
        }
      };
      onInputChange(syntheticEvent);
    }
  }, [height, weight]);

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 300)) {
      setHeight(value);
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 500)) {
      setWeight(value);
    }
  };

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { text: t.underweightCategory || 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmiValue < 25) return { text: t.normalCategory || 'Normal', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (bmiValue < 30) return { text: t.overweightCategory || 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { text: t.obeseCategory || 'Obese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-3">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {t.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {t.subtitle || 'Help us personalize your nutrition recommendations'}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* LEFT COLUMN - Personal Info */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-gray-900">{t.personalInfo || 'Personal Information'}</h4>
              </div>

              {/* Age Input */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.age} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={onInputChange}
                  placeholder={t.agePlaceholder}
                  className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                  min="1"
                  max="120"
                />
              </div>

              {/* Height and Weight Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4 text-emerald-600" />
                      {t.height} <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      placeholder={t.heightPlaceholder}
                      className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 pr-12 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                      required
                      step="0.1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                      cm
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <Weight className="h-4 w-4 text-emerald-600" />
                      {t.weight} <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                      placeholder={t.weightPlaceholder}
                      className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 pr-12 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                      required
                      step="0.1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                      kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI Display Card */}
            {calculatedBMI && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl border ${getBMICategory(calculatedBMI).border} ${getBMICategory(calculatedBMI).bg} p-6 shadow-sm`}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 mb-1">{t.calculatedBMI || 'Your BMI'}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <p className={`text-5xl font-bold ${getBMICategory(calculatedBMI).color}`}>
                      {calculatedBMI}
                    </p>
                    <p className="text-lg text-gray-500">kg/m²</p>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    {t.bmiFormula || 'BMI = Weight (kg) / Height² (m²)'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN - Health & Diet Info */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-gray-900">{t.healthInfo || 'Health Information'}</h4>
              </div>

              {/* Health Condition */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t.healthCondition} <span className="text-red-500">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={onInputChange}
                  className="w-full rounded-xl border text-gray-700 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                >
                  <option value="">{t.selectCondition}</option>
                  <option value="general">{t.generalWellness}</option>
                  <option value="underweight">{t.underweight}</option>
                  <option value="diabetes">{t.diabetes}</option>
                  <option value="anemia">{t.anemia}</option>
                </select>
              </div>

              {/* Dietary Preference */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    <Utensils className="h-4 w-4 text-emerald-600" />
                    {t.dietaryPreference} <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'vegetarian', label: t.vegetarian, icon: '🥬' },
                    { value: 'non-vegetarian', label: t.nonVegetarian, icon: '🍗' },
                    { value: 'vegan', label: t.vegan, icon: '🌱' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        formData.diet === option.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="diet"
                        value={option.value}
                        checked={formData.diet === option.value}
                        onChange={onInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <span className={`flex-1 font-medium ${
                        formData.diet === option.value ? 'text-emerald-900' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={onSubmit}
          disabled={isLoading || !formData.age || !calculatedBMI || !formData.condition || !formData.diet}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              {t.analyzing}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {t.getRecommendations}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}