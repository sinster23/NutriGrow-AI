'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function FoodDetailsModal({ isOpen, onClose, foodDetails, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 z-10 text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
          </div>
        ) : foodDetails?.error ? (
          <div className="text-center">
            <p className="text-red-600">{foodDetails.error}</p>
          </div>
        ) : foodDetails ? (
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-gray-900 pr-8">{foodDetails.food_name}</h3>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <h4 className="mb-3 font-semibold text-emerald-900">Nutritional Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Calories:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.calories} kcal</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Protein:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.protein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Carbs:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sugars:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.sugars}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sodium:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.sodium}mg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cholesterol:</span>
                    <span className="text-gray-400 ml-2 font-semibold">{foodDetails.cholesterol}mg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-900">Why This Food?</h4>
                <p className="text-sm text-gray-700">{foodDetails.recommendation_reason}</p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <h4 className="mb-2 font-semibold text-purple-900">Best For Your Profile</h4>
                <p className="text-sm text-gray-700">{foodDetails.suitability}</p>
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}