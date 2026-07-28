import { 
  TemperatureUnit, 
  WindUnit, 
  CurrentWeatherData, 
  DailyForecastItem, 
  HourlyForecastItem,
  ActivityRecommendation,
  PackingRecommendation,
  ActivityRating
} from '../types/weather';

export interface WeatherConditionInfo {
  label: string;
  description: string;
  iconName: string;
  theme: {
    gradient: string;
    badgeBg: string;
    badgeText: string;
    accentColor: string;
    skyBg: string;
  };
}

export const WMO_WEATHER_CODES: Record<number, WeatherConditionInfo> = {
  0: {
    label: 'Clear Sky',
    description: 'Sunny and completely clear sky',
    iconName: 'Sun',
    theme: {
      gradient: 'from-amber-500/10 via-amber-100/30 to-blue-50/50',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      badgeText: 'text-amber-600',
      accentColor: '#f59e0b',
      skyBg: 'bg-gradient-to-br from-amber-50 via-sky-50 to-blue-50'
    }
  },
  1: {
    label: 'Mainly Clear',
    description: 'Mostly sunny with few passing clouds',
    iconName: 'SunMedium',
    theme: {
      gradient: 'from-amber-400/10 via-sky-100/30 to-blue-50/50',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      badgeText: 'text-amber-600',
      accentColor: '#fbbf24',
      skyBg: 'bg-gradient-to-br from-amber-50/80 via-sky-50 to-slate-50'
    }
  },
  2: {
    label: 'Partly Cloudy',
    description: 'Scattered clouds with intermittent sunshine',
    iconName: 'CloudSun',
    theme: {
      gradient: 'from-sky-400/10 via-blue-100/30 to-slate-50/50',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      badgeText: 'text-sky-600',
      accentColor: '#0284c7',
      skyBg: 'bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100'
    }
  },
  3: {
    label: 'Overcast',
    description: 'Dense cloud cover blocking the sun',
    iconName: 'Cloud',
    theme: {
      gradient: 'from-slate-400/10 via-gray-200/30 to-zinc-100/50',
      badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
      badgeText: 'text-slate-600',
      accentColor: '#64748b',
      skyBg: 'bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200'
    }
  },
  45: {
    label: 'Foggy',
    description: 'Low visibility due to fog',
    iconName: 'CloudFog',
    theme: {
      gradient: 'from-zinc-300/20 via-slate-200/30 to-gray-100/50',
      badgeBg: 'bg-zinc-200 text-zinc-800 border-zinc-300',
      badgeText: 'text-zinc-600',
      accentColor: '#71717a',
      skyBg: 'bg-gradient-to-br from-zinc-100 via-slate-100 to-gray-200'
    }
  },
  48: {
    label: 'Rime Fog',
    description: 'Freezing fog forming rime ice',
    iconName: 'CloudFog',
    theme: {
      gradient: 'from-cyan-300/20 via-slate-200/30 to-blue-100/50',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      badgeText: 'text-cyan-600',
      accentColor: '#06b6d4',
      skyBg: 'bg-gradient-to-br from-cyan-50 via-slate-100 to-blue-100'
    }
  },
  51: {
    label: 'Light Drizzle',
    description: 'Gentle fine mist and light drizzle',
    iconName: 'CloudDrizzle',
    theme: {
      gradient: 'from-blue-400/10 via-cyan-100/30 to-slate-100/50',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      badgeText: 'text-blue-600',
      accentColor: '#3b82f6',
      skyBg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-100'
    }
  },
  53: {
    label: 'Moderate Drizzle',
    description: 'Steady light rain shower',
    iconName: 'CloudDrizzle',
    theme: {
      gradient: 'from-blue-500/15 via-sky-200/30 to-slate-200/50',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
      badgeText: 'text-blue-700',
      accentColor: '#2563eb',
      skyBg: 'bg-gradient-to-br from-blue-100 via-sky-100 to-slate-200'
    }
  },
  55: {
    label: 'Dense Drizzle',
    description: 'Heavy drizzle with reduced visibility',
    iconName: 'CloudRain',
    theme: {
      gradient: 'from-blue-600/15 via-indigo-200/30 to-slate-200/50',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      badgeText: 'text-indigo-700',
      accentColor: '#1d4ed8',
      skyBg: 'bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-200'
    }
  },
  61: {
    label: 'Slight Rain',
    description: 'Light rainfall',
    iconName: 'CloudRain',
    theme: {
      gradient: 'from-blue-500/15 via-sky-200/30 to-slate-200/50',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
      badgeText: 'text-blue-700',
      accentColor: '#2563eb',
      skyBg: 'bg-gradient-to-br from-blue-100 via-sky-100 to-slate-200'
    }
  },
  63: {
    label: 'Moderate Rain',
    description: 'Steady rain showers',
    iconName: 'CloudRain',
    theme: {
      gradient: 'from-blue-600/20 via-slate-300/40 to-indigo-100/50',
      badgeBg: 'bg-blue-200 text-blue-900 border-blue-300',
      badgeText: 'text-blue-800',
      accentColor: '#1d4ed8',
      skyBg: 'bg-gradient-to-br from-blue-200/80 via-slate-200 to-indigo-100'
    }
  },
  65: {
    label: 'Heavy Rain',
    description: 'Torrential downpour and intense rain',
    iconName: 'CloudRainWind',
    theme: {
      gradient: 'from-indigo-600/25 via-slate-400/40 to-blue-200/50',
      badgeBg: 'bg-indigo-200 text-indigo-950 border-indigo-300',
      badgeText: 'text-indigo-800',
      accentColor: '#4338ca',
      skyBg: 'bg-gradient-to-br from-indigo-200 via-slate-300 to-blue-200'
    }
  },
  71: {
    label: 'Slight Snow',
    description: 'Light fluttering snowfall',
    iconName: 'CloudSnow',
    theme: {
      gradient: 'from-sky-200/30 via-slate-100/40 to-blue-50/50',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
      badgeText: 'text-sky-700',
      accentColor: '#0284c7',
      skyBg: 'bg-gradient-to-br from-sky-100 via-slate-50 to-blue-100'
    }
  },
  73: {
    label: 'Moderate Snow',
    description: 'Steady snowfall accumulation',
    iconName: 'CloudSnow',
    theme: {
      gradient: 'from-sky-300/30 via-blue-100/40 to-indigo-50/50',
      badgeBg: 'bg-sky-200 text-sky-950 border-sky-300',
      badgeText: 'text-sky-800',
      accentColor: '#0369a1',
      skyBg: 'bg-gradient-to-br from-sky-200/80 via-blue-100 to-indigo-100'
    }
  },
  75: {
    label: 'Heavy Snow',
    description: 'Blizzard-like heavy snowfall',
    iconName: 'Snowflake',
    theme: {
      gradient: 'from-blue-400/30 via-sky-200/50 to-slate-200/50',
      badgeBg: 'bg-blue-200 text-blue-950 border-blue-300',
      badgeText: 'text-blue-900',
      accentColor: '#1e40af',
      skyBg: 'bg-gradient-to-br from-blue-200 via-sky-200 to-slate-300'
    }
  },
  80: {
    label: 'Rain Showers',
    description: 'Passing rain showers',
    iconName: 'CloudRain',
    theme: {
      gradient: 'from-sky-500/20 via-blue-200/30 to-slate-100/50',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
      badgeText: 'text-sky-700',
      accentColor: '#0284c7',
      skyBg: 'bg-gradient-to-br from-sky-100 via-blue-100 to-slate-100'
    }
  },
  81: {
    label: 'Heavy Showers',
    description: 'Intense intermittent rain showers',
    iconName: 'CloudRainWind',
    theme: {
      gradient: 'from-blue-600/20 via-indigo-200/40 to-slate-200/50',
      badgeBg: 'bg-blue-200 text-blue-950 border-blue-300',
      badgeText: 'text-blue-800',
      accentColor: '#1d4ed8',
      skyBg: 'bg-gradient-to-br from-blue-200 via-indigo-100 to-slate-200'
    }
  },
  82: {
    label: 'Violent Showers',
    description: 'Extreme torrential rain downpour',
    iconName: 'CloudRainWind',
    theme: {
      gradient: 'from-purple-600/20 via-slate-400/40 to-blue-300/50',
      badgeBg: 'bg-purple-200 text-purple-950 border-purple-300',
      badgeText: 'text-purple-800',
      accentColor: '#7e22ce',
      skyBg: 'bg-gradient-to-br from-purple-200 via-slate-300 to-blue-200'
    }
  },
  95: {
    label: 'Thunderstorm',
    description: 'Thunderstorm with lightning strikes',
    iconName: 'CloudLightning',
    theme: {
      gradient: 'from-amber-600/20 via-purple-300/30 to-slate-300/50',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      badgeText: 'text-amber-800',
      accentColor: '#d97706',
      skyBg: 'bg-gradient-to-br from-slate-200 via-purple-100 to-amber-100'
    }
  },
  96: {
    label: 'Thunderstorm with Hail',
    description: 'Severe thunderstorm with hail showers',
    iconName: 'Zap',
    theme: {
      gradient: 'from-amber-700/25 via-purple-400/40 to-slate-400/50',
      badgeBg: 'bg-amber-200 text-amber-950 border-amber-300',
      badgeText: 'text-amber-900',
      accentColor: '#b45309',
      skyBg: 'bg-gradient-to-br from-slate-300 via-purple-200 to-amber-200'
    }
  },
  99: {
    label: 'Severe Thunderstorm',
    description: 'Dangerous storm with heavy hail and lightning',
    iconName: 'Zap',
    theme: {
      gradient: 'from-red-600/25 via-purple-500/40 to-slate-400/50',
      badgeBg: 'bg-red-100 text-red-950 border-red-300',
      badgeText: 'text-red-800',
      accentColor: '#dc2626',
      skyBg: 'bg-gradient-to-br from-slate-300 via-red-100 to-purple-200'
    }
  }
};

export function getWeatherCondition(code: number): WeatherConditionInfo {
  return WMO_WEATHER_CODES[code] || {
    label: 'Variable',
    description: 'Mixed weather conditions',
    iconName: 'Cloud',
    theme: {
      gradient: 'from-sky-400/10 via-slate-100/30 to-blue-50/50',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
      badgeText: 'text-slate-600',
      accentColor: '#0284c7',
      skyBg: 'bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50'
    }
  };
}

// Temperature Conversion & Formatting
export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const val = convertTemp(celsius, unit);
  return `${val}°${unit}`;
}

// Wind Conversion & Formatting
export function convertWind(kmh: number, unit: WindUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  if (unit === 'ms') {
    return Math.round((kmh / 3.6) * 10) / 10;
  }
  return Math.round(kmh);
}

export function formatWind(kmh: number, unit: WindUnit): string {
  const val = convertWind(kmh, unit);
  const label = unit === 'kmh' ? 'km/h' : unit === 'mph' ? 'mph' : 'm/s';
  return `${val} ${label}`;
}

export function getWindDirectionLabel(degree: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index] || 'N';
}

// Date/Time Formatters
export function formatDayName(dateStr: string, isTodayOrTomorrow: boolean = true): string {
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;

  if (isTodayOrTomorrow) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Today';
    if (dateStr === tomorrowStr) return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatTime(timeStr: string): string {
  // Handles "2026-07-28T14:00" or ISO format
  const date = new Date(timeStr);
  if (isNaN(date.getTime())) return timeStr;
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatHour(timeStr: string): string {
  const date = new Date(timeStr);
  if (isNaN(date.getTime())) return timeStr;
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}

// UV Index Helper
export function getUVDescription(uv: number): { label: string; color: string; badge: string } {
  if (uv <= 2) return { label: 'Low', color: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-amber-600', badge: 'bg-amber-100 text-amber-800' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-600', badge: 'bg-red-100 text-red-800' };
  return { label: 'Extreme', color: 'text-purple-600', badge: 'bg-purple-100 text-purple-800' };
}

// Smart Activity Recommendation Engine
export function generateActivityRecommendations(
  current: CurrentWeatherData,
  todayDaily?: DailyForecastItem,
  hourlyList?: HourlyForecastItem[]
): ActivityRecommendation[] {
  const temp = current.temperature;
  const precip = current.precipitation || (todayDaily ? todayDaily.precipitationSum : 0);
  const precipProb = todayDaily ? todayDaily.precipitationProbabilityMax : 0;
  const wind = current.windSpeed;
  const uv = todayDaily ? todayDaily.uvIndexMax : 2;
  const code = current.weatherCode;

  const isRainingOrStormy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
  const isSnowing = [71, 73, 75, 77, 85, 86].includes(code);

  const activities: ActivityRecommendation[] = [];

  // 1. Running & Jogging
  let runScore = 80;
  let runTips: string[] = [];
  if (temp >= 10 && temp <= 22) {
    runScore += 15;
    runTips.push('Ideal temperature range for running');
  } else if (temp > 28) {
    runScore -= 30;
    runTips.push('Stay hydrated and run during early morning or evening');
  } else if (temp < 5) {
    runScore -= 20;
    runTips.push('Dress in warm performance layers');
  }

  if (isRainingOrStormy) {
    runScore -= 45;
    runTips.push('Wet surfaces and reduced traction — consider indoor gym');
  } else if (precipProb > 40) {
    runTips.push('Chance of light rain showers during outdoor workout');
  }

  if (wind > 30) {
    runScore -= 15;
    runTips.push('Strong headwind expected on open tracks');
  }

  const runRating: ActivityRating = runScore >= 80 ? 'excellent' : runScore >= 60 ? 'good' : runScore >= 40 ? 'fair' : 'poor';
  activities.push({
    id: 'running',
    title: 'Running & Outdoor Workout',
    iconName: 'Activity',
    rating: runRating,
    score: Math.max(10, Math.min(100, runScore)),
    summary: runRating === 'excellent' 
      ? 'Great conditions for an invigorating outdoor workout!' 
      : runRating === 'good' 
      ? 'Favorable conditions with minor weather considerations.' 
      : 'Sub-optimal outdoor conditions; plan carefully.',
    tips: runTips.length > 0 ? runTips : ['Standard comfortable weather for sports.']
  });

  // 2. Outdoor Dining & Cafes
  let diningScore = 75;
  let diningTips: string[] = [];
  if (temp >= 18 && temp <= 27 && !isRainingOrStormy) {
    diningScore += 20;
    diningTips.push('Comfortable ambient temperature for outdoor seating');
  } else if (temp < 15) {
    diningScore -= 25;
    diningTips.push('Chilly outside; pick a spot with outdoor heaters');
  } else if (temp > 30) {
    diningScore -= 20;
    diningTips.push('Choose shaded patios or air-conditioned dining');
  }

  if (isRainingOrStormy) {
    diningScore -= 60;
    diningTips.push('Rain expected — indoor dining recommended');
  }
  if (wind > 25) {
    diningScore -= 20;
    diningTips.push('Breezy conditions may disturb outdoor tables');
  }

  const diningRating: ActivityRating = diningScore >= 80 ? 'excellent' : diningScore >= 60 ? 'good' : diningScore >= 40 ? 'fair' : 'poor';
  activities.push({
    id: 'dining',
    title: 'Outdoor Dining & Patios',
    iconName: 'Utensils',
    rating: diningRating,
    score: Math.max(10, Math.min(100, diningScore)),
    summary: diningRating === 'excellent' 
      ? 'Perfect weather for patio dining and rooftop cafes!' 
      : diningRating === 'good' 
      ? 'Pleasant outdoors with slight breeze or temp variation.' 
      : 'Indoor dining is recommended today.',
    tips: diningTips.length > 0 ? diningTips : ['Good day for coffee or meals outdoors.']
  });

  // 3. Sightseeing & Walking Tours
  let walkScore = 80;
  let walkTips: string[] = [];
  if (temp >= 15 && temp <= 26 && !isRainingOrStormy) {
    walkScore += 15;
    walkTips.push('Great day for walking tours and exploring parks');
  }
  if (isRainingOrStormy) {
    walkScore -= 45;
    walkTips.push('Bring an umbrella and water-resistant footwear');
  }
  if (uv >= 6) {
    walkTips.push('High UV levels — wear a wide-brim hat & sunglasses');
  }

  const walkRating: ActivityRating = walkScore >= 80 ? 'excellent' : walkScore >= 60 ? 'good' : walkScore >= 40 ? 'fair' : 'poor';
  activities.push({
    id: 'sightseeing',
    title: 'Sightseeing & Walking Tours',
    iconName: 'Compass',
    rating: walkRating,
    score: Math.max(10, Math.min(100, walkScore)),
    summary: walkRating === 'excellent' 
      ? 'Wonderful weather to explore local sights on foot.' 
      : walkRating === 'good' 
      ? 'Good visibility and reasonable temperature for walks.' 
      : 'Check rain forecast before long walking tours.',
    tips: walkTips.length > 0 ? walkTips : ['Comfortable day for city exploration.']
  });

  // 4. Beach & Pool Day
  let beachScore = 50;
  let beachTips: string[] = [];
  if (temp >= 24 && !isRainingOrStormy) {
    beachScore += 35;
    beachTips.push('Warm temperatures ideal for swimming & sunbathing');
  } else if (temp < 20) {
    beachScore -= 35;
    beachTips.push('Too cool for swimming or sunbathing');
  }

  if (isRainingOrStormy || isSnowing) {
    beachScore -= 50;
    beachTips.push('Storm or precipitation disrupts beach trips');
  }
  if (uv >= 6) {
    beachTips.push('Apply SPF 30+ sunscreen every 2 hours');
  }

  const beachRating: ActivityRating = beachScore >= 80 ? 'excellent' : beachScore >= 60 ? 'good' : beachScore >= 40 ? 'fair' : 'poor';
  activities.push({
    id: 'beach',
    title: 'Beach & Swimming',
    iconName: 'Waves',
    rating: beachRating,
    score: Math.max(10, Math.min(100, beachScore)),
    summary: beachRating === 'excellent' 
      ? 'Ideal warm sunny weather for the beach or pool!' 
      : beachRating === 'good' 
      ? 'Fair beach weather; bring a light towel wrap.' 
      : 'Unfavorable temperatures or rain for water activities.',
    tips: beachTips.length > 0 ? beachTips : ['Check water safety flags before swimming.']
  });

  // 5. Hiking & Nature Trails
  let hikeScore = 75;
  let hikeTips: string[] = [];
  if (temp >= 12 && temp <= 24 && !isRainingOrStormy) {
    hikeScore += 20;
    hikeTips.push('Crisp air and clear trail conditions');
  }
  if (isRainingOrStormy) {
    hikeScore -= 50;
    hikeTips.push('Muddy trails and slippery rocks expected');
  }
  if (wind > 35) {
    hikeScore -= 20;
    hikeTips.push('High wind on ridges and exposed summits');
  }

  const hikeRating: ActivityRating = hikeScore >= 80 ? 'excellent' : hikeScore >= 60 ? 'good' : hikeScore >= 40 ? 'fair' : 'poor';
  activities.push({
    id: 'hiking',
    title: 'Hiking & Nature Trails',
    iconName: 'Trees',
    rating: hikeRating,
    score: Math.max(10, Math.min(100, hikeScore)),
    summary: hikeRating === 'excellent' 
      ? 'Outstanding conditions for hiking and outdoor trails.' 
      : hikeRating === 'good' 
      ? 'Moderate trail conditions; wear sturdy boots.' 
      : 'Caution recommended on trails due to weather.',
    tips: hikeTips.length > 0 ? hikeTips : ['Pack sufficient water and trail snacks.']
  });

  return activities;
}

// Smart Travel & Packing Recommendations
export function generatePackingRecommendations(
  current: CurrentWeatherData,
  todayDaily?: DailyForecastItem
): PackingRecommendation[] {
  const temp = current.temperature;
  const precipProb = todayDaily ? todayDaily.precipitationProbabilityMax : 0;
  const precipSum = todayDaily ? todayDaily.precipitationSum : 0;
  const wind = current.windSpeed;
  const uv = todayDaily ? todayDaily.uvIndexMax : 2;
  const code = current.weatherCode;

  const list: PackingRecommendation[] = [];

  // Umbrella / Rainwear
  if (precipProb > 30 || precipSum > 0.5 || [51,53,55,61,63,65,80,81,82,95,96,99].includes(code)) {
    list.push({
      item: 'Umbrella or Raincoat',
      category: 'gear',
      reason: `Precipitation probability is ${precipProb}% with rain expected`,
      iconName: 'Umbrella'
    });
  }

  // Cold gear
  if (temp < 10) {
    list.push({
      item: 'Heavy Coat & Scarf',
      category: 'clothing',
      reason: `Chilly conditions at ${Math.round(temp)}°C`,
      iconName: 'Shirt'
    });
  } else if (temp < 18) {
    list.push({
      item: 'Light Jacket or Sweater',
      category: 'clothing',
      reason: 'Mild temperatures with cool breeze',
      iconName: 'Shirt'
    });
  } else if (temp > 25) {
    list.push({
      item: 'Breathable Cotton / Linen Clothes',
      category: 'clothing',
      reason: `Warm climate around ${Math.round(temp)}°C`,
      iconName: 'Sun'
    });
  }

  // Sun Protection
  if (uv >= 5) {
    list.push({
      item: 'Sunscreen (SPF 30+) & Sunglasses',
      category: 'protection',
      reason: `High UV index level of ${uv}`,
      iconName: 'Glasses'
    });
  }

  // Wind protection
  if (wind > 30) {
    list.push({
      item: 'Windbreaker Jacket',
      category: 'clothing',
      reason: `Gusty wind speeds reaching ${Math.round(wind)} km/h`,
      iconName: 'Wind'
    });
  }

  // Footwear
  if (precipSum > 2 || [63, 65, 71, 73, 75, 81, 82].includes(code)) {
    list.push({
      item: 'Waterproof Shoes or Boots',
      category: 'gear',
      reason: 'Wet pavements or muddy grounds',
      iconName: 'Footprints'
    });
  } else {
    list.push({
      item: 'Comfortable Walking Sneakers',
      category: 'gear',
      reason: 'Dry surface conditions ideal for walking',
      iconName: 'Footprints'
    });
  }

  return list;
}
