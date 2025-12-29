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
    </>
  )
}

export default page