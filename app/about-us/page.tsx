"use client";

import dynamic from 'next/dynamic';
import React from "react";
import Image from "next/image";
import { Thermometer, Snowflake, Wind } from "lucide-react";
import Search from "@/components/inputSection"
import GridPattern from "@/components/GridPattern"
import {SearchBox} from "@/components/searchbox"
const Snowfall = dynamic(() => import('@/components/snowfall'));
import { BorderBeam } from "@/components/lightswind/border-beam"; 
import { SparkleParticles } from '@/components/lightswind/sparkle-particles';


const page = () => {

  return (
    <>
      <div className="pt-20 max-w-7xl mx-auto">
        <div className="absolute top-0 left-0"> <Snowfall /></div>
        <div className=" w-full relative overflow-hidden text-foreground ">
            {/* Mobile Cloud */}
            <div className="mt-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="space-y-1">
                    <h1 className="text-6xl font-medium tracking-tighter">
                     About
                    </h1>
                    <h2 className="text-4xl tracking-tight text-blue-400">
                      Snow Day calculator
                    </h2>
                  </div>

                  <p className="leading-relaxed mt-2">
                    Advanced snow analysis using live weather data, snowfall intensity,
                    road conditions, and historical school closure trends to predict
                    the chances of a snow day in your area.
                  </p>
            </div>
            <div className="min-w-2xl w-full grid place-content-center relative">
               <div className="flex justify-center w-full ">
              <Image
                width={300}
                height={180}
                className="w-full max-w-[300px] drop-shadow-2xl relative z-10 dark:animate-pulse"
                src="/cloud3.png"
                alt="Snow Cloud"
              />
              </div>

            </div>
           

           
            </div>

        </div>
      </div>

      

      <section className='max-w-screen-2xl relative mx-auto'>
   <div className="absolute translate-y-2/2 left-[-20px] w-64 h-64 bg-blue-400 rotate-12 opacity-20 rounded-3xl"></div>
</section>
  
<div className="relative  mt-20 w-11/12 md:max-w-4xl m-auto p-12 rounded-3xl border border-slate-200 dark:border-[#4c4a4a] bg-linear-to-b from-blue-200 via-white dark:bg-linear-to-b dark:from-black dark:via-black dark:to-black shadow-xl overflow-hidden">
  <SparkleParticles className='absolute top-0 w-full'/>
  {/* Content (Z-index ensures text stays on top) */}
  <div className="relative z-10">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, excepturi.
    </h2>
    
    <div className="space-y-4 text-slate-600 dark:text-[#b9b5b5] leading-relaxed">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolore voluptatum quae, 
        quam odio quos dicta voluptatibus, itaque, accusantium rerum quidem!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestiae animi facere quos, 
        quibusdam provident molestias itaque ad repellat.
      </p>
    </div>
  </div>
</div>

 
{/* New Aesthetic About Us Section */}
<section className="relative mt-20 px-6">
  {/* Background Decorative Objects */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
    <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 -right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
   <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-blue-400 rounded-[50px] opacity-20"></div>
  </div>

  <div className="relative max-w-4xl mx-auto p-10 md:p-16 rounded-[40px] bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-100 dark:border-[#4c4a4a] shadow-2xl overflow-hidden">
    
    {/* Subtle Geometric "Object" behind text */}
    <div className="absolute top-[-10%] right-[-5%] w-64 h-64 border-[16px] border-blue-100 dark:border-cyan-300/40 rounded-full -z-10" />
    
    <div className="relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
        Precision in every flake. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
          Peace of mind for parents.
        </span>
      </h2>

      <div className="space-y-6 text-slate-600 dark:text-[#b9b5b5] text-lg leading-relaxed max-w-2xl mx-auto">
        <p>
          At <span className="font-bold text-slate-800 dark:text-white">SnowDay Calc</span>, we don’t just look at the sky; we look at the data. Founded on the belief that "2 inches isn't just snow—it's a lifestyle change," we’ve built a predictor specifically for regions where every degree matters.
        </p>
        
        <p className="font-medium italic text-slate-500 dark:text-blue-300">
          "We merge high-fidelity meteorological data with local district logic to tell you if the school bus is coming, before the first snowflake hits the ground."
        </p>

        <div className="pt-8 flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest">
          <span className="px-4 py-2 bg-blue-50 dark:bg-black text-blue-600 rounded-full border border-blue-100">75% Weight: Commute Window</span>
          <span className="px-4 py-2 bg-linear-to-r from-[#3b5eaf] to-[#57b0b6] dark:from-[#182e63] dark:to-[#127a82] text-white rounded-full border border-slate-300">AI Driven Logic</span>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default page