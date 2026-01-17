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

export const useFoodDetails = () => {
  return useMutation({
    mutationFn: cropApi.getFoodDetails,
    onSuccess: (data) => {
      console.log('Food details received:', data);
    },
    onError: (error) => {
      console.error('Error getting food details:', error);
    },
  });
};

export const useRegionalAdvisory = () => {
  return useMutation({
    mutationFn: cropApi.getRegionalAdvisory,
    onSuccess: (data) => {
      console.log('Regional advisory received:', data);
    },
    onError: (error) => {
      console.error('Error getting regional advisory:', error);
    },
  });
};

export const useAskAI = () => {
  return useMutation({
    mutationFn: cropApi.askAI,
    onSuccess: (data) => {
      console.log('AI response received:', data);
    },
    onError: (error) => {
      console.error('Error getting AI response:', error);
    },
  });
};