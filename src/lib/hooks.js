// src/lib/hooks.js

import { useMutation } from '@tanstack/react-query';
import { cropApi } from './api';

export const useCropRecommendation = () => {
  return useMutation({
    mutationFn: cropApi.recommendCrops,
    onSuccess: (data) => {
      console.log('Crop recommendations received:', data);
    },
    onError: (error) => {
      console.error('Error getting crop recommendations:', error);
    },
  });
};

export const useCropDetails = () => {
  return useMutation({
    mutationFn: cropApi.getCropDetails,
    onSuccess: (data) => {
      console.log('Crop details received:', data);
    },
    onError: (error) => {
      console.error('Error getting crop details:', error);
    },
  });
};

export const useNutritionPlan = () => {
  return useMutation({
    mutationFn: cropApi.getNutritionPlan,
    onSuccess: (data) => {
      console.log('Nutrition plan received:', data);
    },
    onError: (error) => {
      console.error('Error getting nutrition plan:', error);
    },
  });
};