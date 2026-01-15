// src/components/CropInputModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function CropInputModal({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit, 
  isLoading 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && onClose()}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 overflow-y-auto rounded-3xl bg-white shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <h3 className="text-2xl font-semibold text-gray-900">Crop Details</h3>
              <button
                onClick={() => !isLoading && onClose()}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
                disabled={isLoading}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-8 p-6">
              <div>
                <h4 className="mb-4 text-lg font-semibold text-gray-900">Climate Details</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Temperature (°C) *
                    </label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="e.g., 28"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Humidity (%) *
                    </label>
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g., 65"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Soil Moisture (%) *
                    </label>
                    <input
                      type="number"
                      name="soilMoisture"
                      value={formData.soilMoisture}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g., 40"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-lg font-semibold text-gray-900">Soil Information</h4>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Soil Type *
                  </label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={onInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    disabled={isLoading}
                  >
                    <option value="">Select soil type</option>
                    <option value="sandy">Sandy</option>
                    <option value="loamy">Loamy</option>
                    <option value="clayey">Clayey</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900">
                  Soil Nutrient Levels <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h4>
                <p className="mb-4 text-sm text-gray-600">
                  If available, adding NPK values improves recommendation accuracy.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Nitrogen (N)
                    </label>
                    <input
                      type="number"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g., 45"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phosphorous (P)
                    </label>
                    <input
                      type="number"
                      name="phosphorous"
                      value={formData.phosphorous}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g., 30"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Potassium (K)
                    </label>
                    <input
                      type="number"
                      name="potassium"
                      value={formData.potassium}
                      onChange={onInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g., 25"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="rounded-lg px-6 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <motion.button
                  onClick={onSubmit}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="rounded-lg bg-emerald-600 px-8 py-2.5 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Getting Recommendations...
                    </span>
                  ) : (
                    'Get Recommendations'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}