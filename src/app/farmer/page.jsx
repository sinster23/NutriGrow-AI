'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sprout, Cloud, Droplets, Wind, Loader2 } from 'lucide-react';
import { useCropRecommendation, useCropDetails } from '@/lib/hooks';
import CropInputModal from '@/components/CropInputModal';
import CropDetailsModal from '@/components/CropDetailsModal';
import { farmerTranslations } from '@/lib/translations/farmerTranslations';
import { useRegionalAdvisory } from '@/lib/hooks';
import RegionalAdvisoryBanner from '@/components/RegionalAdvisoryBanner';
import CropDiversityScore from '@/components/CropDiversityScore';
import { getStateFromCity } from '@/utils/locationUtils';
import Navbar from '@/components/Navbar';

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

  return farmerTranslations[currentLang];
};

const getCropImage = async (cropName) => {
  const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PIXELS_API_KEY; 
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(cropName + ' crop plant')}&per_page=1`,
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
  
  return `https://source.unsplash.com/400x300/?${encodeURIComponent(cropName)},crop,farm`;
};

const getDefaultCropImage = () => 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80';

export default function FarmerPageContent() {
  const t = useTranslation();
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [selectedCropDetails, setSelectedCropDetails] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [cropImages, setCropImages] = useState({});
  const [diversityScore, setDiversityScore] = useState(null);
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    soilMoisture: '',
    soilType: '',
    nitrogen: '',
    phosphorous: '',
    potassium: '',
  });
  const [regionalAdvisory, setRegionalAdvisory] = useState(null);
  const [showAdvisory, setShowAdvisory] = useState(true);

  const cropMutation = useCropRecommendation();
  const cropDetailsMutation = useCropDetails();
  const regionalAdvisoryMutation = useRegionalAdvisory();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t.unableToGetLocation);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError(t.unableToGetLocation);
        setLocation({ latitude: 20.2961, longitude: 85.8245 });
        fetchWeatherData(20.2961, 85.8245);
      }
    );
  };

 const fetchWeatherData = async (lat, lon) => {
   try {
     setLoading(true);

     const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

     if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
       console.warn("OpenWeatherMap API key not set. Using fallback data.");
       useFallbackData(lat, lon);
       return;
     }

     const weatherResponse = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
     );

     const forecastResponse = await fetch(
       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
     );

     if (weatherResponse.ok && forecastResponse.ok) {
       const weather = await weatherResponse.json();
       const forecast = await forecastResponse.json();

       setWeatherData(weather);
       setForecastData(forecast);

       // NEW: Fetch regional advisory based on location name
       if (weather.name) {
         fetchRegionalAdvisory(weather.name);
       }
     } else {
       useFallbackData(lat, lon);
     }
   } catch (error) {
     console.error("Error fetching weather:", error);
     useFallbackData(lat, lon);
   } finally {
     setLoading(false);
   }
 };

 const fetchRegionalAdvisory = async (locationName) => {
   try {
     // Convert city to state for better matching
     const region = getStateFromCity(locationName);
     const result = await regionalAdvisoryMutation.mutateAsync(region);
     setRegionalAdvisory(result);
   } catch (error) {
     console.error("Error fetching regional advisory:", error);
   }
 };

  const useFallbackData = (lat, lon) => {
    const baseTemp = 28;
    
    setWeatherData({
      name: 'Bhubaneswar',
      coord: { lat, lon },
      main: { 
        temp: baseTemp, 
        humidity: 78, 
        feels_like: baseTemp + 3, 
        pressure: 1010 
      },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3.5 },
      visibility: 10000,
      clouds: { all: 15 },
      sys: { 
        country: 'IN',
        sunrise: Date.now() / 1000 - 3600,
        sunset: Date.now() / 1000 + 7200
      }
    });

    setForecastData({
      list: Array.from({ length: 40 }, (_, i) => ({
        dt: Date.now() / 1000 + i * 3 * 60 * 60,
        dt_txt: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toISOString(),
        main: { 
          temp: baseTemp + (Math.random() * 6 - 3),
          temp_min: baseTemp - 2,
          temp_max: baseTemp + 2
        },
        weather: [{ main: 'Clear', icon: '01d' }]
      }))
    });
  };

  const getHourlyForecast = () => {
    if (!forecastData?.list) return [];
    return forecastData.list.slice(0, 8);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async () => {
  if (!formData.temperature || !formData.humidity || !formData.soilMoisture || !formData.soilType) {
    alert(t.fillRequired);
    return;
  }

  try {
    setCurrentLimit(4);
    const result = await cropMutation.mutateAsync({ ...formData, limit: 4 });
    
    if (result.recommended_crops && result.recommended_crops.length > 0) {
      const cropsData = result.recommended_crops.map((cropName, index) => ({
        id: `crop-${Date.now()}-${index}`,
        name: cropName.charAt(0).toUpperCase() + cropName.slice(1),
        rawName: cropName.toLowerCase(),
        season: t.recommended,
        yield: t.optimizedConditions,
      }));
      setRecommendedCrops(cropsData);
      
      // NEW: Store diversity score
      if (result.diversity_score) {
        setDiversityScore(result.diversity_score);
      }
      
      fetchCropImages(cropsData);
      setIsInputModalOpen(false);
    } else {
      alert(t.noRecommendations);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

  const fetchCropImages = async (crops) => {
    const newImages = {};
    for (const crop of crops) {
      const imageUrl = await getCropImage(crop.rawName);
      newImages[crop.rawName] = imageUrl;
    }
    setCropImages(prev => ({ ...prev, ...newImages }));
  };

  const handleShowMore = async () => {
    if (!formData.temperature || !formData.humidity || !formData.soilMoisture || !formData.soilType) {
      return;
    }

    try {
      const newLimit = currentLimit + 5;
      const result = await cropMutation.mutateAsync({ ...formData, limit: newLimit });
      
      if (result.recommended_crops && result.recommended_crops.length > 0) {
        const cropsData = result.recommended_crops.map((cropName, index) => ({
          id: `crop-${Date.now()}-${index}`,
          name: cropName.charAt(0).toUpperCase() + cropName.slice(1),
          rawName: cropName.toLowerCase(),
          season: t.recommended,
          yield: t.optimizedConditions,
        }));
        setRecommendedCrops(cropsData);
        setCurrentLimit(newLimit);
        
        fetchCropImages(cropsData);
      }
    } catch (error) {
      console.error('Error fetching more crops:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCropClick = async (crop) => {
    if (!formData.temperature || !formData.humidity || !formData.soilMoisture || !formData.soilType) {
      alert(t.provideDataFirst);
      return;
    }

    setIsDetailsModalOpen(true);
    setSelectedCropDetails(null);

    try {
      const result = await cropDetailsMutation.mutateAsync({
        cropName: crop.rawName,
        temperature: formData.temperature,
        humidity: formData.humidity,
        moisture: formData.soilMoisture,
        soilType: formData.soilType,
        nitrogen: formData.nitrogen || 0,
        phosphorous: formData.phosphorous || 0,
        potassium: formData.potassium || 0,
      });

      setSelectedCropDetails(result);
    } catch (error) {
      setSelectedCropDetails({ error: error.message });
    }
  };

  const hourlyForecast = getHourlyForecast();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <Navbar />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[350px] overflow-hidden rounded-b-[30px] bg-cover bg-center sm:min-h-[450px] md:min-h-[500px] md:rounded-b-[50px]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 flex h-full flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm font-medium sm:text-base md:text-lg">
                {loading ? t.gettingLocation : weatherData?.name || t.location}
              </span>
            </div>
            {locationError && (
              <p className="mt-1 text-xs text-yellow-300 sm:text-sm">{locationError}</p>
            )}
          </motion.div>

          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent sm:h-12 sm:w-12"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex-1"
              >
                <div className="mb-4 sm:mb-6">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
                    <span className="text-5xl font-semibold text-white sm:text-6xl md:text-7xl lg:text-8xl">
                      {Math.round(weatherData?.main?.temp)}°
                    </span>
                    <div className="text-white/90">
                      <p className="text-sm capitalize sm:text-base md:text-lg">{weatherData?.weather?.[0]?.description}</p>
                      <p className="text-xs sm:text-sm">{t.feelsLike} {Math.round(weatherData?.main?.feels_like)}°</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-2 sm:mb-8 sm:p-4">
                  <div className="relative">
                    <div className="mb-3 flex items-end justify-between gap-0.5 sm:mb-4 sm:gap-1" style={{ height: '80px' }}>
                      {hourlyForecast.map((item, idx) => {
                        const temp = Math.round(item.main.temp);
                        const temps = hourlyForecast.map(h => h.main.temp);
                        const maxTemp = Math.max(...temps);
                        const minTemp = Math.min(...temps);
                        const range = maxTemp - minTemp || 10;
                        const height = Math.max(20, ((item.main.temp - minTemp) / range) * 50 + 20);
                        
                        return (
                          <div key={idx} className="flex flex-1 flex-col items-center justify-end gap-1 sm:gap-2">
                            <span className="text-[10px] font-medium text-white sm:text-xs md:text-sm">{temp}°</span>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}px` }}
                              transition={{ delay: 0.7 + idx * 0.05, duration: 0.5 }}
                              className="w-full rounded-full bg-gradient-to-t from-yellow-400 to-orange-300"
                              style={{ minHeight: '20px' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between gap-0.5 sm:gap-1">
                      {hourlyForecast.map((item, idx) => (
                        <div key={idx} className="flex flex-1 flex-col items-center gap-0.5 sm:gap-1">
                          <img 
                            src={getWeatherIcon(item.weather[0].icon)} 
                            alt="weather" 
                            className="h-5 w-5 opacity-90 sm:h-6 sm:w-6 md:h-8 md:w-8"
                          />
                          <span className="text-[9px] text-white/60 sm:text-[10px] md:text-xs">
                            {formatTime(item.dt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="grid grid-cols-3 gap-3 sm:gap-4 lg:w-40 lg:grid-cols-1"
              >
                <div className="p-2 text-center sm:p-3">
                  <Droplets className="mx-auto mb-2 h-5 w-5 text-white sm:h-6 sm:w-6" />
                  <p className="mb-1 text-[10px] font-medium text-white/80 sm:text-xs md:text-sm">{t.humidity}</p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">{weatherData?.main?.humidity}%</p>
                </div>
                <div className="p-2 text-center sm:p-3">
                  <Wind className="mx-auto mb-2 h-5 w-5 text-white sm:h-6 sm:w-6" />
                  <p className="mb-1 text-[10px] font-medium text-white/80 sm:text-xs md:text-sm">{t.wind}</p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">{weatherData?.wind?.speed} m/s</p>
                </div>
                <div className="p-2 text-center sm:p-3">
                  <Cloud className="mx-auto mb-2 h-5 w-5 text-white sm:h-6 sm:w-6" />
                  <p className="mb-1 text-[10px] font-medium text-white/80 sm:text-xs md:text-sm">{t.clouds}</p>
                  <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">{weatherData?.clouds?.all}%</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {showAdvisory && regionalAdvisory && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <RegionalAdvisoryBanner
            advisory={regionalAdvisory}
            onDismiss={() => setShowAdvisory(false)}
          />
        </div>
      )}

      {/* Crops Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl"
            >
              {t.recommendedCrops}
            </motion.h2>

            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => setIsInputModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4 sm:text-base md:text-lg"
              disabled={cropMutation.isPending}
            >
              {cropMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                  {t.processing}
                </span>
              ) : (
                t.getCropSuggestions
              )}
            </motion.button>
          </div>
        </div>

        {/* Diversity Score Display */}
{diversityScore && recommendedCrops.length > 0 && (
  <div className="mb-6">
    <CropDiversityScore diversityData={diversityScore} />
  </div>
)}

        {recommendedCrops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[250px] items-center justify-center p-8 sm:min-h-[300px] sm:p-12"
          >
            <div className="text-center">
              <Sprout className="mx-auto mb-3 h-12 w-12 text-gray-400 sm:mb-4 sm:h-16 sm:w-16" />
              <p className="text-sm text-gray-600 sm:text-base md:text-lg">
                {t.provideDetails}
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {recommendedCrops.map((crop, index) => (
                <motion.div
                  key={crop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  onClick={() => handleCropClick(crop)}
                  className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <div className="h-36 overflow-hidden sm:h-40 md:h-48">
                    <img 
                      src={cropImages[crop.rawName] || getDefaultCropImage()} 
                      alt={crop.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">{crop.name}</h3>
                    <div className="space-y-1 text-xs text-gray-600 sm:text-sm">
                      <p><span className="font-medium">{t.status}:</span> {crop.season}</p>
                      <p><span className="font-medium">{t.note}:</span> {crop.yield}</p>
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-emerald-600 sm:mt-3 sm:text-xs">{t.clickForDetails}</p>
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
                disabled={cropMutation.isPending}
                className="rounded-full border-2 border-emerald-600 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-base md:text-lg"
              >
                {cropMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                    {t.loadingMore}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t.showMore}
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs sm:text-sm">+5</span>
                  </span>
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </div>

      {/* Modals */}
      <CropInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={cropMutation.isPending}
      />

      <CropDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        cropDetails={selectedCropDetails}
        isLoading={cropDetailsMutation.isPending}
      />
    </div>
  );
}