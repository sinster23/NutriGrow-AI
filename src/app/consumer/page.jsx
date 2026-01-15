'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Apple, Heart, Loader2, User, TrendingUp } from 'lucide-react';
import { useNutritionPlan } from '@/lib/hooks';
import NutritionInputModal from '@/components/NutritionInputModal';
import FoodDetailsModal from '@/components/FoodDetailsModal';

const getFoodImage = async (foodName) => {
  // Clean the food name - remove parentheses and extra words
  const cleanFoodName = foodName.replace(/\(.*?\)/g, '').trim();
  
  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PIXELS_API_KEY;
  
  // Check if API key exists and is valid
  if (PEXELS_API_KEY && PEXELS_API_KEY !== 'YOUR_API_KEY_HERE') {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(cleanFoodName + ' food')}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          return data.photos[0].src.medium;
        }
      }
    } catch (error) {
      console.error('Error fetching from Pexels:', error);
    }
  }
  
  // Fallback to Unsplash
  return `https://source.unsplash.com/400x300/?${encodeURIComponent(cleanFoodName)},food,meal`;
};

const getDefaultFoodImage = () => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80';

export default function ConsumerPageContent() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const [selectedFoodDetails, setSelectedFoodDetails] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [foodImages, setFoodImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    condition: '',
    diet: '',
  });

  const nutritionMutation = useNutritionPlan();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.age || !formData.bmi || !formData.condition || !formData.diet) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setCurrentLimit(4);
      const result = await nutritionMutation.mutateAsync({ ...formData, limit: 4 });
      
      if (result.recommended_foods && result.recommended_foods.length > 0) {
        const foodsData = result.recommended_foods.map((foodName, index) => ({
          id: `food-${Date.now()}-${index}`,
          name: foodName,
          category: 'Recommended',
          note: result.note || 'Personalized for you',
        }));
        setRecommendedFoods(foodsData);
        
        // Fetch images using Pexels API
        fetchFoodImages(foodsData);
        
        setIsInputModalOpen(false);
      } else {
        alert('No food recommendations found for the given profile.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const fetchFoodImages = async (foods) => {
    const newImages = {};
    for (const food of foods) {
      const imageUrl = await getFoodImage(food.name);
      newImages[food.name] = imageUrl;
    }
    setFoodImages(prev => ({ ...prev, ...newImages }));
  };

  const handleShowMore = async () => {
    if (!formData.age || !formData.bmi || !formData.condition || !formData.diet) {
      return;
    }

    try {
      const newLimit = currentLimit + 5;
      const result = await nutritionMutation.mutateAsync({ ...formData, limit: newLimit });
      
      if (result.recommended_foods && result.recommended_foods.length > 0) {
        const foodsData = result.recommended_foods.map((foodName, index) => ({
          id: `food-${Date.now()}-${index}`,
          name: foodName,
          category: 'Recommended',
          note: result.note || 'Personalized for you',
        }));
        setRecommendedFoods(foodsData);
        setCurrentLimit(newLimit);
        
        // Fetch images using Pexels API
        fetchFoodImages(foodsData);
      }
    } catch (error) {
      console.error('Error fetching more foods:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleFoodClick = async (food) => {
    if (!formData.age || !formData.bmi || !formData.condition || !formData.diet) {
      alert('Please provide your health profile first by clicking "Get Personalized Plan"');
      return;
    }

    setIsDetailsModalOpen(true);
    setSelectedFoodDetails(null);

    try {
      // Mock details - replace with actual API call when available
      const mockDetails = {
        food_name: food.name,
        calories: Math.floor(Math.random() * 300) + 100,
        protein: Math.floor(Math.random() * 20) + 5,
        carbs: Math.floor(Math.random() * 40) + 10,
        sugars: Math.floor(Math.random() * 15) + 2,
        sodium: Math.floor(Math.random() * 200) + 50,
        cholesterol: Math.floor(Math.random() * 100) + 10,
        recommendation_reason: `This food is recommended based on your BMI of ${formData.bmi} and ${formData.condition} condition. It provides balanced nutrition suitable for your dietary preference.`,
        suitability: `Perfect for ${formData.diet} diet. Helps maintain healthy ${formData.condition === 'healthy' ? 'lifestyle' : formData.condition + ' management'}.`
      };

      setSelectedFoodDetails(mockDetails);
    } catch (error) {
      setSelectedFoodDetails({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[350px] overflow-hidden rounded-b-[30px] bg-cover bg-center sm:min-h-[450px] md:min-h-[500px] md:rounded-b-[50px]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 flex h-full flex-col justify-center px-4 py-12 sm:px-6 md:px-12 md:py-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-400 sm:h-8 sm:w-8" />
              <span className="text-sm font-medium text-rose-200 sm:text-base">Your Health Companion</span>
            </div>
            
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Personalized Nutrition Recommendations
            </h1>
            
            <p className="mb-8 text-lg text-white/90 sm:text-xl md:text-2xl">
              Get food suggestions tailored to your age, health needs, and dietary preferences.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <User className="mb-2 h-6 w-6 text-white sm:h-8 sm:w-8" />
                <p className="text-xs font-medium text-white/80 sm:text-sm">Age-Based</p>
                <p className="text-lg font-bold text-white sm:text-xl">Smart Selection</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <TrendingUp className="mb-2 h-6 w-6 text-white sm:h-8 sm:w-8" />
                <p className="text-xs font-medium text-white/80 sm:text-sm">BMI-Optimized</p>
                <p className="text-lg font-bold text-white sm:text-xl">Balanced Diet</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <Heart className="mb-2 h-6 w-6 text-white sm:h-8 sm:w-8" />
                <p className="text-xs font-medium text-white/80 sm:text-sm">Health-Focused</p>
                <p className="text-lg font-bold text-white sm:text-xl">Your Wellness</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Foods Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl"
            >
              Your Personalized Food Plan
            </motion.h2>

            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => setIsInputModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4 sm:text-base md:text-lg"
              disabled={nutritionMutation.isPending}
            >
              {nutritionMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  Processing...
                </span>
              ) : (
                'Get Personalized Plan'
              )}
            </motion.button>
          </div>
        </div>

        {recommendedFoods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[250px] items-center justify-center p-8 sm:min-h-[300px] sm:p-12"
          >
            <div className="text-center">
              <Apple className="mx-auto mb-3 h-12 w-12 text-gray-400 sm:mb-4 sm:h-16 sm:w-16" />
              <p className="text-sm text-gray-600 sm:text-base md:text-lg">
                Share your health profile to see personalized food recommendations
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {recommendedFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  onClick={() => handleFoodClick(food)}
                  className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <div className="h-36 overflow-hidden sm:h-40 md:h-48">
                    <img 
                      src={foodImages[food.name] || getDefaultFoodImage()} 
                      alt={food.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">{food.name}</h3>
                    <div className="space-y-1 text-xs text-gray-600 sm:text-sm">
                      <p><span className="font-medium">Status:</span> {food.category}</p>
                      <p><span className="font-medium">Note:</span> {food.note}</p>
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-emerald-600 sm:mt-3 sm:text-xs">Click for nutritional details →</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-center sm:mt-8"
            >
              <motion.button
                onClick={handleShowMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={nutritionMutation.isPending}
                className="rounded-full border-2 border-emerald-600 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-base md:text-lg"
              >
                {nutritionMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                    Loading More...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Show More Recommendations
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs sm:text-sm">+5</span>
                  </span>
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </div>

      {/* Modals */}
      <NutritionInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={nutritionMutation.isPending}
      />

      <FoodDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        foodDetails={selectedFoodDetails}
        isLoading={false}
      />
    </div>
  );
}