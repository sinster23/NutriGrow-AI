'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone, Send, Loader2, CheckCircle2, Sprout, Users, Building2, MessageSquare, UserCircle, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [selectedLocation, setSelectedLocation] = useState('Odisha');
  const [expandedProfessional, setExpandedProfessional] = useState(null);

  // Professional contacts by location
  const professionalsByLocation = {
    'Odisha': [
      {
        name: 'Dr. Sarita Patel',
        role: 'Nutritionist',
        specialization: 'Clinical Nutrition & Diet Planning',
        phone: '+91 98765 11111',
        email: 'sarita.patel@nutricare.in',
        location: 'Bhubaneswar',
        experience: '12 years'
      },
      {
        name: 'Dr. Rajesh Kumar',
        role: 'Agricultural Expert',
        specialization: 'Sustainable Farming & Soil Health',
        phone: '+91 98765 22222',
        email: 'rajesh.k@agrotech.in',
        location: 'Cuttack',
        experience: '15 years'
      },
      {
        name: 'Ms. Priya Mohanty',
        role: 'Nutritionist',
        specialization: 'Maternal & Child Nutrition',
        phone: '+91 98765 99999',
        email: 'priya.m@healthfirst.in',
        location: 'Puri',
        experience: '8 years'
      }
    ],
    'West Bengal': [
      {
        name: 'Dr. Ananya Mukherjee',
        role: 'Nutritionist',
        specialization: 'Child Nutrition & Women\'s Health',
        phone: '+91 98765 33333',
        email: 'ananya.m@healthplus.in',
        location: 'Kolkata',
        experience: '10 years'
      },
      {
        name: 'Mr. Debashis Roy',
        role: 'Agricultural Expert',
        specialization: 'Organic Farming & Crop Management',
        phone: '+91 98765 44444',
        email: 'debashis.roy@farmtech.in',
        location: 'Medinipur',
        experience: '18 years'
      },
      {
        name: 'Dr. Sutapa Das',
        role: 'Nutritionist',
        specialization: 'Diabetes & Lifestyle Management',
        phone: '+91 98765 00001',
        email: 'sutapa.das@wellness.in',
        location: 'Durgapur',
        experience: '14 years'
      }
    ],
    'Maharashtra': [
      {
        name: 'Dr. Priya Sharma',
        role: 'Nutritionist',
        specialization: 'Sports Nutrition & Wellness',
        phone: '+91 98765 55555',
        email: 'priya.sharma@wellness.in',
        location: 'Mumbai',
        experience: '9 years'
      },
      {
        name: 'Dr. Suresh Patil',
        role: 'Agricultural Expert',
        specialization: 'Precision Agriculture & Technology',
        phone: '+91 98765 66666',
        email: 'suresh.patil@agritech.in',
        location: 'Pune',
        experience: '20 years'
      },
      {
        name: 'Ms. Kavita Deshmukh',
        role: 'Nutritionist',
        specialization: 'Weight Management & Fitness',
        phone: '+91 98765 00002',
        email: 'kavita.d@fitlife.in',
        location: 'Nagpur',
        experience: '7 years'
      }
    ],
    'Punjab': [
      {
        name: 'Dr. Jaspreet Kaur',
        role: 'Nutritionist',
        specialization: 'Therapeutic Diets & Diabetes Management',
        phone: '+91 98765 77777',
        email: 'jaspreet.k@nutrihealth.in',
        location: 'Ludhiana',
        experience: '11 years'
      },
      {
        name: 'Mr. Harpreet Singh',
        role: 'Agricultural Expert',
        specialization: 'Wheat & Rice Cultivation',
        phone: '+91 98765 88888',
        email: 'harpreet.s@farmexpert.in',
        location: 'Amritsar',
        experience: '16 years'
      },
      {
        name: 'Dr. Simran Gill',
        role: 'Nutritionist',
        specialization: 'Pediatric & Adolescent Nutrition',
        phone: '+91 98765 00003',
        email: 'simran.gill@kidsnutri.in',
        location: 'Jalandhar',
        experience: '6 years'
      }
    ],
    'Tamil Nadu': [
      {
        name: 'Dr. Lakshmi Iyer',
        role: 'Nutritionist',
        specialization: 'Traditional Nutrition & Ayurveda',
        phone: '+91 98765 00004',
        email: 'lakshmi.iyer@holistichealth.in',
        location: 'Chennai',
        experience: '13 years'
      },
      {
        name: 'Mr. Ravi Kumar',
        role: 'Agricultural Expert',
        specialization: 'Organic Vegetables & Horticulture',
        phone: '+91 98765 00005',
        email: 'ravi.kumar@greenfarm.in',
        location: 'Coimbatore',
        experience: '19 years'
      }
    ],
    'Karnataka': [
      {
        name: 'Dr. Meera Rao',
        role: 'Nutritionist',
        specialization: 'Corporate Wellness & Preventive Care',
        phone: '+91 98765 00006',
        email: 'meera.rao@wellnesshub.in',
        location: 'Bangalore',
        experience: '10 years'
      },
      {
        name: 'Dr. Vishnu Sharma',
        role: 'Agricultural Expert',
        specialization: 'Coffee & Spice Cultivation',
        phone: '+91 98765 00007',
        email: 'vishnu.s@agriscience.in',
        location: 'Mysore',
        experience: '17 years'
      }
    ]
  };

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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
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

  const locations = Object.keys(professionalsByLocation);

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-3 text-4xl font-bold text-emerald-900 sm:text-5xl">
              {t.pageTitle}
            </h1>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              {t.pageSubtitle}
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* LEFT SIDE: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Description */}
              <div className="rounded-2xl border border-emerald-200 bg-white/60 p-6 backdrop-blur-sm">
                <p className="leading-relaxed text-emerald-800">
                  {t.description}
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4 mt-12">
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

            {/* RIGHT SIDE: Professionals Directory */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-emerald-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-2">
                    Connect with Professionals
                  </h3>
                  <p className="text-emerald-700 text-sm">
                    Find nutritionists and agricultural experts in your region
                  </p>
                </div>

                {/* Location Selector */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-emerald-900">
                    Select Your State
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {locations.map((location) => (
                      <motion.button
                        key={location}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedLocation(location)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          selectedLocation === location
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {location}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Professionals List */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  <AnimatePresence mode="wait">
                    {professionalsByLocation[selectedLocation]?.map((prof, index) => (
                      <motion.div
                        key={`${selectedLocation}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                            prof.role === 'Nutritionist' 
                              ? 'bg-gradient-to-br from-pink-500 to-rose-600' 
                              : 'bg-gradient-to-br from-green-500 to-emerald-600'
                          }`}>
                            {prof.role === 'Nutritionist' ? (
                              <Stethoscope className="h-6 w-6 text-white" />
                            ) : (
                              <Sprout className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-emerald-900">{prof.name}</h4>
                            <p className="text-xs text-emerald-600 font-medium">{prof.role}</p>
                            <p className="text-xs text-emerald-500 mt-1">{prof.specialization}</p>
                            
                            <button
                              onClick={() => setExpandedProfessional(expandedProfessional === `${selectedLocation}-${index}` ? null : `${selectedLocation}-${index}`)}
                              className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                              {expandedProfessional === `${selectedLocation}-${index}` ? (
                                <>
                                  <ChevronUp className="h-3 w-3" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3" />
                                  Show Details
                                </>
                              )}
                            </button>

                            <AnimatePresence>
                              {expandedProfessional === `${selectedLocation}-${index}` && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 space-y-2 border-t border-emerald-100 pt-3"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3 text-emerald-500" />
                                    <span className="text-xs text-emerald-700">{prof.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <UserCircle className="h-3 w-3 text-emerald-500" />
                                    <span className="text-xs text-emerald-700">Experience: {prof.experience}</span>
                                  </div>
                                  <a
                                    href={`tel:${prof.phone}`}
                                    className="flex items-center gap-2 text-xs text-emerald-600 hover:text-emerald-700"
                                  >
                                    <Phone className="h-3 w-3" />
                                    {prof.phone}
                                  </a>
                                  <a
                                    href={`mailto:${prof.email}`}
                                    className="flex items-center gap-2 text-xs text-emerald-600 hover:text-emerald-700"
                                  >
                                    <Mail className="h-3 w-3" />
                                    {prof.email}
                                  </a>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}