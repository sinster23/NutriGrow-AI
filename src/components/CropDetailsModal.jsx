// src/components/CropDetailsModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function CropDetailsModal({ isOpen, onClose, cropDetails, isLoading }) {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50';
      case 'good':
        return 'text-blue-600 bg-blue-50';
      case 'fair':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSuitabilityColor = (suitability) => {
    switch (suitability) {
      case 'Excellent':
        return 'text-green-600 bg-green-100 border-green-300';
      case 'Good':
        return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'Fair':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default:
        return 'text-red-600 bg-red-100 border-red-300';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 overflow-y-auto rounded-3xl bg-white shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-4xl md:-translate-x-1/2 md:-translate-y-1/2 md:max-h-[90vh]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {isLoading ? 'Loading...' : cropDetails?.crop_name || 'Crop Details'}
                </h3>
                {!isLoading && cropDetails && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getSuitabilityColor(cropDetails.suitability)}`}>
                    {cropDetails.suitability}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
                  <p className="text-gray-600">Loading crop details...</p>
                </div>
              ) : cropDetails?.error ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <p className="text-gray-600">{cropDetails.error}</p>
                </div>
              ) : cropDetails ? (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Overall Suitability Score</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold text-emerald-600">{cropDetails.overall_score}%</span>
                          <TrendingUp className="h-8 w-8 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Climate Match */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Climate Conditions</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="bg-white border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Temperature</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cropDetails.climate_match.temperature.status)}`}>
                            {cropDetails.climate_match.temperature.match_percentage}%
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{cropDetails.climate_match.temperature.your_value}°C</div>
                        <div className="text-sm text-gray-500 mt-1">Ideal: {cropDetails.climate_match.temperature.ideal_value}°C</div>
                      </div>

                      <div className="bg-white border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Humidity</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cropDetails.climate_match.humidity.status)}`}>
                            {cropDetails.climate_match.humidity.match_percentage}%
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{cropDetails.climate_match.humidity.your_value}%</div>
                        <div className="text-sm text-gray-500 mt-1">Ideal: {cropDetails.climate_match.humidity.ideal_value}%</div>
                      </div>

                      <div className="bg-white border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Moisture</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(cropDetails.climate_match.moisture.status)}`}>
                            {cropDetails.climate_match.moisture.match_percentage}%
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{cropDetails.climate_match.moisture.your_value}%</div>
                        <div className="text-sm text-gray-500 mt-1">Ideal: {cropDetails.climate_match.moisture.ideal_value}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Soil Match */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Soil Compatibility</h4>
                    <div className="bg-white border rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-600 mb-1">Your Soil Type</div>
                          <div className="text-lg font-semibold text-gray-900">{cropDetails.soil_match.your_soil}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cropDetails.soil_match.is_perfect_match ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-yellow-500" />
                          )}
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${cropDetails.soil_match.is_perfect_match ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {cropDetails.soil_match.compatibility}
                          </span>
                        </div>
                      </div>
                      {!cropDetails.soil_match.is_perfect_match && (
                        <div className="mt-3 text-sm text-gray-600">
                          Ideal soil type: <span className="font-medium">{cropDetails.soil_match.ideal_soil}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nutrient Match */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Nutrient Levels (NPK)</h4>
                    <div className="bg-white border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-600">Match Quality</span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(cropDetails.nutrient_match.status)}`}>
                          {cropDetails.nutrient_match.match_percentage}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Nitrogen (N)</div>
                          <div className="text-lg font-semibold text-gray-900">{cropDetails.nutrient_match.your_npk.N}</div>
                          <div className="text-xs text-gray-500">Ideal: {cropDetails.nutrient_match.ideal_npk.N}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Phosphorous (P)</div>
                          <div className="text-lg font-semibold text-gray-900">{cropDetails.nutrient_match.your_npk.P}</div>
                          <div className="text-xs text-gray-500">Ideal: {cropDetails.nutrient_match.ideal_npk.P}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Potassium (K)</div>
                          <div className="text-lg font-semibold text-gray-900">{cropDetails.nutrient_match.your_npk.K}</div>
                          <div className="text-xs text-gray-500">Ideal: {cropDetails.nutrient_match.ideal_npk.K}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explanations */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Detailed Analysis</h4>
                    <div className="space-y-2">
                      {cropDetails.explanations.map((explanation, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                          <span className="text-lg">{explanation.charAt(0)}</span>
                          <p className="text-sm text-gray-700 flex-1">{explanation.substring(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Growing Recommendations</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cropDetails.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}