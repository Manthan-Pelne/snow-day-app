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
      <div className="pt-20 max-w-7xl mx-auto px-4 lg:px-0">
        <div className="absolute top-0 left-0"> <Snowfall /></div>
        <div className=" w-full relative overflow-hidden text-foreground ">
            {/* Mobile Cloud */}
            <div className="mt-4 md:mt-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="space-y-1">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tighter">
                     About
                    </h1>
                    <h2 className="text-2xl md:text-4xl tracking-tight text-blue-400">
                      Snow Day calculator
                    </h2>
                  </div>

                  <p className="leading-relaxed mt-2 text-sm">
                    Advanced snow analysis using live weather data, snowfall intensity,
                    road conditions, and historical school closure trends to predict
                    the chances of a snow day in your area.
                  </p>
            </div>
            <div className=" m-auto pt-20 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
  
<div className="relative mt-10 w-11/12 md:max-w-4xl m-auto py-5 md:py-10 px-1 rounded-[2.5rem] border border-white/20 dark:border-slate-800 bg-white/50 dark:bg-black/20 backdrop-blur-xl shadow-xl overflow-hidden group">
  
  {/* 1. Animated Spotlight (The "Graphic" element) */}
  <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none group-hover:bg-blue-400/30 transition-colors duration-700" />
  <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[100px] pointer-events-none" />

  {/* 2. Decorative Top Edge Glow */}
  <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />

  {/* 3. The Content Layer */}
  <div className="relative z-10 px-4 md:px-12">
    {/* Small Accent Tag */}
    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      About Us
    </div>

    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
      Lorem ipsum <span className="text-transparent bg-clip-text bg-linear-to-r from-[#519efd] to-[#55a0fd] dark:from-blue-400 dark:to-blue-500">Digital Experience</span>
    </h2>
    
    <div className="space-y-1 md:text-lg text-black/80 dark:text-[#b9b5b5] leading-relaxed md:max-w-2xl">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolore voluptatum quae, 
        quam odio quos dicta voluptatibus, itaque, accusantium rerum quidem!
      </p>
      <p className="hidden md:block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste molestiae animi facere quos, 
        quibusdam provident molestias itaque ad repellat.
      </p>
    </div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-[6px] border-blue-100 dark:border-blue-300/10 rounded-[30px] -z-10"></div>
        <div className="absolute bottom-0 right-20 w-24 h-24 border-[6px] border-blue-100 dark:border-blue-300/10 rounded-[30px] -z-10"></div>
  </div>

  {/* 4. Subtle Grid Pattern Background */}
  <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v2H20v-2h16zm0-8v2H20v-2h16zm-10-6h10v2H26v-2zm0 20h10v2H26v-2zM20 20h4v20h-4V20zm20 0h4v20h-4V20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
  </div>
</div>

 
{/* New Aesthetic About Us Section */}
<section className="relative mt-14 md:mt-20 px-6">
  {/* Background Decorative Objects */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
    <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 md:-right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
   <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-blue-400 rounded-[50px] opacity-20"></div>
  </div>

  <div className="relative max-w-4xl mx-auto p-4 md:p-16 rounded-3xl md:rounded-[40px] bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-100 dark:border-[#4c4a4a] shadow-xl overflow-hidden">
    
    {/* Subtle Geometric "Object" behind text */}
    <div className="absolute top-[-10%] right-[-5%] w-64 h-64 border-[16px] border-blue-100 dark:border-blue-300/20 rounded-full -z-10"></div>
    
    <div className="relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
        Precision in every flake. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
          Peace of mind for parents.
        </span>
      </h2>

      <div className="space-y-6 text-slate-600 dark:text-[#b9b5b5] md:text-lg leading-relaxed max-w-2xl mx-auto">
        <p>
          At <span className="font-bold text-slate-800 dark:text-white">SnowDay Calc</span>, we don’t just look at the sky; we look at the data. Founded on the belief that "2 inches isn't just snow—it's a lifestyle change," we’ve built a predictor specifically for regions where every degree matters.
        </p>
        
        <p className="font-medium italic text-slate-500 dark:text-blue-300">
          "We merge high-fidelity meteorological data with local district logic to tell you if the school bus is coming, before the first snowflake hits the ground."
        </p>

        <div className="pt-8 flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest">
          <span className="px-4 py-2 bg-blue-50 dark:bg-black text-blue-600 rounded-full border border-blue-100">75% Weight: Commute Window</span>
          <span className="px-4 py-2 bg-linear-to-r from-[#3b5eaf] to-[#57b0b6] dark:from-[#182e63] dark:to-[#127a82] text-white rounded-full border border-slate-300 dark:border-none">AI Driven Logic</span>
        </div>
      </div>
    </div>
  </div>

  
</section>
    </>
  )
}

export default page