'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2, User, Bot, ArrowLeft, MapPin, Sprout, Apple } from 'lucide-react';
import { useAskAI } from '@/lib/hooks';
import { aiChatTranslations } from '@/lib/translations/AIChatTranslations';

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

  return aiChatTranslations[currentLang];
};

export default function AIChatPage() {
  const t = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const messagesEndRef = useRef(null);
  const { mutate: askAI, isPending } = useAskAI();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setIsLoadingLocation(false);
      useFallbackLocation();
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
        useFallbackLocation();
      }
    );
  };

  const useFallbackLocation = () => {
    const fallbackLat = 20.2961;
    const fallbackLon = 85.8245;
    setLocation({ latitude: fallbackLat, longitude: fallbackLon });
    fetchWeatherData(fallbackLat, fallbackLon);
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
        console.warn("OpenWeatherMap API key not set. Using fallback data.");
        useFallbackWeatherData();
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (response.ok) {
        const weather = await response.json();
        setWeatherData(weather);
      } else {
        useFallbackWeatherData();
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      useFallbackWeatherData();
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const useFallbackWeatherData = () => {
    setWeatherData({
      name: 'Bhubaneswar',
      main: { 
        temp: 28, 
        humidity: 78
      },
    });
    setIsLoadingLocation(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildContext = () => {
    const context = {
      role: selectedRole,
    };

    if (weatherData) {
      context.region = weatherData.name;
      context.climate = {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
      };
    }

    if (location) {
      context.location = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    return context;
  };

  const handleSend = () => {
    if (!input.trim() || isPending) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    askAI(
      {
        question: input,
        context: buildContext(),
      },
      {
        onSuccess: (data) => {
          const aiMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: data.answer,
            intent: data.intent,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        },
        onError: (error) => {
          const errorMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: t.error,
            isError: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        },
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleClick = (question) => {
    setInput(question);
  };

  const handleBack = () => {
    window.history.back();
  };

  const currentExamples = selectedRole === 'farmer' 
    ? t.examples.farmerQuestions 
    : selectedRole === 'consumer' 
    ? t.examples.consumerQuestions 
    : [...t.examples.farmerQuestions.slice(0, 2), ...t.examples.consumerQuestions.slice(0, 2)];

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 border-b border-emerald-200/50 bg-white/80 backdrop-blur-sm"
      >
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-emerald-700 transition-colors hover:text-emerald-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">{t.back}</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-semibold text-emerald-900 sm:text-xl">
                  {t.title}
                </h1>
                <p className="text-xs text-emerald-600 sm:text-sm">
                  {t.subtitle}
                </p>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="flex items-center gap-2 text-emerald-700">
              <MapPin className="h-4 w-4" />
              <span className="hidden text-sm sm:inline">
                {isLoadingLocation ? t.detectingLocation : weatherData?.name || t.location}
              </span>
            </div>
          </div>

          {/* Role Selector */}
          {!selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <span className="text-sm font-medium text-emerald-900">{t.selectRole}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole('farmer')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 px-4 py-2 text-sm text-white shadow-lg transition-all hover:shadow-xl"
              >
                <Sprout className="h-4 w-4" />
                {t.farmer}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole('consumer')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 px-4 py-2 text-sm text-white shadow-lg transition-all hover:shadow-xl"
              >
                <Apple className="h-4 w-4" />
                {t.consumer}
              </motion.button>
            </motion.div>
          )}

          {selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                {selectedRole === 'farmer' ? <Sprout className="h-3 w-3" /> : <Apple className="h-3 w-3" />}
                {selectedRole === 'farmer' ? t.farmer : t.consumer}
              </span>
              {weatherData && (
                <span className="text-xs text-emerald-600">
                  {Math.round(weatherData.main.temp)}°C • {weatherData.main.humidity}% {t.humidity}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100">
                <Sparkles className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="mb-2 text-2xl font-medium text-emerald-900">
                {t.title}
              </h2>
              <p className="mb-8 text-emerald-600">
                {t.subtitle}
              </p>

              {/* Example Questions */}
              <div className="w-full max-w-2xl">
                <p className="mb-4 text-sm font-medium text-emerald-700">
                  {t.examples.title}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentExamples.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExampleClick(question)}
                      className="rounded-lg border border-emerald-200 bg-white p-4 text-left text-sm text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[85%] gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-teal-500 to-cyan-600'
                            : message.isError
                            ? 'bg-gradient-to-br from-red-500 to-orange-600'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white'
                            : message.isError
                            ? 'border border-red-200 bg-red-50 text-red-800'
                            : 'border border-emerald-200 bg-white text-emerald-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base">
                          {message.content}
                        </p>
                        {message.intent && (
                          <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                            {message.intent}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                      <span className="text-sm text-emerald-700">
                        {t.typing}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-t border-emerald-200/50 bg-white/80 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              disabled={isPending}
              className="flex-1 rounded-full border border-emerald-200 bg-white px-6 py-3 text-emerald-900 placeholder-emerald-400 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isPending}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}