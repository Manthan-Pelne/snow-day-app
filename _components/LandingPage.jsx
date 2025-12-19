"use client";
import React, { useEffect, useState } from "react";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results) {
        alert("Location not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, admin1 } = geoData.results[0];
      setLocationName(`${name}${admin1 ? ", " + admin1 : ""}`);

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,snowfall,wind_speed_10m&timezone=auto`
      );
      const data = await res.json();

      // 1. Process HOURLY data (Next 24 hours only)
      const hourlyData = data.hourly.time.slice(0, 24).map((time, i) => ({
        time: new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: data.hourly.temperature_2m[i].toFixed(1),
        snowAmount: data.hourly.snowfall[i], // Getting the actual amount
        isSnowing: data.hourly.snowfall[i] > 0,
      }));

      // 2. Process DAILY data (7 Days)
      const dailyData = [];
      for (let i = 0; i < 7; i++) {
        const start = i * 24;
        const daySnow = data.hourly.snowfall.slice(start, start + 24);
        const dayTemp = data.hourly.temperature_2m.slice(start, start + 24);
        const snowChance = Math.round(
          (daySnow.filter((v) => v > 0).length / 24) * 100
        );

        dailyData.push({
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

      setWeather({ hourly: hourlyData, daily: dailyData });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-screen-2xl mx-auto h-screen">

      <div className=" max-w-7xl m-auto  rounded-xl shadow-lg  p-12 mt-12 bg-linear-to-tl from-black via-[#050550] to-black">
                
                  <div className='text-center mb-10'>
                    <h1 className="text-6xl font-extrabold mb-5 text-white">Snow Day Predictor</h1>
                    <p className="text-white/40 w-1/2 m-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex laudantium consequatur vero consectetur, est tempora placeat ad maiores voluptates perferendis?</p>
                  </div>
         
        <div className="max-w-6xl tracking-wider mx-auto">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex gap-2 mb-1 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Enter city or Zip Code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-[gray]/20 placeholder:text-white/60 text-white backdrop-blur-2xl border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
            />
            <button className="bg-[#111177] text-white cursor-pointer hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all">
              {loading ? "..." : "Search"}
            </button>
          </form>

          {weather && (
            <div className="space-y-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-3xl text-white font-light text-center">
                Weather in{" "}
                <span className="font-bold italic underline underline-offset-7">
                  {locationName}
                </span>
              </h1>

              {/* HOURLY SECTION */}
              <section>
                <h3 className="text-sm border w-max  text-white p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                  Hourly (Next 24h)
                </h3>
                <div
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  className="flex gap-3  overflow-x-auto pb-6 scrollbar-hide no-scrollbar"
                >
                  {weather.hourly.map((h, i) => (
                    <div
                      key={i}
                      className="min-w-[100px] bg-white/20 border border-white/20 rounded-xl p-4 text-center backdrop-blur-md flex flex-col items-center gap-2"
                    >
                      <p className="text-xs text-white font-semibold opacity-70">
                        {h.time}
                      </p>

                      {/* Weather Icon & Snow Amount */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl">
                          {h.isSnowing ? "❄️" : "☀️"}
                        </span>

                        {h.isSnowing ? (
                          <>
                            <span className="text-sm text-blue-300 font-bold leading-none mt-2">
                              {h.snowAmount} cm
                            </span>
                          </>
                        ) : (
                          <>
                            {/* Temperature */}
                            <p className="text-xl font-black text-white">
                              {h.temp}°
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7-DAY SECTION */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest border w-max  p-2 text-white border-white mb-4 ml-2">
                  7-Day Forecast
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* Row 1: Snow Chance */}
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                    {weather.daily.map((d, i) => (
                      <div
                        key={i}
                        className="bg-white/20 rounded-2xl p-4 text-center"
                      >
                        <p className="text-[10px] font-black text-white opacity-60 uppercase mb-1">
                          {new Date(d.date).toLocaleDateString([], {
                            weekday: "short",
                          })}
                        </p>
                        <p className="text-xl text-white font-bold">
                          {d.snowChance}% ❄️
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Row 2: Detailed Data */}
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-white">
                    {weather.daily.map((d, i) => (
                      <div
                        key={i}
                        className="bg-white/25 border border-white/10 rounded-2xl p-4 text-[11px] space-y-3"
                      >
                        <div>
                          <p className="opacity-40 uppercase">Max Temp</p>
                          <p className="font-bold text-sm">{d.tempMax}°C</p>
                        </div>
                        <div className="h-[1px] bg-white/10" />
                        <div>
                          <p className="opacity-40 uppercase">Precip</p>
                          <p className="font-bold text-sm">{d.precip} mm</p>
                        </div>
                        <div className="h-[1px] bg-white/10" />
                        <div>
                          <p className="opacity-40 uppercase">Wind Avg</p>
                          <p className="font-bold text-sm">{d.wind} km/h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
