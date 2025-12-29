"use client";

import dynamic from 'next/dynamic';
import React from "react";
import Image from "next/image";
import { Thermometer, Snowflake, Wind } from "lucide-react";
import {MeteorsDemo} from "./hero-card"
import Search from "./inputSection"
import GridPattern from "./GridPattern"
// import {PlaceholdersAndVanishInputDemo} from "./searchbox"
const Snowfall = dynamic(() => import('./snowfall'));
import { BorderBeam } from "@/components/lightswind/border-beam"; 


const Hero = () => {
  return (
    <>
        <div className="absolute top-0 left-0"> <Snowfall /></div>
        <div className=" w-full relative overflow-hidden text-foreground ">
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

            

            {/* BOTTOM TIMELINE */}
            {/* <footer className="relative mt-14 flex items-end">
              <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none">
                <svg
                  viewBox="0 0 1440 320"
                  className="w-full h-40 fill-transparent stroke-gray-300  dark:stroke-white/40 stroke-2"
                >
                  <path d="M0,160 C150,120 300,280 450,220 C600,160 750,240 900,200 C1050,160 1200,280 1440,240" />
                </svg>
              </div>

              <div className="w-full flex justify-around text-[10px] font-bold uppercase tracking-[0.2em] pb-4 relative z-20">
                <span>6 AM Low</span>
                <span>8 AM Moderate</span>
                <span>10 AM High</span>
                <span>12 PM Very High</span>
                <span>2 PM Peak</span>
                <span>4 PM Closure</span>
                <span>6 PM Unsafe</span>
                <span>8 PM Clear</span>
              </div>
            </footer> */}

                    <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                    <BorderBeam />
                      <GridPattern />
                    </div>
                    
                    {/* <div className="max-w-4xl mx-auto  bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl w-full p-6 mt-16">
                      <Search/>
                    </div> */}
          </div>
        </div>
    </>
  );
};

export default Hero;
