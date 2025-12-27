"use client";

import { getWeatherData, searchLocations } from "@/app/actions/weather"; // Import the type we made earlier
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Snowflake, Sun } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";
import "pattern.css";
import { SnowDayResult } from "@/app/actions/weather";
import { SparkleParticles } from "./lightswind/sparkle-particles";

// --- HELPERS ---

const getGaugeColor = (chance: number): string => {
  if (chance > 70) return "text-red-500 stroke-red-500";
  if (chance > 40) return "text-orange-500 stroke-orange-500";
  return "text-blue-500 stroke-blue-500";
};

const getStatusMessage = (chance: number): string => {
  if (chance >= 80) return "🚨 100% Certified Pajama Day!";
  if (chance >= 60) return "❄️ High Probability. Get the sleds out.";
  if (chance >= 40) return "⚠️ Toss-up. Keep an eye on the news.";
  if (chance >= 20) return "🕒 Delay possible. Set an early alarm.";
  if (chance > 0) return "🌨️ Seeing flakes, but school is likely on.";
  return "☀️ Clear skies. See you in class!";
};

const Search: React.FC = () => {
  // --- STATE ---
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<SnowDayResult["weather"] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // You can replace any with GeoResult interface
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lockSuggestions, setLockSuggestions] = useState<boolean>(false);

  // --- EFFECTS ---
  useEffect(() => {
    if (query.length < 3 || lockSuggestions) {
      setIsTyping(false);
      if (!lockSuggestions) setSuggestions([]);
      setLockSuggestions(false);
      return;
    }

    setIsTyping(true);
    const delayDebounceFn = setTimeout(async () => {
      const result = await searchLocations(query);
      setSuggestions(result || []);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // --- HANDLERS ---
  const handleSearch = async (e: FormEvent | null, manualCity: string | null = null) => {
    if (e) e.preventDefault();
    const targetCity = manualCity || query;
    if (!targetCity) return;

    setLoading(true);
    setSuggestions([]); 

    const result: SnowDayResult = await getWeatherData(targetCity);

    if (result.success && result.weather) {
      setWeather(result.weather);
      setLocationName(result.locationName || "");
    } else {
      alert(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (

      <div className="">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter city or zip code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 placeholder:text-black/60 font-semibold dark:placeholder:text-[#938f8f] bg-white text-black backdrop-blur-2xl rounded-md h-14 outline-none"
            /> 
            {isTyping && (
              <div className="absolute right-3 top-4">
                <Loader2 className="w-5 h-5 animate-spin text-black/40" />
              </div>
            )}
          </div>
          <Button type="submit" className="bg-[#26266e] z-50 h-14 text-white w-[120px] text-lg cursor-pointer border-[8px] border-[#1a1a66] hover:bg-[#2b2b92] rounded-lg font-bold">
            {loading ? <Loader2 className="w-5 animate-spin" /> : "Search"}
          </Button>
        </form>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="w-[600px] m-auto mt-2 bg-blue-900/10 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden z-[100] shadow-md">
            {suggestions.map((loc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setLockSuggestions(true);
                  setQuery(loc.name);
                  setSuggestions([]);
                  handleSearch(null, loc.name);
                }}
                className="w-full cursor-pointer flex items-center gap-3 p-4 text-left text-black hover:bg-blue-200/50 border-b border-white/10 last:border-0"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="font-bold">{loc.name}</p>
                  <p className="text-xs text-black/50">{loc.admin1}, {loc.country}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {weather && (
          <div className="space-y-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
            {/* Gauge */}
            <div className=" shadow-xl  bg-white/50 p-8 rounded-[30px] border border-blue-100 shadow-inner">
               <h1 className="text-3xl text-black/80 font-light text-center mb-5">
              Weather in <span className="font-bold italic underline underline-offset-7">{locationName}</span>
            </h1>
             <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-blue-100 stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                  <circle
                    className={`${getGaugeColor(weather.daily[0].snowDayChance)} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * weather.daily[0].snowDayChance) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">{weather.daily[0].snowDayChance}%</span>
                  <span className="text-[10px] uppercase font-bold opacity-50">Chance</span>
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="font-bold text-lg text-[#141452] mb-2">
                  {getStatusMessage(weather.daily[0].snowDayChance)}
                </p>
                <h2 className="text-4xl font-black text-[#141452]">
                  {weather.daily[0].snowDayChance > 50 ? "Grab the pajamas!" : "Keep the backpack ready."}
                </h2>
              </div>
              </div>
            </div>

            {/* Hourly */}
            <section>
              <h3 className="text-sm border border-black w-max rounded-lg text-black p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                Hourly (Next 24h)
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
                {weather.hourly.map((h, i) => (
                  <div key={i} className="min-w-25 shadow-md bg-[blue]/5 border border-white/20 rounded-xl p-4 text-center backdrop-blur-md flex flex-col items-center gap-2">
                    <p className="text-xs text-black font-semibold opacity-70">{h.time}</p>
                    <div className="flex flex-col items-center">
                      {h.isSnowing ? <Snowflake className="text-blue-400 my-1" /> : <Sun className="my-1 text-orange-400" />}
                      {h.isSnowing ? (
                        <span className="text-sm text-blue-500 font-bold mt-2">{h.snowAmount} cm</span>
                      ) : (
                        <p className="text-xl font-black text-black">{h.temp}°</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7-Day Forecast */}
            <section>
              <h3 className="text-sm rounded-lg font-bold uppercase tracking-widest border border-black w-max p-2 text-black mb-4 ml-2">
                7-Day Forecast
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                  {weather.daily.map((d, i) => (
                    <div key={i} className="bg-[blue]/5 rounded-2xl shadow-md p-4 text-center">
                      <p className="text-[10px] font-black text-black opacity-60 uppercase mb-1">
                        {new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="text-xl flex items-center justify-center gap-2 text-black font-bold">
                        {d.snowDayChance}% <Snowflake className="text-blue-400 text-sm" />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-black">
                  {weather.daily.map((d, i) => (
                    <div key={i} className="bg-[blue]/5 border shadow-md border-white/30 rounded-2xl p-4 text-[11px] space-y-3">
                      <div>
                        <p className="opacity-40 uppercase">Max Temp</p>
                        <p className="font-bold text-sm">{d.tempMax}°C</p>
                      </div>
                      <div className="h-px bg-black/10" />
                      <div>
                        <p className="opacity-40 uppercase">Precipitation</p>
                        <p className="font-bold text-sm">{d.precip} mm</p>
                      </div>
                      <div className="h-px bg-black/10" />
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

  );
};

export default Search;