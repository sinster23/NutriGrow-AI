'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone, Send, Loader2, CheckCircle2, Sprout, Users, Building2, MessageSquare } from 'lucide-react';
import { contactTranslations } from '@/lib/translations/contactTranslations';
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

  return contactTranslations[currentLang];
};

export default function ContactPage() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', category: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const categories = [
    { value: 'farmer', label: t.farmerCategory, icon: Sprout },
    { value: 'consumer', label: t.consumerCategory, icon: Users },
    { value: 'organization', label: t.organizationCategory, icon: Building2 },
    { value: 'other', label: t.otherCategory, icon: MessageSquare }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: t.emailContact,
      value: t.emailValue,
      link: 'mailto:contact@nutrigrowai.com'
    },
    {
      icon: Phone,
      label: t.phoneContact,
      value: t.phoneValue,
      link: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      label: t.locationContact,
      value: t.locationValue,
      link: null
    }
  ];

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
        <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* LEFT SIDE: Context / Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Heading */}
              <div>
                <h2 className="mb-3 text-3xl font-semibold text-emerald-900 sm:text-4xl">
                  {t.pageTitle}
                </h2>
                <p className="text-lg text-emerald-700">
                  {t.pageSubtitle}
                </p>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-emerald-200 bg-white/60 p-6 backdrop-blur-sm">
                <p className="leading-relaxed text-emerald-800">
                  {t.description}
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-emerald-900">{t.contactInfoTitle}</h3>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {info.link ? (
                      <a
                        href={info.link}
                        className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-white/60 p-4 backdrop-blur-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-emerald-600">{info.label}</p>
                          <p className="text-emerald-900">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-white/60 p-4 backdrop-blur-sm">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-emerald-600">{info.label}</p>
                          <p className="text-emerald-900">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-8 lg:self-start"
            >
              <div className="rounded-2xl border border-emerald-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <h3 className="mb-6 text-2xl font-semibold text-emerald-900">{t.formTitle}</h3>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="mb-2 text-xl font-semibold text-emerald-900">{t.successTitle}</h4>
                    <p className="text-emerald-700">{t.successMessage}</p>
                  </motion.div>
                ) : (
                  <div className="space-y-5">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-emerald-900">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 placeholder-emerald-400 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        placeholder={t.namePlaceholder}
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-emerald-900">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 placeholder-emerald-400 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        placeholder={t.emailPlaceholder}
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-emerald-900">
                        {t.categoryLabel}
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {categories.map((cat) => (
                          <motion.div
                            key={cat.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, category: cat.value })}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                              formData.category === cat.value
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-emerald-200 bg-white hover:border-emerald-300'
                            }`}
                          >
                            <cat.icon className={`h-5 w-5 ${formData.category === cat.value ? 'text-emerald-600' : 'text-emerald-400'}`} />
                            <span className={`text-sm ${formData.category === cat.value ? 'font-medium text-emerald-900' : 'text-emerald-700'}`}>
                              {cat.label}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-emerald-900">
                        {t.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-emerald-900 placeholder-emerald-400 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        placeholder={t.messagePlaceholder}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.category || !formData.message}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {t.sendingButton}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          {t.sendButton}
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}