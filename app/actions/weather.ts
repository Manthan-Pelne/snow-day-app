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
    //console.log(latitude,longitude)

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,snowfall,wind_speed_10m&timezone=auto`,
      { next: { revalidate: 900 } }
    );
  const data: WeatherData = await res.json();

  // --- 1. DEFINE THE ALGORITHM INSIDE THE SCOPE ---
  const calculateSnowDayChance = (startIndex: number): number => {
    // We look at commute hours: 4am to 9am
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

  // --- 2. FIND MIDNIGHT OFFSET ---
  const now = new Date();
  const todayMidnightStr = new Date(now.setHours(0, 0, 0, 0)).toISOString().split('T')[0];
  let midnightIndex = data.hourly.time.findIndex(t => t.startsWith(todayMidnightStr));
  if (midnightIndex === -1) midnightIndex = 0; 

  // --- 3. MAP HOURLY DATA (Today only) ---
  const hourly = data.hourly.time
    .slice(midnightIndex, midnightIndex + 24)
    .map((time, i) => {
      const globalIndex = midnightIndex + i;
      return {
        time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temp: data.hourly.temperature_2m[globalIndex].toFixed(1),
        snowAmount: data.hourly.snowfall[globalIndex],
        isSnowing: data.hourly.snowfall[globalIndex] > 0,
      };
    });

  // --- 4. MAP DAILY DATA (7 Days starting from Midnight) ---
  const daily = [];
  for (let i = 0; i < 7; i++) {
    const start = midnightIndex + (i * 24);
    if (start + 23 >= data.hourly.time.length) break;

    daily.push({
      date: data.hourly.time[start],
      snowDayChance: calculateSnowDayChance(start), // Now it's defined!
      tempMax: Math.max(...data.hourly.temperature_2m.slice(start, start + 24)).toFixed(1),
      snowTotal: data.hourly.snowfall.slice(start, start + 24).reduce((a, b) => a + b, 0).toFixed(1),
      precip: data.hourly.precipitation.slice(start, start + 24).reduce((a, b) => a + b, 0).toFixed(1),
      wind: (data.hourly.wind_speed_10m.slice(start, start + 24).reduce((a, b) => a + b, 0) / 24).toFixed(1),
    });
  }

  return {
    success: true,
    locationName: `${name}, ${admin1 || ""}`,
    weather: { hourly, daily }
  };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}