export type TemperatureUnit = 'C' | 'F';
export type WindUnit = 'kmh' | 'mph' | 'ms';

export interface GeoLocationItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  country_code?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeatherData {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
  pressure: number;
  precipitation: number;
  cloudCover: number;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  precipitationProbability: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface FullWeatherData {
  location: GeoLocationItem;
  current: CurrentWeatherData;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  timezone: string;
}

export type ActivityRating = 'excellent' | 'good' | 'fair' | 'poor';

export interface ActivityRecommendation {
  id: string;
  title: string;
  iconName: string;
  rating: ActivityRating;
  score: number; // 0 - 100
  summary: string;
  tips: string[];
}

export interface PackingRecommendation {
  item: string;
  category: 'clothing' | 'gear' | 'protection';
  reason: string;
  iconName: string;
}
