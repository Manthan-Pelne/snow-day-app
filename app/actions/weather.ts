// app/actions/weather.js
"use server";

//lighweight fuction for fetching location suggestions for debouncing
export async function searchLocations(query) {
  if (!query || query.trim().length < 3) return [];

// This log ALWAYS runs because the Server Action is called
  console.log(`\n🔍 Checking for: "${query}"`);
  const startTime = Date.now();

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`;
    
    const response = await fetch(url, {
      next: { revalidate: 604800 }, // Cache coordinates for 7 days
    });

 // --- THE LOGIC ---
    // 1. If duration < 20ms: It's 100% CACHE. No internet is that fast.
    // 2. If duration > 100ms: It's 100% API HIT.
    
    const data = await response.json();
    const duration = Date.now() - startTime;
    
    if (duration < 20) {
      console.log(`✅ CACHE HIT: Returned in ${duration}ms (No API call made)`);
    } else {
      console.log(`🌐 API HIT: Fetched from Open-Meteo in ${duration}ms`);
    }

    
    // Return only what the UI needs for the suggestion dropdown
    return (data.results || []).map((loc) => ({
      name: loc.name,
      admin1: loc.admin1,
      country: loc.country,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  } catch (error) {
    console.error("Geocoding Error:", error);
    return [];
  }
}



export async function getWeatherData(query) {
  if (!query || query.length < 3) return { error: "Query is required" };
 const cleanQuery = query.trim().toLowerCase();
  try {
    // 1. Geocoding
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&language=en&format=json`,{
        next: {revalidate: 604800} //caching location coordinates for next 7 days
      }
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude, name, admin1 } = geoData.results[0];
    const locationName = `${name}${admin1 ? ", " + admin1 : ""}`;

    // 2. Weather Forecast
   const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,snowfall,wind_speed_10m&timezone=auto`,
      { 
        next: { 
          revalidate: 900, // Cache weather for 15 minutes
          tags: [`weather-${cleanQuery}`] 
        } 
      }
    );

    const data = await res.json();

    // 3. Process HOURLY data (Next 24 hours)
    const hourly = data.hourly.time.slice(0, 24).map((time, i) => ({
      time: new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: data.hourly.temperature_2m[i].toFixed(1),
      snowAmount: data.hourly.snowfall[i],
      isSnowing: data.hourly.snowfall[i] > 0,
    }));

    // 4. Process DAILY data (7 Days)
    const daily = [];
    for (let i = 0; i < 7; i++) {
      const start = i * 24;
      const daySnow = data.hourly.snowfall.slice(start, start + 24);
      const dayTemp = data.hourly.temperature_2m.slice(start, start + 24);
      const snowChance = Math.round(
        (daySnow.filter((v) => v > 0).length / 24) * 100
      );

      daily.push({
        date: data.hourly.time[start],
        snowChance,
        tempMax: Math.max(...dayTemp).toFixed(1),
        precip: data.hourly.precipitation
          .slice(start, start + 24)
          .reduce((a, b) => a + b, 0)
          .toFixed(1),
        wind: (
          data.hourly.wind_speed_10m
            .slice(start, start + 24)
            .reduce((a, b) => a + b, 0) / 24
        ).toFixed(1),
      });
    }

    return { 
      success: true, 
      locationName, 
      weather: { hourly, daily } 
    };

  } catch (error) {
    return { success: false, error: error.message };
  }
}