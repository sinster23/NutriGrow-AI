// src/lib/locationUtils.js

/**
 * Maps city names to their respective states
 * This helps convert weather API location names to regional advisory data
 */
export const cityToStateMap = {
  // Major cities
  'mumbai': 'Maharashtra',
  'delhi': 'Delhi',
  'bengaluru': 'Karnataka',
  'bangalore': 'Karnataka',
  'hyderabad': 'Telangana',
  'ahmedabad': 'Gujarat',
  'chennai': 'Tamil Nadu',
  'kolkata': 'West Bengal',
  'pune': 'Maharashtra',
  'jaipur': 'Rajasthan',
  'lucknow': 'Uttar Pradesh',
  'kanpur': 'Uttar Pradesh',
  'nagpur': 'Maharashtra',
  'indore': 'Madhya Pradesh',
  'bhopal': 'Madhya Pradesh',
  'visakhapatnam': 'Andhra Pradesh',
  'pimpri': 'Maharashtra',
  'patna': 'Bihar',
  'vadodara': 'Gujarat',
  'ghaziabad': 'Uttar Pradesh',
  'ludhiana': 'Punjab',
  'agra': 'Uttar Pradesh',
  'nashik': 'Maharashtra',
  'faridabad': 'Haryana',
  'meerut': 'Uttar Pradesh',
  'rajkot': 'Gujarat',
  'varanasi': 'Uttar Pradesh',
  'srinagar': 'Jammu and Kashmir',
  'amritsar': 'Punjab',
  'chandigarh': 'Punjab',
  'guwahati': 'Assam',
  'bhubaneswar': 'Odisha',
  'ranchi': 'Jharkhand',
  'raipur': 'Chhattisgarh',
  'thiruvananthapuram': 'Kerala',
  'kochi': 'Kerala',
  'mysore': 'Karnataka',
  'vijayawada': 'Andhra Pradesh',
  'jodhpur': 'Rajasthan',
  'madurai': 'Tamil Nadu',
  'gwalior': 'Madhya Pradesh',
  'shillong': 'Meghalaya',
};

/**
 * Get state name from city name
 * @param {string} cityName - Name of the city
 * @returns {string} State name or the original city name if not found
 */
export const getStateFromCity = (cityName) => {
  const normalized = cityName.toLowerCase().trim();
  return cityToStateMap[normalized] || cityName;
};