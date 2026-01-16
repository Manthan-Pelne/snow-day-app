"use client";

import dynamic from 'next/dynamic';
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Thermometer, Snowflake, Wind, Sun, Cross, ArrowBigLeft, CloudSun, CloudSnow } from "lucide-react";
import {MeteorsDemo} from "./hero-card"
import Search from "./inputSection"
import GridPattern from "./GridPattern"
// import {PlaceholdersAndVanishInputDemo} from "./searchbox"
const Snowfall = dynamic(() => import('./snowfall'));
import { BorderBeam } from "@/components/lightswind/border-beam"; 
import { getWeatherData, searchLocations, SnowDayResult } from '@/app/actions/weather';
const WeatherChart = dynamic(() => import('../components/weatherChart'), { ssr: false });
import GaugeChart from "react-gauge-chart"

import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button';



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

 


const handleBackClick = () => {
  setWeather(null);   // This hides the results section
  setQuery("");      // Optional: Clears the search bar for a fresh start
  setSuggestions([]); // Clears any leftover suggestions
};

  return (
    <>
        <div className="absolute top-0 left-0"><Snowfall/></div>
        <div className=" w-full relative text-foreground ">
      
          <div className="relative z-10  mt-10 md:mt-8  md:px-10  flex flex-col justify-between">

            {/* HERO CONTENT */}
          <main className="flex flex-col md:flex-row gap-5 lg:gap-12 items-center justify-between px-4 ">

              {/* LEFT SECTION - Stacked on mobile, 2 columns on Desktop */}
              <div className="order-1 col-span-2 lg:col-span-2 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-6xl xl:text-8xl  tracking-tighter">
                    Snow Day
                  </h1>
                  <h2 className="text-3xl md:text-5xl xl:text-6xl tracking-tight text-blue-400">
                    School <br/> Closure Predictor
                  </h2>
                </div>

                <p className="max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed opacity-80">
                  Advanced snow analysis using live weather data, snowfall intensity,
                  road conditions, and historical school closure trends to predict
                  the chances of a snow day in your area.
                </p>
              </div>

              {/* RIGHT WRAPPER - Stays as a sub-grid but handles spacing better */}
              <div className="order-1 lg:order-2 col-span-1 lg:col-span-3  gap-2 items-center">
                
                {/* CENTER VISUAL (Cloud) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    width={500}
                    height={180}
                    className="w-full max-w-[300px] md:max-w-[450px] drop-shadow-2xl relative z-10 animate-pulse"
                    src="/cloud2.png"
                    alt="Snow Storm"
                  />
                </div>

                {/* RIGHT SECTION (Stats) */}
                <div className="flex flex-col md:mt-5 justify-center items-center lg:items-end text-center lg:text-right">
                  {/* MAIN SCORE */}
                  <div className='flex md:flex-col items-center'>
                    <h3 className="text-4xl md:text-6xl xl:text-8xl leading-[0.8] tracking-tighter relative inline-block">
                      98%
                      <span className="hidden lg:block absolute top-1/4 -right-12 text-4xl"></span>
                    </h3>

                    <div className="mt-6 space-y-2 text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-80">
                      <p>Accuracy</p>
                      <p className="flex justify-center lg:justify-end gap-2 items-center">
                        <Snowflake className="w-4 h-4" /> Heavy Snowfall
                      </p>
                      <p className="flex justify-center lg:justify-end gap-2 items-center">
                        <Wind className="w-4 h-4" /> Poor Road Conditions
                      </p>
                      <p className="flex justify-center lg:justify-end gap-2 items-center">
                        <Thermometer className="w-4 h-4" /> Below Freezing
                      </p>
                    </div>
                  </div>

                  {/* CITY PROBABILITIES - Scrollable on very small screens */}
                  <div className="flex  justify-center lg:justify-end gap-6 xl:gap-10 pt-10">
                    <div className="text-center lg:text-left">
                      <p className="text-2xl xl:text-3xl">92%</p>
                      <div className="w-12 h-1 bg-blue-400 rounded-full mt-1 mx-auto lg:mx-0" />
                      <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                        Washington D.C.
                      </p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-2xl xl:text-3xl">88%</p>
                      <div className="w-12 h-1 bg-yellow-400 rounded-full mt-1 mx-auto lg:mx-0" />
                      <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                        Oklahoma City
                      </p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-2xl xl:text-3xl">85%</p>
                      <div className="w-12 h-1 bg-cyan-400 rounded-full mt-1 mx-auto lg:mx-0" />
                      <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">
                        Philadelphia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            
            </main>

          {!weather ? 
          <div className="relative w-[90%] md:max-w-4xl mx-auto border bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16 animate-in fade-in duration-500">
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
          </div> : null
        }           
          

       </div>
    </div>

        {/* Results */}
       
        {weather && (
          <div className="space-y-12 mt-10 p-4 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
          
            {/* Gauge */}
            <div className=" bg-blue-100/30 relative dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c]  shadow-sm backdrop-blur-2xl p-8 lg:p-16 rounded-[30px] ">
            
                <Button onClick={handleBackClick} className='flex absolute left-3 top-3 sm:left-6 sm:top-6 items-center bg-blue-400 dark:bg-[#29292a] text-white cursor-pointer hover:bg-blue-500 transition-all duration-200 active:scale-90 active:shadow-none dark:hover:bg-black shadow-xl tracking-wider mb-3 md:mb-0'>BACK<ArrowBigLeft className='rotate-45 dark:text-blue-500 mt-0.5'/> </Button>

             <div className="flex flex-col lg:flex-row items-center justify-center gap-5 md:gap-10">
      
             {/* --- NEW GAUGE CHART --- */}
                  <div className="w-64 md:w-72">
                    <GaugeChart
                      id="snow-chance-gauge"
                      nrOfLevels={20} // Higher number makes the gradient smoother
                      colors={[ "#93c5fd","#60a5fa", "#3b82f6"]} // Using Blue shades for snow aesthetic
                      arcWidth={0.2}
                      percent={weather.daily[0].snowDayChance / 100}
                      textColor={'currentColor'} // Inherits from dark/light mode
                      needleColor="#4190e9"
                      needleBaseColor="#4190e9"
                      animate={true}
                      formatTextValue={(value : any) => value + '%'}
                    />
                  </div>
        
                  <div className="text-center lg:text-left">
                    <h1 className="text-xl  md:text-3xl text-black/80 dark:text-white font-light text-center mb-5 md:mb-8">
                  Weather in <span className="font-bold italic underline underline-offset-7">{locationName}</span>
                </h1>
                    <p className="font-bold text-lg text-[#50A2FF] italic dark:text-white mb-2">
                      {getStatusMessage(weather.daily[0].snowDayChance)}
                    </p>
                    <h2 className="text-xl sm:text-3xl md:tex-4xl font-bold text-[#4190e9]">
                      {weather.daily[0].snowDayChance > 50 ? "Grab the pajamas!" : "Keep the backpack ready."}
                    </h2>
                  </div>
              </div>
            </div>

         {/* GRAPH */}
            <section className="px-2">
              <h3 className="text-sm border border-black dark:border-white dark:text-white w-max rounded-lg text-black p-2 font-bold uppercase tracking-widest mb-4">
                Atmospheric Trends
              </h3>
              <WeatherChart data={weather.hourly} />
            </section>


            {/* Hourly */}
            <section>
              <h3 className="text-sm border border-black dark:border-white dark:text-white w-max rounded-lg text-black p-2 font-bold uppercase tracking-widest mb-4 ml-2">
                Today's Weather
              </h3>
              <div className="flex gap-3 pb-6 ">

                <Carousel
                    plugins={[plugin.current]}
                    className="w-[99%] sm:w-[90%] md:w-[90%] 2xl:w-full m-auto" // Increased width to fit more cards

                  >
                    <CarouselContent>
                      {weather.hourly.map((h, i) => (
                        // basis-1/5 shows 5 cards, basis-1/6 shows 6 cards
                        // Use md: and lg: for responsiveness
                        <CarouselItem key={i} className=" basis-1/2 sm:basis-1/4 lg:basis-1/5 xl:basis-1/7">
                          <div className="p-1">
                            <Card className='flex aspect-square items-center shadow-md bg-blue-100/30 dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c] justify-center  rounded-xl p-2 text-center  flex-col gap-4'>
                          <CardContent className="
                            /* Responsive Container: smaller padding/height on mobile */
                            p-4 sm:p-6 
                            min-h-[160px] sm:min-h-[200px] 
                            flex flex-col justify-between 
                          transition-all
                          ">
                            
                            {/* TOP: Icon - smaller on mobile */}
                            <div className="flex justify-between items-start">
                              {h.isSnowing ? (
                                <Snowflake className="text-blue-400 size-5 sm:size-7" />
                              ) : (
                                <Sun className="text-yellow-400 size-5 sm:size-7" />
                              )}
                            </div>
                              {/* Condition Text - hidden on very small cards or just made smaller */}
                              <div className="pb-1">
                              <span className={`text-sm font-semibold whitespace-nowrap ${h.isSnowing ? 'text-blue-600' : 'text-yellow-600'}`}>
                                {h.isSnowing ? "Snowing" : "Sunny"}
                              </span>
                              </div>

                            <hr  className='my-1'/>

                            {/* MIDDLE: Main Data - dynamic text sizing */}
                            <div className="flex items-end justify-between gap-2">
                              <div className="space-y-0"> 
                                {h.isSnowing ? (
                                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black/80 dark:text-white leading-none">
                                    {h.snowAmount}<span className="text-base sm:text-xl ml-0.5"> cm</span>
                                  </h2>
                                ) : (
                                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter dark:text-white leading-none">
                                    {h.temp}°<span className="text-base sm:text-xl ml-0.5">C</span>
                                  </h2>
                                )}
                                
                                <p className='mt-1 text-sm dark:text-[#b8b5b5] font-semibold'>{h.time}</p>
                                <p className="text-[10px] text-xs font-medium text-zinc-500 mt-1">
                                 {h.isSnowing ? "Feels like a snowy day" : "Feels like a sunny day"}
                            
                                </p>
                              </div>                           
                            </div>
                          </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious  className='hidden sm:block w-max p-1.5'/>
                    <CarouselNext className='hidden sm:block w-max p-1.5' />
                  </Carousel>

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
                      <p className='text-[gray] mb-2 text-sm'>Snow chances</p>
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

    
    </>
  );
};

export default Hero;
