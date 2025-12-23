"use client";
import { getWeatherData, searchLocations } from "@/actions/weather";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Snowflake, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";

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
              src="/snoww.png"
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
                          <g
                            fill="none"
                            strokeLinejoin="round"
                            strokeWidth="4"
                          >
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
                          {h.isSnowing ? <>
                            <Snowflake className="text-blue-400 my-1"/>
                          </> : <>
                          <Sun className="my-1 text-orange-400"/>
                          </>}
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
                          {d.snowChance}%  <Snowflake className="text-blue-400 text-sm"/>
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

      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-5xl text-center mb-2 font-extrabold text-[#141452]">
          Calculator Features
        </h1>
        <p className="w-2/3 m-auto text-center font-semibold text-[#8c8989]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
          nesciunt quae fugit laudantium magnam est? Tenetur excepturi harum
          molestias sunt. Ratione, laborum!
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6">

          <div className="group max-w-sm p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors duration-300 bg-blue-50 rounded-xl group-hover:bg-blue-600">
              <svg
                className="w-10 transition-colors duration-300 fill-blue-600 group-hover:fill-white"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M52,60h-2.67l3.64-12.73c.09-.3,.03-.63-.16-.88s-.48-.4-.8-.4h-18.47c-2.05-1.93-4.71-3-7.53-3h-2v-.63l.97-.42c1.82-.78,3-2.56,3.03-4.54l1.4-.28c.93-.19,1.61-1.01,1.61-1.96v-.18c1.65,0,3-1.35,3-3s-1.35-3-3-3c-.14,0-.28,.01-.42,.03-1.3-4.63-5.55-8.03-10.58-8.03s-9.28,3.41-10.58,8.03c-.14-.02-.28-.03-.42-.03-1.65,0-3,1.35-3,3s1.35,3,3,3c0,1.1,.9,2,2,2h1v.36c0,2,1.19,3.81,3.03,4.6l.97,.42v.63h-2c-6.07,0-11,4.93-11,11v6h-1v2H52v-2ZM31,31c.55,0,1,.45,1,1s-.45,1-1,1v-1c0-.33-.02-.66-.05-.99,.02,0,.03,0,.05,0Zm-22,1v1c-.55,0-1-.45-1-1s.45-1,1-1c.02,0,.03,0,.05,0-.03,.33-.05,.66-.05,.99Zm3,0v3h-1v-3c0-4.96,4.04-9,9-9s9,4.04,9,9v3.18l-1,.2v-3.38c0-3.86-3.14-7-7-7h-2c-3.86,0-7,3.14-7,7Zm11.99-3.98c-2.33,.1-3.57,1.23-4.67,2.24-1.05,.97-1.88,1.74-3.66,1.74-.61,0-1.14-.09-1.63-.28,.15-2.62,2.31-4.72,4.97-4.72h2c1.13,0,2.16,.39,2.99,1.02Zm-8.18,12.1c-1.1-.47-1.82-1.56-1.82-2.76v-3.56c.52,.13,1.07,.2,1.66,.2,2.56,0,3.87-1.2,5.02-2.27,1.05-.97,1.88-1.73,3.65-1.73,.49,0,.91,.08,1.32,.2,.22,.56,.35,1.16,.35,1.8v3.78l-6.2,1.24,.39,1.96,5.77-1.15c-.16,1.01-.82,1.88-1.78,2.29l-3,1.29c-.75,.32-1.61,.32-2.36,0l-3-1.29Zm6.18,3.11v.77c0,1.1-.9,2-2,2s-2-.9-2-2v-.77h.03c.63,.28,1.3,.41,1.97,.41s1.34-.13,1.97-.4h.03Zm-4,16.76h-2v-2h1c.55,0,1,.45,1,1v1Zm2,0v-1c0-1.65-1.35-3-3-3h-6v-2.59l1.71-1.71-1.41-1.41-2,2c-.19,.19-.29,.44-.29,.71v4c0,.55,.45,1,1,1h4v2H5v-6c0-4.96,4.04-9,9-9h2.13c.45,1.72,2.01,3,3.87,3s3.43-1.28,3.87-3h2.13c1.45,0,2.85,.35,4.11,1h-.11c-.45,0-.84,.3-.96,.73l-3.79,13.27h-5.25Zm7.33,0l3.43-12h19.92l-3.43,12H27.33Z" />
                <path d="M39,53v2c.55,0,1-.45,1-1s-.45-1-1-1Z" />
                <path d="M48,2c-7.72,0-14,6.28-14,14,0,6.53,4.43,12.13,10.77,13.62l.46-1.95c-5.11-1.2-8.77-5.52-9.19-10.68h2.01c.38,3.82,2.94,7.13,6.61,8.42l.66-1.89c-2.87-1.01-4.88-3.57-5.25-6.54h2.02c.26,1.5,1.07,2.87,2.3,3.8l1.2-1.6c-1-.75-1.6-1.95-1.6-3.2,0-2.21,1.79-4,4-4s4,1.79,4,4c0,1.25-.6,2.45-1.6,3.2l1.2,1.6c1.23-.93,2.05-2.3,2.3-3.8h2.02c-.38,2.97-2.38,5.53-5.25,6.54l.66,1.89c3.67-1.29,6.23-4.6,6.61-8.42h2.01c-.42,5.16-4.08,9.47-9.19,10.68l.46,1.95c6.34-1.49,10.77-7.1,10.77-13.62,0-7.72-6.28-14-14-14Zm-1,8.09c-2.51,.42-4.49,2.4-4.91,4.91h-2.02c.45-3.61,3.32-6.48,6.93-6.93v2.02Zm0-4.04c-4.72,.47-8.48,4.23-8.95,8.95h-2c.48-5.82,5.13-10.47,10.95-10.95v2Zm6.91,8.95c-.42-2.51-2.4-4.49-4.91-4.91v-2.02c3.61,.45,6.48,3.32,6.93,6.93h-2.02Zm4.04,0c-.47-4.72-4.23-8.48-8.95-8.95v-2c5.82,.48,10.47,5.13,10.95,10.95h-2Z" />
                <path d="M47,16v18c-1.1,0-2,.9-2,2v7c0,.4,.24,.77,.62,.92,.37,.15,.8,.07,1.09-.22l1.29-1.29,1.29,1.29c.19,.19,.45,.29,.71,.29,.13,0,.26-.02,.38-.08,.37-.15,.62-.52,.62-.92v-7c0-1.1-.9-2-2-2V16h-2Zm2,24.59l-.29-.29c-.2-.2-.45-.29-.71-.29s-.51,.1-.71,.29l-.29,.29v-4.59h2v4.59Z" />
              </svg>
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-800 tracking-tight">
              Highly Accurate
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              repellendus provident minima.
            </p>

          </div>

        <div className="group max-w-sm p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors duration-300 bg-blue-50 rounded-xl group-hover:bg-blue-600">
              <svg
                className="w-10 transition-colors duration-300 fill-blue-600 group-hover:fill-white"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M52,60h-2.67l3.64-12.73c.09-.3,.03-.63-.16-.88s-.48-.4-.8-.4h-18.47c-2.05-1.93-4.71-3-7.53-3h-2v-.63l.97-.42c1.82-.78,3-2.56,3.03-4.54l1.4-.28c.93-.19,1.61-1.01,1.61-1.96v-.18c1.65,0,3-1.35,3-3s-1.35-3-3-3c-.14,0-.28,.01-.42,.03-1.3-4.63-5.55-8.03-10.58-8.03s-9.28,3.41-10.58,8.03c-.14-.02-.28-.03-.42-.03-1.65,0-3,1.35-3,3s1.35,3,3,3c0,1.1,.9,2,2,2h1v.36c0,2,1.19,3.81,3.03,4.6l.97,.42v.63h-2c-6.07,0-11,4.93-11,11v6h-1v2H52v-2ZM31,31c.55,0,1,.45,1,1s-.45,1-1,1v-1c0-.33-.02-.66-.05-.99,.02,0,.03,0,.05,0Zm-22,1v1c-.55,0-1-.45-1-1s.45-1,1-1c.02,0,.03,0,.05,0-.03,.33-.05,.66-.05,.99Zm3,0v3h-1v-3c0-4.96,4.04-9,9-9s9,4.04,9,9v3.18l-1,.2v-3.38c0-3.86-3.14-7-7-7h-2c-3.86,0-7,3.14-7,7Zm11.99-3.98c-2.33,.1-3.57,1.23-4.67,2.24-1.05,.97-1.88,1.74-3.66,1.74-.61,0-1.14-.09-1.63-.28,.15-2.62,2.31-4.72,4.97-4.72h2c1.13,0,2.16,.39,2.99,1.02Zm-8.18,12.1c-1.1-.47-1.82-1.56-1.82-2.76v-3.56c.52,.13,1.07,.2,1.66,.2,2.56,0,3.87-1.2,5.02-2.27,1.05-.97,1.88-1.73,3.65-1.73,.49,0,.91,.08,1.32,.2,.22,.56,.35,1.16,.35,1.8v3.78l-6.2,1.24,.39,1.96,5.77-1.15c-.16,1.01-.82,1.88-1.78,2.29l-3,1.29c-.75,.32-1.61,.32-2.36,0l-3-1.29Zm6.18,3.11v.77c0,1.1-.9,2-2,2s-2-.9-2-2v-.77h.03c.63,.28,1.3,.41,1.97,.41s1.34-.13,1.97-.4h.03Zm-4,16.76h-2v-2h1c.55,0,1,.45,1,1v1Zm2,0v-1c0-1.65-1.35-3-3-3h-6v-2.59l1.71-1.71-1.41-1.41-2,2c-.19,.19-.29,.44-.29,.71v4c0,.55,.45,1,1,1h4v2H5v-6c0-4.96,4.04-9,9-9h2.13c.45,1.72,2.01,3,3.87,3s3.43-1.28,3.87-3h2.13c1.45,0,2.85,.35,4.11,1h-.11c-.45,0-.84,.3-.96,.73l-3.79,13.27h-5.25Zm7.33,0l3.43-12h19.92l-3.43,12H27.33Z" />
                <path d="M39,53v2c.55,0,1-.45,1-1s-.45-1-1-1Z" />
                <path d="M48,2c-7.72,0-14,6.28-14,14,0,6.53,4.43,12.13,10.77,13.62l.46-1.95c-5.11-1.2-8.77-5.52-9.19-10.68h2.01c.38,3.82,2.94,7.13,6.61,8.42l.66-1.89c-2.87-1.01-4.88-3.57-5.25-6.54h2.02c.26,1.5,1.07,2.87,2.3,3.8l1.2-1.6c-1-.75-1.6-1.95-1.6-3.2,0-2.21,1.79-4,4-4s4,1.79,4,4c0,1.25-.6,2.45-1.6,3.2l1.2,1.6c1.23-.93,2.05-2.3,2.3-3.8h2.02c-.38,2.97-2.38,5.53-5.25,6.54l.66,1.89c3.67-1.29,6.23-4.6,6.61-8.42h2.01c-.42,5.16-4.08,9.47-9.19,10.68l.46,1.95c6.34-1.49,10.77-7.1,10.77-13.62,0-7.72-6.28-14-14-14Zm-1,8.09c-2.51,.42-4.49,2.4-4.91,4.91h-2.02c.45-3.61,3.32-6.48,6.93-6.93v2.02Zm0-4.04c-4.72,.47-8.48,4.23-8.95,8.95h-2c.48-5.82,5.13-10.47,10.95-10.95v2Zm6.91,8.95c-.42-2.51-2.4-4.49-4.91-4.91v-2.02c3.61,.45,6.48,3.32,6.93,6.93h-2.02Zm4.04,0c-.47-4.72-4.23-8.48-8.95-8.95v-2c5.82,.48,10.47,5.13,10.95,10.95h-2Z" />
                <path d="M47,16v18c-1.1,0-2,.9-2,2v7c0,.4,.24,.77,.62,.92,.37,.15,.8,.07,1.09-.22l1.29-1.29,1.29,1.29c.19,.19,.45,.29,.71,.29,.13,0,.26-.02,.38-.08,.37-.15,.62-.52,.62-.92v-7c0-1.1-.9-2-2-2V16h-2Zm2,24.59l-.29-.29c-.2-.2-.45-.29-.71-.29s-.51,.1-.71,.29l-.29,.29v-4.59h2v4.59Z" />
              </svg>
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-800 tracking-tight">
              Highly Accurate
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              repellendus provident minima.
            </p>

          </div>
   <div className="group max-w-sm p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors duration-300 bg-blue-50 rounded-xl group-hover:bg-blue-600">
              <svg
                className="w-10 transition-colors duration-300 fill-blue-600 group-hover:fill-white"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M52,60h-2.67l3.64-12.73c.09-.3,.03-.63-.16-.88s-.48-.4-.8-.4h-18.47c-2.05-1.93-4.71-3-7.53-3h-2v-.63l.97-.42c1.82-.78,3-2.56,3.03-4.54l1.4-.28c.93-.19,1.61-1.01,1.61-1.96v-.18c1.65,0,3-1.35,3-3s-1.35-3-3-3c-.14,0-.28,.01-.42,.03-1.3-4.63-5.55-8.03-10.58-8.03s-9.28,3.41-10.58,8.03c-.14-.02-.28-.03-.42-.03-1.65,0-3,1.35-3,3s1.35,3,3,3c0,1.1,.9,2,2,2h1v.36c0,2,1.19,3.81,3.03,4.6l.97,.42v.63h-2c-6.07,0-11,4.93-11,11v6h-1v2H52v-2ZM31,31c.55,0,1,.45,1,1s-.45,1-1,1v-1c0-.33-.02-.66-.05-.99,.02,0,.03,0,.05,0Zm-22,1v1c-.55,0-1-.45-1-1s.45-1,1-1c.02,0,.03,0,.05,0-.03,.33-.05,.66-.05,.99Zm3,0v3h-1v-3c0-4.96,4.04-9,9-9s9,4.04,9,9v3.18l-1,.2v-3.38c0-3.86-3.14-7-7-7h-2c-3.86,0-7,3.14-7,7Zm11.99-3.98c-2.33,.1-3.57,1.23-4.67,2.24-1.05,.97-1.88,1.74-3.66,1.74-.61,0-1.14-.09-1.63-.28,.15-2.62,2.31-4.72,4.97-4.72h2c1.13,0,2.16,.39,2.99,1.02Zm-8.18,12.1c-1.1-.47-1.82-1.56-1.82-2.76v-3.56c.52,.13,1.07,.2,1.66,.2,2.56,0,3.87-1.2,5.02-2.27,1.05-.97,1.88-1.73,3.65-1.73,.49,0,.91,.08,1.32,.2,.22,.56,.35,1.16,.35,1.8v3.78l-6.2,1.24,.39,1.96,5.77-1.15c-.16,1.01-.82,1.88-1.78,2.29l-3,1.29c-.75,.32-1.61,.32-2.36,0l-3-1.29Zm6.18,3.11v.77c0,1.1-.9,2-2,2s-2-.9-2-2v-.77h.03c.63,.28,1.3,.41,1.97,.41s1.34-.13,1.97-.4h.03Zm-4,16.76h-2v-2h1c.55,0,1,.45,1,1v1Zm2,0v-1c0-1.65-1.35-3-3-3h-6v-2.59l1.71-1.71-1.41-1.41-2,2c-.19,.19-.29,.44-.29,.71v4c0,.55,.45,1,1,1h4v2H5v-6c0-4.96,4.04-9,9-9h2.13c.45,1.72,2.01,3,3.87,3s3.43-1.28,3.87-3h2.13c1.45,0,2.85,.35,4.11,1h-.11c-.45,0-.84,.3-.96,.73l-3.79,13.27h-5.25Zm7.33,0l3.43-12h19.92l-3.43,12H27.33Z" />
                <path d="M39,53v2c.55,0,1-.45,1-1s-.45-1-1-1Z" />
                <path d="M48,2c-7.72,0-14,6.28-14,14,0,6.53,4.43,12.13,10.77,13.62l.46-1.95c-5.11-1.2-8.77-5.52-9.19-10.68h2.01c.38,3.82,2.94,7.13,6.61,8.42l.66-1.89c-2.87-1.01-4.88-3.57-5.25-6.54h2.02c.26,1.5,1.07,2.87,2.3,3.8l1.2-1.6c-1-.75-1.6-1.95-1.6-3.2,0-2.21,1.79-4,4-4s4,1.79,4,4c0,1.25-.6,2.45-1.6,3.2l1.2,1.6c1.23-.93,2.05-2.3,2.3-3.8h2.02c-.38,2.97-2.38,5.53-5.25,6.54l.66,1.89c3.67-1.29,6.23-4.6,6.61-8.42h2.01c-.42,5.16-4.08,9.47-9.19,10.68l.46,1.95c6.34-1.49,10.77-7.1,10.77-13.62,0-7.72-6.28-14-14-14Zm-1,8.09c-2.51,.42-4.49,2.4-4.91,4.91h-2.02c.45-3.61,3.32-6.48,6.93-6.93v2.02Zm0-4.04c-4.72,.47-8.48,4.23-8.95,8.95h-2c.48-5.82,5.13-10.47,10.95-10.95v2Zm6.91,8.95c-.42-2.51-2.4-4.49-4.91-4.91v-2.02c3.61,.45,6.48,3.32,6.93,6.93h-2.02Zm4.04,0c-.47-4.72-4.23-8.48-8.95-8.95v-2c5.82,.48,10.47,5.13,10.95,10.95h-2Z" />
                <path d="M47,16v18c-1.1,0-2,.9-2,2v7c0,.4,.24,.77,.62,.92,.37,.15,.8,.07,1.09-.22l1.29-1.29,1.29,1.29c.19,.19,.45,.29,.71,.29,.13,0,.26-.02,.38-.08,.37-.15,.62-.52,.62-.92v-7c0-1.1-.9-2-2-2V16h-2Zm2,24.59l-.29-.29c-.2-.2-.45-.29-.71-.29s-.51,.1-.71,.29l-.29,.29v-4.59h2v4.59Z" />
              </svg>
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-800 tracking-tight">
              Highly Accurate
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              repellendus provident minima.
            </p>
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-5xl text-center mb-2 font-extrabold text-[#141452]">
          About Our Calculator
        </h1>
        <p className="w-2/3 m-auto text-center font-semibold text-[#8c8989]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
          nesciunt quae fugit laudantium magnam est? Tenetur excepturi harum
          molestias sunt. Ratione, laborum!
        </p>

        <div>
      
        </div>

        </div>

    </section>
  );
};

export default LandingPage;
