"use client";

import dynamic from 'next/dynamic';
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Thermometer, Snowflake, Wind, Loader2, Loader2Icon} from "lucide-react";
import GridPattern from "./GridPattern"
const Snowfall = dynamic(() => import('./snowfall'));
import { BorderBeam } from "@/components/lightswind/border-beam"; 
import {  searchLocations, SnowDayResult } from '@/app/actions/weather';

import { useRouter } from 'next/navigation';


const Hero: React.FC = () => {

    // --- STATE ---
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<SnowDayResult["weather"] | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]); // You can replace any with GeoResult interface
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [lockSuggestions, setLockSuggestions] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

    const router = useRouter()

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
const handleSearch = async (
  e: FormEvent | null, 
  manualCity: string | null = null,
  lat?: number,
  lon?: number
) => {
  if (e) e.preventDefault();
  const targetCity = manualCity || query; 
  if (!targetCity) return;

  startTransition(() => {
    // If we have coordinates, use them!
    if (lat && lon) {
      router.push(`/predict?lat=${lat}&lon=${lon}&city=${encodeURIComponent(targetCity)}`);
    } else {
      // Fallback for when user just presses "Enter" without clicking a suggestion
      const cleanCity = targetCity.replace(/,/g, '').replace(/\s+/g, '-');
      router.push(`/predict?city=${encodeURIComponent(cleanCity)}`);
    }
  });
};

 

  return (
    <>
      
        <div className="absolute top-0 left-0"><Snowfall/></div>

        {/* 4. The Loader Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px] pointer-events-none">
           <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <Snowflake className="w-10 h-10 text-blue-500 animate-spin mb-4" />
           </div>
        </div>
      )}
         
       <div className={`transition-all duration-700 ease-in-out ${isPending ? "opacity-30 grayscale-[50%] pointer-events-none scale-[0.98]" : "opacity-100"}`}>
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
                onSuggestionClick={(loc: any) => { // Change cityName to loc object
                 setLockSuggestions(true);
              const specificName = `${loc.name}, ${loc.country}`; 
              setQuery(specificName);
              setSuggestions([]);
              
              // Pass the coordinates directly here!
              handleSearch(null, specificName, loc.latitude, loc.longitude);
                }}
              />
          </div> : null
        }           
  
       </div>
        </div>
      </div>

    </>
  );
};

export default Hero;
