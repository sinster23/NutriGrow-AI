// NutritionInputModal.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function NutritionInputModal({ isOpen, onClose, formData, onInputChange, onSubmit, isLoading }) {
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
          Your Health Profile
        </h3>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onInputChange}
              placeholder="Enter your age"
              className="w-full rounded-xl border text-gray-400 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              BMI (Body Mass Index) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={onInputChange}
              placeholder="e.g., 22.5"
              step="0.1"
              className="w-full rounded-xl border text-gray-400 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Calculate: weight(kg) / height(m)²
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Health Condition <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={onInputChange}
              className="w-full rounded-xl border b text-gray-400 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="">Select condition</option>
              <option value="general">General Wellness</option>
              <option value="underweight">Underweight</option>
              <option value="diabetes">Diabetes</option>
              <option value="anemia">Anemia</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Dietary Preference <span className="text-red-500">*</span>
            </label>
            <select
              name="diet"
              value={formData.diet}
              onChange={onInputChange}
              className="w-full rounded-xl border text-gray-400 border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="">Select preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
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
              Analyzing...
            </span>
          ) : (
            "Get Recommendations"
          )}
        </button>
      </motion.div>
    </div>
  );
}