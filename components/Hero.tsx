"use client";

import dynamic from 'next/dynamic';
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Thermometer, Snowflake, Wind, Sun } from "lucide-react";
import {MeteorsDemo} from "./hero-card"
import Search from "./inputSection"
import GridPattern from "./GridPattern"
// import {PlaceholdersAndVanishInputDemo} from "./searchbox"
const Snowfall = dynamic(() => import('./snowfall'));
import { BorderBeam } from "@/components/lightswind/border-beam"; 
import { getWeatherData, searchLocations, SnowDayResult } from '@/app/actions/weather';

import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



const getGaugeColor = (chance: number): string => {
  if (chance > 70) return "text-red-500 stroke-red-400";
  if (chance > 40) return "text-orange-500 stroke-orange-400";
  return "text-blue-500 stroke-blue-400";
};

const getStatusMessage = (chance: number): string => {
  if (chance >= 80) return "🚨 100% Certified Pajama Day!";
  if (chance >= 60) return "❄️ High Probability. Get the sleds out.";
  if (chance >= 40) return "⚠️ Toss-up. Keep an eye on the news.";
  if (chance >= 20) return "🕒 Delay possible. Set an early alarm.";
  if (chance > 0) return "🌨️ Seeing flakes, but school is likely on.";
  return "☀️ Clear skies. See you in class!";
};

const Hero: React.FC = () => {

    // --- STATE ---
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<SnowDayResult["weather"] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // You can replace any with GeoResult interface
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lockSuggestions, setLockSuggestions] = useState<boolean>(false);


      const plugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    )


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
    <>
        <div className="absolute top-0 left-0"> <Snowfall /></div>
        <div className=" w-full relative text-foreground ">
            {/* Mobile Cloud */}
            <div className="hidden">
            <div className="max-w-3xl mx-auto text-center pt-5">
              <div className="space-y-1">
                    <h1 className="text-8xl font-medium tracking-tighter">
                      Snow Day
                    </h1>
                    <h2 className="text-6xl tracking-tight text-blue-400">
                      School Closure Predictor
                    </h2>
                  </div>

                  <p className="leading-relaxed mt-5 text-lg">
                    Advanced snow analysis using live weather data, snowfall intensity,
                    road conditions, and historical school closure trends to predict
                    the chances of a snow day in your area.
                  </p>
            </div>
            <div className="flex justify-center w-full ">
              <Image
                width={500}
                height={180}
                className="w-full max-w-[500px] drop-shadow-2xl relative z-10 dark:animate-pulse"
                src="/cloud3.png"
                alt="Snow Cloud"
              />
            </div>
            </div>

          <div className="relative z-10 p-6 md:p-10  flex flex-col justify-between">

            {/* HERO CONTENT */}
            <main className="grid grid-cols-5 gap-8 items-center">

              {/* LEFT SECTION */}
              <div className="col-span-2 space-y-6">
                <div className="space-y-1">
                  <h1 className="text-8xl font-medium tracking-tighter">
                    Snow Day
                  </h1>
                  <h2 className="text-6xl tracking-tight text-blue-400">
                    School Closure Predictor
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-relaxed opacity-80">
                  Advanced snow analysis using live weather data, snowfall intensity,
                  road conditions, and historical school closure trends to predict
                  the chances of a snow day in your area.
                </p>

              
              </div>

            <div className="col-span-3 grid grid-cols-2">
              {/* CENTER VISUAL */}
              <div className="col-span-1">
                <Image
                  width={500}
                  height={180}
                  className="w-full max-w-[450px] drop-shadow-2xl relative z-10 animate-pulse"
                  src="/cloud2.png"
                  alt="Snow Storm"
                />
              </div>

              {/* RIGHT SECTION */}
              <div className="col-span-1">

                {/* MAIN SCORE */}
                <div className="text-right">
                  <h3 className="text-9xl leading-[0.8] tracking-tighter relative">
                    98%
                    <span className="absolute top-1/4 -right-12 text-4xl">
                    
                    </span>
                  </h3>

                  <div className="mt-4 space-y-1 text-xs uppercase font-bold tracking-widest opacity-80">
                    <p>Accuracy</p>
                    <p className="flex justify-end gap-2">
                      <Snowflake className="w-4 h-4" /> Heavy Snowfall
                    </p>
                    <p className="flex justify-end gap-2">
                      <Wind className="w-4 h-4" /> Poor Road Conditions
                    </p>
                    <p className="flex justify-end gap-2">
                      <Thermometer className="w-4 h-4" /> Below Freezing
                    </p>
                  </div>
                </div>

                {/* CITY PROBABILITIES */}
                <div className="flex gap-10 pt-10">
                  <div>
                    <p className="text-3xl">92%</p>
                    <div className="w-12 h-1 bg-blue-400 rounded-full mt-1" />
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                      Washington D.C.
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl">68%</p>
                    <div className="w-12 h-1 bg-yellow-400 rounded-full mt-1" />
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                      Oklahoma City
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl">85%</p>
                    <div className="w-12 h-1 bg-cyan-400 rounded-full mt-1" />
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                      Philadelphia
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-span-2 flex flex-col items-end space-y-8">

        
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] w-full">
                <PlaceholdersAndVanishInputDemo/>
                </div>
              </div> */}
              </div>
            </main>



            <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                    <BorderBeam />
                 <GridPattern 
                value={query}
                onChange={(e:any) => setQuery(e.target.value)}
                onSubmit={(e:any) => handleSearch(e)}
                suggestions={suggestions}
                isTyping={isTyping}
                onSuggestionClick={(cityName:any) => {
                setLockSuggestions(true);
                setQuery(cityName);
                setSuggestions([]);
                handleSearch(null, cityName);
                
                  }}
             />
          </div>

                         {/* Results */}
        {weather && (
          <div className="space-y-12 text-foreground mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
            {/* Gauge */}
            <div className=" bg-blue-100/30 dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c]  shadow-sm backdrop-blur-2xl p-8 rounded-[30px] ">
               <h1 className="text-3xl text-black/80 dark:text-white font-light text-center mb-5">
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
                <p className="font-bold text-lg text-[#50A2FF] italic dark:text-white mb-2">
                  {getStatusMessage(weather.daily[0].snowDayChance)}
                </p>
                <h2 className="text-4xl font-bold text-[#4190e9] dark:text-[#d9d3ff]">
                  {weather.daily[0].snowDayChance > 50 ? "Grab the pajamas!" : "Keep the backpack ready."}
                </h2>
              </div>
              </div>
            </div>

            {/* Hourly */}
            <section>
              <h3 className="text-sm border border-black dark:border-white dark:text-white w-max rounded-lg text-black p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                Hourly (Next 24h)
              </h3>
              <div className="flex gap-3  pb-6 ">

                <Carousel
                    plugins={[plugin.current]}
                    className="w-[93%] m-auto" // Increased width to fit more cards

                  >
                    <CarouselContent>
                      {weather.hourly.map((h, i) => (
                        // basis-1/5 shows 5 cards, basis-1/6 shows 6 cards
                        // Use md: and lg: for responsiveness
                        <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/7">
                          <div className="p-1">
                            <Card className='flex aspect-square items-center shadow-md bg-blue-100/30 dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c] justify-center  rounded-xl p-2 text-center  flex-col gap-4'>
                              <CardContent className="">
                        
                                    <p className="text-xs text-black dark:text-white font-semibold opacity-70">{h.time}</p>
                                    <div className="flex flex-col items-center">
                                      {h.isSnowing ? <Snowflake className="text-blue-400 my-1" /> : <Sun className="my-3 text-orange-400" />}
                                      {h.isSnowing ? (
                                        <span className="text-sm text-blue-500 font-bold mt-2">{h.snowAmount} cm</span>
                                      ) : (
                                        <p className="text-xl font-semibold text-black dark:text-white">{h.temp}°</p>
                                      )}
                                    </div>
                                  
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                {/* {weather.hourly.map((h, i) => (
                  <div key={i} className="min-w-25 shadow-md bg-[blue]/5 border border-white/20 dark:border-[blue] rounded-xl p-4 text-center  flex flex-col items-center gap-2">
                    <p className="text-xs text-black dark:text-white font-semibold opacity-70">{h.time}</p>
                    <div className="flex flex-col items-center">
                      {h.isSnowing ? <Snowflake className="text-blue-400 my-1" /> : <Sun className="my-1 text-orange-400" />}
                      {h.isSnowing ? (
                        <span className="text-sm text-blue-500 font-bold mt-2">{h.snowAmount} cm</span>
                      ) : (
                        <p className="text-xl font-semibold text-black dark:text-white">{h.temp}°</p>
                      )}
                    </div>
                  </div>
                ))} */}
              </div>
            </section>

            {/* 7-Day Forecast */}
            <section>
              <h3 className="text-sm rounded-lg font-bold uppercase tracking-widest border border-black dark:border-white w-max p-2 text-black dark:text-white mb-4 ml-2">
                7-Day Forecast
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                  {weather.daily.map((d, i) => (
                    <div key={i} className="bg-blue-100/30 dark:bg-blue-100/5 border border-white/40 dark:border-[#453c3c] rounded-2xl shadow-md p-4 text-center">
                      <p className="text-[10px] font-black text-black dark:text-white opacity-60 uppercase mb-1">
                        {new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="text-xl flex items-center justify-center gap-2 text-black dark:text-white font-semibold">
                        {d.snowDayChance}% <Snowflake className="text-blue-400 text-sm" />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-black dark:text-white">
                  {weather.daily.map((d, i) => (
                    <div key={i} className="bg-blue-100/30 dark:bg-blue-100/5 border shadow-md border-white/30 dark:border-[#453c3c] rounded-2xl p-4 text-[11px] space-y-3">
                      <div>
                        <p className="opacity-50 uppercase">Max Temp</p>
                        <p className="font-bold text-sm">{d.tempMax}°C</p>
                      </div>
                      <div className="h-px bg-black/10 dark:bg-[gray]/30" />
                      <div>
                        <p className="opacity-50 uppercase">Precipitation</p>
                        <p className="font-bold text-sm">{d.precip} mm</p>
                      </div>
                      <div className="h-px bg-black/10 dark:bg-[gray]/30" />
                      <div>
                        <p className="opacity-50 uppercase">Wind Avg</p>
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
    </>
  );
};

export default Hero;
