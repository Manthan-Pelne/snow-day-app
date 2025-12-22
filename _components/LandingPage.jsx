"use client";
import { getWeatherData, searchLocations } from "@/actions/weather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin } from "lucide-react";
import React, { useState, useEffect} from "react";

const LandingPage = () => {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [suggestions, setSuggestions] = useState([])
  const [isTyping, setIsTyping] = useState(false);

const [lockSuggestions, setLockSuggestions] = useState(false);

  useEffect(() => {
    // 1. Guard: Don't fetch if query is too short or if we just selected a city
    if (query.length < 3 || lockSuggestions) {
      setIsTyping(false)
      if (!lockSuggestions) setSuggestions([]);
      setLockSuggestions(false); // Reset lock for next manual type
      return;
    }

    setIsTyping(true)
    const delayDebounceFn = setTimeout(async()=>{
      const result = await searchLocations(query)
      setSuggestions(result || [])
      setIsTyping(false)
    }, 500)

    return()=> clearTimeout(delayDebounceFn)
  }, [query])


const handleSearch = async (e, manualCity = null) => {
    if (e) e.preventDefault();
    const targetCity = manualCity || query;
    if (!targetCity) return;

    setLoading(true);
    setSuggestions([]); // Clear suggestions on search
    
    const result = await getWeatherData(targetCity);

    if (result.success) {
      setWeather(result.weather);
      setLocationName(result.locationName);
    } else {
      alert(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-screen-2xl mx-auto h-screen">
      <div className=" max-w-7xl m-auto overflow-hidden  rounded-[35px] shadow-xl  p-12 mt-12 dark:border-4 dark:border-[#070750] bg-linear-to-tl from-black via-[#050550] to-black">
        <div className=" mb-20 flex flex-col md:flex-row justify-between gap-10 ">
          <div className="relative z-50">
            <div className="absolute top-30 -z-1 right-1/2 opacity-50">
              <div className="relative flex  items-center justify-center rounded-xl">
                <div className="absolute h-24 w-24 opacity-70 rounded-full  border border-white"></div>
                <div className="absolute h-44 w-44 rounded-full opacity-80 border  border-white"></div>
                <div className="absolute h-64 w-64 opacity-95 rounded-full border border-white"></div>
              </div>
            </div>
            <h1 className="text-[100px] z-50 font-extrabold  text-white dark:text-blue-200">
              Snow Day
            </h1>
            <div className="flex  justify-between items-center gap-3">
              <p className="text-white/60 w-1/2 bg-white/10 m-auto mr-8 p-4 border border-white/20 rounded-lg backdrop-blur-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                laudantium consequatur vero consectetur, est tempora placeat ad
                maiores voluptates perferendis?
              </p>
              <span className=" border-dashed border-white text-[100px] font-extrabold  text-white">
                Predictor
              </span>
            </div>
          </div>
          <div className="w-1/2">
          <img src="/snoww.png" className="w-50 m-auto" alt="" />
          </div>
        </div>

        <div className="max-w-6xl tracking-wider mx-auto">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex gap-2 mb-1 w-[600px] mx-auto"
          >
           <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter city or Zip Code..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-gray-500/20 placeholder:text-white/60 text-white backdrop-blur-2xl border border-white/20 rounded-md h-14 outline-none focus:border-blue-500 transition-all"
                />
                {isTyping && (
                  <div className="absolute right-3 top-4">
                    <Loader2 className="w-5 h-5 animate-spin text-white/40" />
                  </div>
                )}
              </div>
            <Button className="bg-blue-700 h-14 w-[150px] text-white text-lg cursor-pointer border-[8px] border-blue-800 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold transition-all">
              {loading ? <Loader2 className="w-5 animate-spin"/> : "Search"}
            </Button>
          </form>

          {/* DEBOUNCED SUGGESTIONS DROPDOWN */}
       {suggestions.length > 0 && (
              <div className=" w-[600px] m-auto mt-2 bg-blue-900/10 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden z-[100] shadow-2xl">
                {suggestions.map((loc, i) => (
                  <button
                    key={i}
                    type="button" // Important: prevents form submission
                    onClick={() => {
                      setLockSuggestions(true); // LOCK: Prevent useEffect from firing
                      setQuery(loc.name);
                      setSuggestions([]);
                      handleSearch(null, loc.name); 
                    }}
                    className="w-full cursor-pointer flex items-center gap-3 p-4 text-left text-white hover:bg-blue-600/50 transition-colors border-b border-white/10 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-bold">{loc.name}</p>
                      <p className="text-xs text-white/50">{loc.admin1}, {loc.country}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          

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
                <h3 className="text-sm border w-max rounded-lg  text-white p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                  Hourly (Next 24h)
                </h3>
                <div
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  className="flex gap-3  overflow-x-auto pb-6 scrollbar-hide no-scrollbar"
                >
                  {weather.hourly.map((h, i) => (
                    <div
                      key={i}
                      className="min-w-25 bg-white/20 border border-white/20 rounded-xl p-4 text-center backdrop-blur-md flex flex-col items-center gap-2"
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
                <h3 className="text-sm rounded-lg font-bold uppercase tracking-widest border w-max  p-2 text-white border-white mb-4 ml-2">
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
                        <div className="h-px bg-white/10" />
                        <div>
                          <p className="opacity-40 uppercase">Precip</p>
                          <p className="font-bold text-sm">{d.precip} mm</p>
                        </div>
                        <div className="h-px bg-white/10" />
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
