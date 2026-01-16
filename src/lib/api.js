// src/lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const cropApi = {
  /**
   * Get crop recommendations based on environmental and soil data
   * @param {Object} data - Form data containing temperature, humidity, etc.
   * @returns {Promise<Object>} Crop recommendations
   */
  recommendCrops: async (data) => {
    const response = await fetch(`${API_BASE_URL}/recommend-crop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temperature: parseFloat(data.temperature),
        humidity: parseFloat(data.humidity),
        moisture: parseFloat(data.soilMoisture),
        soil_type: data.soilType,
        nitrogen: parseFloat(data.nitrogen) || 0,
        phosphorous: parseFloat(data.phosphorous) || 0,
        potassium: parseFloat(data.potassium) || 0,
        limit: data.limit || 4,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to get crop recommendations');
    }

    return response.json();
  },

  /**
   * Get detailed information for a specific crop
   * @param {Object} data - Crop name and environmental data
   * @returns {Promise<Object>} Crop details
   */
  getCropDetails: async (data) => {
    const response = await fetch(`${API_BASE_URL}/crop-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        crop_name: data.cropName,
        temperature: parseFloat(data.temperature),
        humidity: parseFloat(data.humidity),
        moisture: parseFloat(data.moisture),
        soil_type: data.soilType,
        nitrogen: parseFloat(data.nitrogen),
        phosphorous: parseFloat(data.phosphorous),
        potassium: parseFloat(data.potassium),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to get crop details');
    }

    return response.json();
  },

  /**
   * Get nutrition plan based on consumer data
   * @param {Object} data - Consumer data containing age, BMI, etc.
   * @returns {Promise<Object>} Nutrition plan
   */
  getNutritionPlan: async (data) => {
    const response = await fetch(`${API_BASE_URL}/nutrition-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: parseInt(data.age),
        bmi: parseFloat(data.bmi),
        condition: data.condition,
        diet: data.diet,
        limit: data.limit || 4,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to get nutrition plan');
    }

    return response.json();
  },

  /**
   * Get detailed information for a specific food
   * @param {Object} data - Food name and user profile data
   * @returns {Promise<Object>} Food details with personalized explanation
   */
  getFoodDetails: async (data) => {
    const response = await fetch(`${API_BASE_URL}/food-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        food_name: data.foodName,
        age: parseInt(data.age),
        bmi: parseFloat(data.bmi),
        condition: data.condition,
        diet: data.diet,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to get food details');
    }

    return response.json();
  },

   getRegionalAdvisory: async (region) => {
    const response = await fetch(`${API_BASE_URL}/region-nutrition-advisory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: region,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to get regional advisory');
    }

    return response.json();
  },
};