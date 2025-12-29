import React from 'react'
import Image from "next/image";
import Hero from "@/components/Hero"
import WeatherDashboard from "@/components/Hero2"
import Info from "@/components/Info"
const page = () => {
  return (
    <>
      <div className="pt-20 max-w-7xl mx-auto">
        <Hero/>
          <div className="py-20">
            <Info/>
          </div>
      </div>
    </>
  )
}

export default page