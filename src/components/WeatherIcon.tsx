import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Zap,
  Snowflake,
  Umbrella,
  Activity,
  Utensils,
  Compass,
  Waves,
  Trees,
  Glasses,
  Wind,
  Footprints,
  Shirt,
  Droplets,
  Eye,
  Sunrise,
  Sunset,
  Gauge,
  Thermometer,
  Navigation,
  Search,
  MapPin,
  RefreshCw,
  AlertCircle,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Clock,
  Calendar,
  CloudRainWind,
  Map,
  CheckCircle2,
  LucideProps
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun': return <Sun {...props} />;
    case 'SunMedium': return <SunMedium {...props} />;
    case 'CloudSun': return <CloudSun {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    case 'CloudFog': return <CloudFog {...props} />;
    case 'CloudDrizzle': return <CloudDrizzle {...props} />;
    case 'CloudRain': return <CloudRain {...props} />;
    case 'CloudSnow': return <CloudSnow {...props} />;
    case 'CloudLightning': return <CloudLightning {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Snowflake': return <Snowflake {...props} />;
    case 'CloudRainWind': return <CloudRainWind {...props} />;
    case 'Umbrella': return <Umbrella {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Utensils': return <Utensils {...props} />;
    case 'Compass': return <Compass {...props} />;
    case 'Waves': return <Waves {...props} />;
    case 'Trees': return <Trees {...props} />;
    case 'Glasses': return <Glasses {...props} />;
    case 'Wind': return <Wind {...props} />;
    case 'Footprints': return <Footprints {...props} />;
    case 'Shirt': return <Shirt {...props} />;
    case 'Droplets': return <Droplets {...props} />;
    case 'Eye': return <Eye {...props} />;
    case 'Sunrise': return <Sunrise {...props} />;
    case 'Sunset': return <Sunset {...props} />;
    case 'Gauge': return <Gauge {...props} />;
    case 'Thermometer': return <Thermometer {...props} />;
    case 'Navigation': return <Navigation {...props} />;
    case 'Search': return <Search {...props} />;
    case 'MapPin': return <MapPin {...props} />;
    case 'RefreshCw': return <RefreshCw {...props} />;
    case 'AlertCircle': return <AlertCircle {...props} />;
    case 'X': return <X {...props} />;
    case 'ChevronRight': return <ChevronRight {...props} />;
    case 'ChevronDown': return <ChevronDown {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    case 'Map': return <Map {...props} />;
    case 'CheckCircle2': return <CheckCircle2 {...props} />;
    default: return <Cloud {...props} />;
  }
};
