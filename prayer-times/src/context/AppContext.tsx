import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
};

export type PrayerTime = {
  name: string;
  time: string;
};

export type Weather = {
  temperature: number;
  condition: string;
  humidity: number;
  icon: string;
};

export type RamadanInfo = {
  year: number;
  startDate: string;
  endDate: string;
  daysLeft: number | null;
  currentDay: number | null;
  isRamadan: boolean;
};

export type Dua = {
  id: number;
  title: string;
  arabic: string;
  translation: string;
};

export type AppContextType = {
  cities: City[];
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  prayerTimes: PrayerTime[];
  weather: Weather | null;
  qiblaDirection: number;
  loading: boolean;
  error: string | null;
  language: string;
  setLanguage: (lang: string) => void;
  userLocation: { latitude: number; longitude: number } | null;
  getUserLocation: () => Promise<void>;
  isGettingLocation: boolean;
  ramadanInfo: RamadanInfo;
};

const egyptianCities: City[] = [
  { id: '1', name: 'Cairo', latitude: 30.0444, longitude: 31.2357, country: 'Egypt', countryCode: 'EG' },
  { id: '2', name: 'Alexandria', latitude: 31.2001, longitude: 29.9187, country: 'Egypt', countryCode: 'EG' },
  { id: '3', name: 'Giza', latitude: 30.0131, longitude: 31.2089, country: 'Egypt', countryCode: 'EG' },
  { id: '4', name: 'Shubra El-Kheima', latitude: 30.1286, longitude: 31.2422, country: 'Egypt', countryCode: 'EG' },
  { id: '5', name: 'Port Said', latitude: 31.2565, longitude: 32.2841, country: 'Egypt', countryCode: 'EG' },
  { id: '6', name: 'Suez', latitude: 29.9668, longitude: 32.5498, country: 'Egypt', countryCode: 'EG' },
  { id: '7', name: 'Luxor', latitude: 25.6872, longitude: 32.6396, country: 'Egypt', countryCode: 'EG' },
  { id: '8', name: 'Aswan', latitude: 24.0889, longitude: 32.8998, country: 'Egypt', countryCode: 'EG' },
  { id: '9', name: 'Asyut', latitude: 27.1783, longitude: 31.1859, country: 'Egypt', countryCode: 'EG' },
  { id: '10', name: 'Ismailia', latitude: 30.5965, longitude: 32.2715, country: 'Egypt', countryCode: 'EG' },
  { id: '11', name: 'Faiyum', latitude: 29.3084, longitude: 30.8428, country: 'Egypt', countryCode: 'EG' },
  { id: '12', name: 'Zagazig', latitude: 30.5833, longitude: 31.5167, country: 'Egypt', countryCode: 'EG' },
  { id: '13', name: 'Damietta', latitude: 31.4175, longitude: 31.8144, country: 'Egypt', countryCode: 'EG' },
  { id: '14', name: 'Assiut', latitude: 27.1783, longitude: 31.1859, country: 'Egypt', countryCode: 'EG' },
  { id: '15', name: 'Tanta', latitude: 30.7865, longitude: 31.0004, country: 'Egypt', countryCode: 'EG' },
];

const ramadanDates = {
  2025: { start: '2025-03-01', end: '2025-03-30' },
  2026: { start: '2026-02-19', end: '2026-03-20' },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<City | null>(egyptianCities[0]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('en');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [ramadanInfo, setRamadanInfo] = useState<RamadanInfo>({
    year: 2025,
    startDate: ramadanDates[2025].start,
    endDate: ramadanDates[2025].end,
    daysLeft: null,
    currentDay: null,
    isRamadan: false
  });
  useEffect(() => {
    const calculateRamadanInfo = () => {
      const today = new Date();
      const currentYear = today.getFullYear();

      const year = currentYear <= 2025 ? 2025 : 2026;
      
      const startDate = new Date(ramadanDates[year].start);
      const endDate = new Date(ramadanDates[year].end);
      
      const isRamadan = today >= startDate && today <= endDate;
      
      let daysLeft = null;
      let currentDay = null;
      
      if (isRamadan) {
        const diffTime = Math.abs(today.getTime() - startDate.getTime());
        currentDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else if (today < startDate) {
        const diffTime = Math.abs(startDate.getTime() - today.getTime());
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      
      setRamadanInfo({
        year,
        startDate: ramadanDates[year].start,
        endDate: ramadanDates[year].end,
        daysLeft,
        currentDay,
        isRamadan
      });
    };
    
    calculateRamadanInfo();
  }, []);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  const getUserLocation = async (): Promise<void> => {
    setIsGettingLocation(true);
    
    try {
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          
          const locationName = response.data.address.city || 
                              response.data.address.town || 
                              response.data.address.village || 
                              'My Location';
          
          const countryName = response.data.address.country || 'Unknown';
          const countryCode = response.data.address.country_code?.toUpperCase() || '';
          const userCity: City = {
            id: 'user-location',
            name: locationName,
            latitude,
            longitude,
            country: countryName,
            countryCode
          };
          setSelectedCity(userCity);
        } catch (geoErr) {
          console.error('Error with reverse geocoding:', geoErr);
          const userCity: City = {
            id: 'user-location',
            name: 'My Location',
            latitude,
            longitude,
            country: 'Current Location',
            countryCode: ''
          };
          
          setSelectedCity(userCity);
        }
      } else {
        throw new Error('Geolocation is not supported by this browser.');
      }
    } catch (err) {
      console.error('Error getting user location:', err);
      setError('Could not access your location. Please select a city manually.');
    } finally {
      setIsGettingLocation(false);
    }
  };
  const calculateQiblaDirection = (lat: number, lng: number) => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kaabaLatRad = (kaabaLat * Math.PI) / 180;
    const kaabaLngRad = (kaabaLng * Math.PI) / 180;

    const y = Math.sin(kaabaLngRad - lngRad);
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);
    
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360; 
    
    return qibla;
  };
  const fetchPrayerTimes = async (city: City) => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}`,
        {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            method: 5,
          },
        }
      );
      
      const timings = response.data.data.timings;
      
      const formattedTimes: PrayerTime[] = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
      ];
      
      setPrayerTimes(formattedTimes);
      localStorage.setItem('prayerTimes', JSON.stringify(formattedTimes));
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      try {
        const fallbackResponse = await axios.get(
          `https://muslimsalat.com/${city.name.toLowerCase()}.json`
        );
        
        if (fallbackResponse.data && fallbackResponse.data.items && fallbackResponse.data.items[0]) {
          const fallbackTimings = fallbackResponse.data.items[0];
          
          const fallbackFormattedTimes: PrayerTime[] = [
            { name: 'Fajr', time: fallbackTimings.fajr },
            { name: 'Dhuhr', time: fallbackTimings.dhuhr },
            { name: 'Asr', time: fallbackTimings.asr },
            { name: 'Maghrib', time: fallbackTimings.maghrib },
            { name: 'Isha', time: fallbackTimings.isha },
          ];
          
          setPrayerTimes(fallbackFormattedTimes);
          localStorage.setItem('prayerTimes', JSON.stringify(fallbackFormattedTimes));
        } else {
          throw new Error('Invalid data from fallback API');
        }
      } catch (fallbackErr) {
        console.error('Error with fallback prayer times API:', fallbackErr);
        setError('Failed to fetch prayer times. Please try again later.');
      }
    }
  };

  const fetchWeather = async (city: City) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: city.latitude,
            lon: city.longitude,
            appid: 'bd5e378503939ddaee76f12ad7a97608',
            units: 'metric',
          },
        }
      );
      
      const weatherData = response.data;
      
      setWeather({
        temperature: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again later.');
    }
  };
  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      setError(null);
      const qibla = calculateQiblaDirection(selectedCity.latitude, selectedCity.longitude);
      setQiblaDirection(qibla);
      Promise.all([
        fetchPrayerTimes(selectedCity),
        fetchWeather(selectedCity),
      ])
        .catch(err => {
          console.error('Error in data fetching:', err);
          setError('Failed to fetch data. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCity]);
  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const value = {
    cities: egyptianCities,
    selectedCity,
    setSelectedCity,
    prayerTimes,
    weather,
    qiblaDirection,
    loading,
    error,
    language,
    setLanguage: changeLanguage,
    userLocation,
    getUserLocation,
    isGettingLocation,
    ramadanInfo
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};