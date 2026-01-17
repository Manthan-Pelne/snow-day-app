import React from 'react'
import Image from "next/image";
import Hero from "@/components/Hero"
import Info from "@/components/Info"
import Info2 from "@/components/Info2"

export const metadata = {
  title: "Snow Day Predictor | School Closure Probability",
  description:
    "Predict the chance of school closures with our advanced snow day calculator. Real-time weather analysis for students and parents.",
  openGraph: {
    title: "Snow Day Predictor",
    description: "Will school be cancelled tomorrow?",
    type: "website",
  },
};

const page = () => {
  return (
    <>
      <div className="pt-16 md:pt-20 max-w-7xl mx-auto">
        <Hero/>
          <div className="pt-20">
            <Info/>
            <Info2/>
          </div>
      </div>
    </>
  )
}

export default page