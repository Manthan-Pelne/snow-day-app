"use server";

// --- INTERFACES ---

interface GeoResult {
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    snowfall: number[];
    wind_speed_10m: number[];
  };
}

export interface SnowDayResult {
  success: boolean;
  locationName?: string;
  coordinates?: { latitude: number; longitude: number };
  weather?: {
    hourly: Array<{ time: string; temp: string; snowAmount: number; isSnowing: boolean }>;
    daily: Array<{
      date: string;
      snowDayChance: number;
      tempMax: string;
      snowTotal: string;
      precip: string;
      wind: string;
    }>;
  };
  error?: string;
}

// --- FUNCTIONS ---

export async function searchLocations(query: string): Promise<GeoResult[]> {
  if (!query || query.trim().length < 3) return [];
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`;
    const response = await fetch(url, { next: { revalidate: 604800 } });
    const data = await response.json();
    
    return (data.results || []).map((loc: any) => ({
      name: loc.name,
      admin1: loc.admin1,
      country: loc.country,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  } catch (error) {
    return [];
  }
}

export async function getWeatherData(query: string): Promise<SnowDayResult> {
  if (!query || query.length < 3) return { success: false, error: "Query is required" };
  const cleanQuery = query.trim().toLowerCase();

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&language=en&format=json`,
      { next: { revalidate: 604800 } }
    );
    const geoData = await geoRes.json();
    
    if (!geoData.results?.[0]) throw new Error("Location not found");

    const { latitude, longitude, name, admin1 }: GeoResult = geoData.results[0];

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,snowfall,wind_speed_10m&timezone=auto`,
      { next: { revalidate: 900 } }
    );
    const data: WeatherData = await res.json();

    // --- SNOW DAY ALGORITHM ---
    const calculateSnowDayChance = (startIndex: number): number => {
      const commuteHoursSnow = data.hourly.snowfall.slice(startIndex + 4, startIndex + 9);
      const dayTemps = data.hourly.temperature_2m.slice(startIndex, startIndex + 24);

      let score = 0;
      const morningSnow = commuteHoursSnow.reduce((a, b) => a + b, 0);
      const minTemp = Math.min(...dayTemps);

      if (morningSnow > 0.1) score += 30;
      if (morningSnow > 0.5) score += 30;
      if (morningSnow > 1.5) score += 20;
      if (minTemp <= 0 && morningSnow > 0) score += 20;
      if (minTemp < -2) score += 10;

      return Math.min(score, 100);
    };

    const hourly = data.hourly.time.slice(0, 24).map((time, i) => ({
      time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: data.hourly.temperature_2m[i].toFixed(1),
      snowAmount: data.hourly.snowfall[i],
      isSnowing: data.hourly.snowfall[i] > 0,
    }));

    const daily = [];
    for (let i = 0; i < 7; i++) {
      const start = i * 24;
      const dayPrecip = data.hourly.precipitation.slice(start, start + 24);
      const dayWind = data.hourly.wind_speed_10m.slice(start, start + 24);
      
      daily.push({
        date: data.hourly.time[start],
        snowDayChance: calculateSnowDayChance(start),
        tempMax: Math.max(...data.hourly.temperature_2m.slice(start, start + 24)).toFixed(1),
        snowTotal: data.hourly.snowfall.slice(start, start + 24).reduce((a, b) => a + b, 0).toFixed(1),
        precip: dayPrecip.reduce((a, b) => a + b, 0).toFixed(1),
        wind: (dayWind.reduce((a, b) => a + b, 0) / 24).toFixed(1),
      });
    }

    return {
      success: true,
      locationName: `${name}, ${admin1 || ""}`,
      coordinates: { latitude, longitude },
      weather: { hourly, daily }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}