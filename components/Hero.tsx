"use client";
import { getWeatherData, searchLocations } from "@/app/actions/weather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Snowflake, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";
// import "pattern.css";
import Image from "next/image";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [lockSuggestions, setLockSuggestions] = useState(false);

  useEffect(() => {
    // 1. Guard: Don't fetch if query is too short or if we just selected a city
    if (query.length < 3 || lockSuggestions) {
      setIsTyping(false);
      if (!lockSuggestions) setSuggestions([]);
      setLockSuggestions(false); // Reset lock for next manual type
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
    <section className="max-w-screen-2xl mx-auto ">
      <div className=" max-w-7xl m-auto overflow-hidden  rounded-[35px] shadow-xl  p-12 mt-12 dark:border-4 dark:border-[#070750] bg-linear-to-l from-white via-[#f0faff] to-white">
        <div className=" mb-20 flex flex-col md:flex-row justify-between gap-10 ">
          <div className="relative z-50">
            <div className="absolute top-30 -z-1 right-1/2 opacity-50">
              <div className="relative flex  items-center justify-center rounded-xl">
                <div className="absolute h-24 w-24 opacity-70 rounded-full  border border-[gray]"></div>
                <div className="absolute h-44 w-44 rounded-full opacity-80 border  border-[gray]"></div>
                <div className="absolute h-64 w-64 opacity-95 rounded-full border border-[gray]"></div>
              </div>
            </div>
            <h1 className="text-[100px] z-50 font-extrabold  text-[#141452] drop-shadow-xl dark:text-blue-200">
              Snow Day
            </h1>
            <div className="flex  justify-between gap-3 items-center">
              <p className="text-black/60 shadow-lg w-1/2 bg-[blue]/5 border border-[#bdc0c5] m-auto mr-8 p-4  rounded-lg backdrop-blur-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                laudantium consequatur vero consectetur, est tempora placeat ad
                maiores voluptates perferendis?
              </p>
              <span className=" border-dashed border-white text-[100px] font-extrabold drop-shadow-xl  text-[#141452]">
                Predictor
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="/snow.png"
              className="w-50 m-auto drop-shadow-2xl"
              alt=""
            />
          </div>
        </div>

        <div className="max-w-6xl tracking-wider mx-auto">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex gap-2 mb-1 w-[600px] mx-auto bg-[gray]/10 shadow border border-[#d2d2ef] rounded-xl py-2 px-2"
          >
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter city or Zip Code (50112)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1  placeholder:text-black/60 text-black backdrop-blur-2xl  rounded-md h-14 outline-none  transition-all"
              />
              {isTyping && (
                <div className="absolute right-3 top-4">
                  <Loader2 className="w-5 h-5 animate-spin text-black/40" />
                </div>
              )}
            </div>
            <Button className="bg-[#26266e] h-14 text-white w-[120px] text-lg cursor-pointer border-[8px] border-[#1a1a66] hover:bg-[#2b2b92]  rounded-lg font-bold transition-all">
              {loading ? (
                <Loader2 className="w-5 animate-spin" />
              ) : (
                <>
                  <span className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                      viewBox="0 0 48 48"
                    >
                      <defs>
                        <mask id="SVG2D5J8dbD">
                          <g fill="none" strokeLinejoin="round" strokeWidth="4">
                            <path
                              fill="#fff"
                              stroke="#fff"
                              d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"
                            />
                            <path
                              stroke="#000"
                              strokeLinecap="round"
                              d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343"
                            />
                            <path
                              stroke="#fff"
                              strokeLinecap="round"
                              d="m33.222 33.222l8.485 8.485"
                            />
                          </g>
                        </mask>
                      </defs>
                      <path
                        fill="currentColor"
                        d="M0 0h48v48H0z"
                        mask="url(#SVG2D5J8dbD)"
                      />
                    </svg>
                    Search
                  </span>
                </>
              )}
            </Button>
          </form>

          {/* DEBOUNCED SUGGESTIONS DROPDOWN */}
          {suggestions.length > 0 && (
            <div className=" w-[600px] m-auto mt-2 bg-blue-900/10 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden z-[100] shadow-md">
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
                  className="w-full cursor-pointer flex items-center gap-3 p-4 text-left text-black hover:bg-blue-200/50 transition-colors border-b border-white/10 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="font-bold">{loc.name}</p>
                    <p className="text-xs text-black/50">
                      {loc.admin1}, {loc.country}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {weather && (
            <div className="space-y-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-3xl text-black/80 font-light text-center">
                Weather in{" "}
                <span className="font-bold italic underline underline-offset-7">
                  {locationName}
                </span>
              </h1>

              {/* HOURLY SECTION */}
              <section>
                <h3 className="text-sm border border-black w-max rounded-lg  text-black p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                  Hourly (Next 24h)
                </h3>
                <div
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                  className="flex gap-3  overflow-x-auto pb-6 scrollbar-hide no-scrollbar"
                >
                  {weather.hourly.map((h, i) => (
                    <div
                      key={i}
                      className="min-w-25 shadow-md bg-[blue]/5 border border-white/20 rounded-xl p-4 text-center backdrop-blur-md flex flex-col items-center gap-2"
                    >
                      <p className="text-xs text-black font-semibold opacity-70">
                        {h.time}
                      </p>

                      {/* Weather Icon & Snow Amount */}
                      <div className="flex flex-col items-center">
                        <span className="text-2xl">
                          {h.isSnowing ? (
                            <>
                              <Snowflake className="text-blue-400 my-1" />
                            </>
                          ) : (
                            <>
                              <Sun className="my-1 text-orange-400" />
                            </>
                          )}
                        </span>

                        {h.isSnowing ? (
                          <>
                            <span className="text-sm text-blue-500 font-bold leading-none mt-2">
                              {h.snowAmount} cm
                            </span>
                          </>
                        ) : (
                          <>
                            {/* Temperature */}
                            <p className="text-xl font-black text-black">
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
                <h3 className="text-sm rounded-lg font-bold uppercase tracking-widest border border-black w-max  p-2 text-black mb-4 ml-2">
                  7-Day Forecast
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* Row 1: Snow Chance */}
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                    {weather.daily.map((d, i) => (
                      <div
                        key={i}
                        className="bg-[blue]/5 rounded-2xl shadow-md p-4 text-center"
                      >
                        <p className="text-[10px] font-black text-black opacity-60 uppercase mb-1">
                          {new Date(d.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <p className="text-xl flex items-center justify-center gap-2 text-black font-bold">
                          {d.snowChance}%{" "}
                          <Snowflake className="text-blue-400 text-sm" />
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Row 2: Detailed Data */}
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-black">
                    {weather.daily.map((d, i) => (
                      <div
                        key={i}
                        className="bg-[blue]/5 border shadow-md border-white/30 rounded-2xl p-4 text-[11px] space-y-3"
                      >
                        <div>
                          <p className="opacity-40 uppercase">Max Temp</p>
                          <p className="font-bold text-sm">{d.tempMax}°C</p>
                        </div>
                        <div className="h-px bg-black/10" />
                        <div>
                          <p className="opacity-40 uppercase">Precip</p>
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
      </div>
    </section>
  );
};

export default LandingPage;
