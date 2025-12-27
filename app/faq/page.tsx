

import React from 'react'
import Image from "next/image";
import Hero from "@/components/Hero"
import WeatherDashboard from "@/components/Hero2"
import Info from "@/components/Info"
const page = () => {
  return (
    <>
     <Hero/>
    <div className="max-w-6xl mx-auto p-5 pt-20">
    <Info/>
    </div>
    </>
  )
}

export default page