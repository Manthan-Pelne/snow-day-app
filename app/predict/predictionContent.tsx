"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getWeatherData, SnowDayResult } from "@/app/actions/weather";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Snowflake, Sun, CloudSnow, XCircle } from "lucide-react";
import GaugeChart from "react-gauge-chart";
import WeatherChart from "@/components/weatherChart";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
// ... Import your other components (Carousel, Card, etc.)




function PredictionContent() {
  const searchParams = useSearchParams();
  const router = useRouter()
const lat = searchParams.get("lat");
const lon = searchParams.get("lon");
const city = searchParams.get("city");

  
  const [weather, setWeather] = useState<SnowDayResult["weather"] | null>(null);
const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

      const getStatusMessage = (chance: number): string => {
        if (chance >= 80) return "🚨 100% Certified Pajama Day!";
        if (chance >= 60) return "❄️ High Probability. Get the sleds out.";
        if (chance >= 40) return "⚠️ Toss-up. Keep an eye on the news.";
        if (chance >= 20) return "🕒 Delay possible. Set an early alarm.";
        if (chance > 0) return "🌨️ Seeing flakes, but school is likely on.";
        return "☀️ Clear skies. See you in class!";
      };
      
      

useEffect(() => {
  async function fetchWeather() {
    try {
      setLoading(true);
      
      // Clean the city name just in case we are searching by name
      const cleanCityName = city ? decodeURIComponent(city).replace(/-/g, ' ') : "";

      // Update your getWeatherData call to accept lat/lon
      const result = await getWeatherData(cleanCityName, lat || undefined, lon || undefined);

      if (result.success) {
        setWeather(result.weather);
        setLocationName(result.locationName);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  fetchWeather();
}, [city, lat, lon]);
  

if (loading) {
    return (
      <div className="max-w-7xl mx-auto pt-32 px-4 space-y-12 animate-pulse">
        <div className="h-64 bg-blue-100 dark:bg-white/5 rounded-[30px]" />
        <div className="h-96 bg-blue-100 dark:bg-white/5 rounded-[30px]" />
      </div>
    );
  }

  if (!weather || error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Location Not Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
          We couldn't find data for "{city}". Please check the spelling or try a different city.
        </p>
        <Button 
          onClick={() => router.push('/')} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl cursor-pointer text-lg"
        >
          Try Another City
        </Button>
      </div>
    );
  }
  

  return (
    <section className="max-w-screen-2xl relative mx-auto pt-32 px-4">


    <div className="container max-w-7xl mx-auto  space-y-12 animate-in fade-in duration-700">
      {/* --- GAUGE SECTION --- */}
      <div className="bg-blue-100/30 relative dark:bg-blue-100/5 border border-white/20 dark:border-[#453c3c] shadow-sm backdrop-blur-2xl p-8 lg:p-16 rounded-[30px] overflow-hidden">
        

        <Button 
          onClick={() => router.push('/')} 
          className='flex absolute left-3 top-3 sm:left-6 sm:top-6 items-center bg-blue-400 hover:bg-blue-500 cursor-pointer transition-all duration-200 dark:bg-black/10 dark:hover:bg-black/20 border dark:border-white/10  text-white'
        >
          <ArrowBigLeft className='rotate-45'/>BACK
        </Button>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="w-64 md:w-72">
            <GaugeChart
              id="snow-gauge"
              nrOfLevels={20}
              colors={["#93c5fd", "#3b82f6"]}
              percent={weather.daily[0].snowDayChance / 100}
              textColor="currentColor"
              needleColor="#4190e9"
              needleBaseColor="#4190e9"
            />
          </div>
          <div className="text-center lg:text-left">
             <h1 className="text-xl md:text-3xl font-light">
                Weather in <span className="font-bold italic underline">{locationName}</span>
             </h1>
             {/* Main Status Message */}
  <h2 className="text-lg mt-6 leading-tight tracking-normal">
    {getStatusMessage(weather.daily[0].snowDayChance)}
  </h2>
             <h2 className="text-2xl md:text-4xl font-bold text-[#4190e9] mt-4">
                {weather.daily[0].snowDayChance > 50 ? "Grab the pajamas!" : "Keep the backpack ready!"}
             </h2>
          </div>
        </div>
      </div>

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
                                        <h2 className="text-2xl sm:text-3xl font-normal tracking-tighter text-black/80 dark:text-white leading-none">
                                          {h.snowAmount}<span className="text-base sm:text-lg ml-0.5"> cm</span>
                                        </h2>
                                      ) : (
                                        <h2 className="text-2xl sm:text-3xl font-normal tracking-tighter dark:text-white leading-none">
                                          {h.temp}°<span className="text-base sm:text-lg ml-0.5">C</span>
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


    </section>
  );
}

export default function PredictionPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Prediction...</div>}>
      <PredictionContent />
    </Suspense>
  );
}