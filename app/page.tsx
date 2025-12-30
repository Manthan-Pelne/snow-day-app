import React from 'react'
import Image from "next/image";
import Hero from "@/components/Hero"
import Info from "@/components/Info"
import Info2 from "@/components/Info2"
const page = () => {
  return (
    <>
      <div className="pt-20 max-w-7xl mx-auto">
        <Hero/>
          <div className="py-20">
            <Info/>
            <Info2/>
          </div>
      </div>
    </>
  )
}

export default page