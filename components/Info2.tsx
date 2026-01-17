"use client"
import React, { useState } from 'react';
// Ensure pattern.css has a corresponding declaration file if your linter complains
import "pattern.css"; 
import { Snowflake } from 'lucide-react';
import { ScrollTimeline } from './lightswind/scroll-timeline';
import Link from 'next/link';

const Info2: React.FC = () => {

const events = [
  {
    year: "Step 01",
    title: "Live Ingest",
    subtitle: "Data Sourcing",
    description: "We pull real-time data from NOAA and local weather stations to ensure the most accurate atmospheric readings."
  },
  {
    year: "Step 02",
    title: "Timing Check",
    subtitle: "Peak Weighting",
    description: "Snow between 4:00 AM and 8:00 AM is weighted 3x more heavily, as this window is critical for bus safety and school delays."
  },
  {
    year: "Step 03",
    title: "Road Logic",
    subtitle: "Infrastructure Analysis",
    description: "Our algorithm factors in your city's snow-clearing budget and historical tolerance for winter road conditions."
  },
  {
    year: "Step 04",
    title: "Final Odds",
    subtitle: "AI Comparison",
    description: "The AI engine compares current data against 10 years of district closure patterns to generate your final snow day percentage."
  }
];

const benefits = [
    { title: "Parents", desc: "Plan childcare and work schedules without the morning-of stress.", icon: "🏠", color: "from-blue-400/20" },
    { title: "Students", desc: "Manage homework and projects. Adjust study schedules early.", icon: "🎒", color: "from-purple-400/20" },
    { title: "Teachers", desc: "Prep remote lessons or adjust curriculum pacing with confidence.", icon: "📚", color: "from-cyan-400/20" },
    { title: "AI Prediction", desc: "4-8 AM Commuting window matches 10+ years of local history.", icon: "🧠", color: "from-indigo-400/20" },
  ];

  const analytics = [
    { label: "Accumulation Depth", weight: 75, impact: "High", desc: "Total snowfall is the baseline. Anything over 6 inches triggers a high-probability alert." },
    { label: "Ice & Temp", weight: 90, impact: "Critical", desc: "Temps below 28°F (or freezing rain) are often more dangerous than deep snow due to traction loss." },
    { label: "Commute Timing", weight: 85, impact: "High", desc: "Snow falling between 3 AM and 7 AM is 2x more likely to cause a closure than evening snow." },
    { label: "Plough Readiness", weight: 40, impact: "Variable", desc: "Major cities clear roads faster; rural areas with dirt roads have much lower tolerance." }
  ];

  const features = [
  {
    title: "Hyper-Local Precision",
    desc: "Our model factors in elevation and coastal proximity to ensure the snow day chance is specific to your school district.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Real-Time Updates",
    desc: "Connected directly to the Open-Meteo API, providing instant recalculations as soon as the winter storm warnings drop.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Ground Temp Analysis",
    desc: "Snow only sticks if the ground is cold enough. We track sub-surface data to predict accumulation and icy road conditions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];
  
  return (
    <div>
      <div className="max-w-6xl mx-auto mt-16 md:mt-40 px-5">
        <div className="min-h-[75px] w-full py-[10px]  flex flex-col items-center justify-center">
          <div className="mb-[50px] mx-auto flex flex-col-reverse md:flex-row-reverse items-center justify-between max-w-[1320px] w-full gap-10 md:gap-0">
            {/* Image Section */}
            <div className="relative pattern-dots-md  md:w-[500px]">
              <img
                className="w-full block dark:hidden transform lg:-translate-x-20 -translate-y-10 h-full drop-shadow-2xl"
                src="/calc_white.png"
                alt="Snow Day Calculator Interface"
              />
                  <img
                className="w-full hidden dark:block transform lg:-translate-x-20 -translate-y-10 h-full drop-shadow-2xl"
                src="/calc.png"
                alt="Snow Day Calculator Interface"
              />
              <div
                className="bg-linear-to-r from-[#3b5eaf] to-[#57b0b6] dark:bg-linear-to-r dark:from-[#182e63] dark:to-[#127a82]  shadow-xl p-5 rounded-[10px] flex flex-col items-start max-w-[430px] 
                  static md:absolute md:bottom-[-55px] md:left-[-12%] lg:left-[-32%] 
                  mt-0 md:mt-0 z-10"
              >
                <p className="font-semibold text-white text-base leading-[22px] md:leading-[26px] mb-2.5">
                  Our algorithm analyzes real-time meteorological data to provide the most
                  accurate school closing predictions available.
                </p>
                <img
                  className="w-[55%] md:w-auto mt-3"
                  src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg"
                  alt="Rating Stars"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[40%] flex flex-col items-start justify-start md:mr-10 py-0 pr-[15px] pl-0 ">
              <h2 className=" dark:text-white underline underline-offset-8 text-3xl font-bold leading-[30px] mb-6 p-0">
                About Predictor
              </h2>
              <p className="text-[#6e6969] dark:text-[#9c9999] italic text-xl font-bold leading-7 md:leading-8 mb-2 p-0">
                Predicting the unpredictable with southern-state precision.
              </p>
              <p className="text-[#746f6f] dark:text-[#908b8b] text-base font-semibold leading-[22px] md:leading-[26px] mb-5 md:mb-[50px] p-0">
                Using a combination of morning commute snowfall totals, freeze factors, 
                and ice warnings, our predictor is designed specifically for regions 
                where even an inch of snow changes everything.
              </p>
              <Link
                href="/about-us"
                className="inline-block mb-10 md:mb-0 text-[#666666] dark:text-[#91c6f8] rounded-lg text-base font-semibold leading-7 border-2 border-[#666666] dark:border-[#9dcdfb] dark:bg-[#010d17] py-2 px-10 transition-colors duration-300 hover:bg-[#3b5eaf] hover:text-white hover:border-transparent cursor-pointer"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Features Grid */}
      <section id="features" className="max-w-7xl py-10  mx-auto mt-6 md:mt-30 bg-[#f3fdff] dark:bg-white/5 border md:rounded-2xl font-sans">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10 md:mb-20">
            <h1 className="text-3xl md:text-5xl text-center mb-2 font-bold dark:text-white">
              Calculator Features
            </h1>
            <p className="md:w-2/3 m-auto text-center font-semibold text-[#8c8989]">
              Built with Next.js and Open-Meteo API to bring you high-fidelity 
              weather insights within seconds.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-[#3b5eaf] inline-flex"></div>
            </div>
          </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 sm:-m-4 -mx-4 -mb-10 -mt-4">
          {features.map((f, idx) => (
            <div key={idx} className="lg:w-[350px] p-8 md:mb-0 mb-2 flex flex-col">
              {/* Added text-blue-200 for visibility in light mode */}
              <div className="pattern-dots-md">
                <div className=" bg-linear-to-r from-[#3b5eaf] to-[#57b0b6] dark:from-[#182e63] dark:to-[#127a82] transition-all rounded-xl p-6 transform md:translate-x-6 -translate-y-6 hover:translate-x-4 hover:-translate-y-4 duration-300 text-white">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white/20 mb-5 flex-shrink-0 p-2">
                    {f.icon}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl title-font font-bold mb-3">{f.title}</h2>
                    <p className="text-sm text-[#d9d9ec] font-medium leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

 


   <section className=" mt-5 md:mt-20 px-6 overflow-hidden">
      <div className="w-full :max-w-4xl mx-auto">
      <ScrollTimeline
      events={events}
      title="How It Works."
      subtitle="How we turn raw weather data into your morning forecast."
      progressIndicator={true}
      cardAlignment="alternating"
      revealAnimation="fade"
    />
   </div>
</section>



    <section className="mt-5 md:mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-10 md:gap-16 items-center">
          
          {/* Left Side: Textual Insight */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Why 2 inches isn't <br /> 
              <span className="text-blue-500 underline decoration-blue-200 underline-offset-8">always 2 inches.</span>
            </h2>
            <p className="text-[#716c6c] dark:text-[#b6b5b5] mb-8 leading-relaxed">
              Our algorithm uses a <strong>Multi-Factor Weighted Index</strong>. While accumulation gets the headlines, the "Timing of Onset" and "Road Surface Temperature" are the true predictors of school closures.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-2xl">
              <h4 className="font-bold text-blue-500 mb-2 italic">Pro Insight: The "Refreeze"</h4>
              <p className="text-sm text-blue-600/80 dark:text-blue-200">
                A 40°F afternoon followed by a 20°F night creates "Black Ice." This often results in a 2-hour delay even if the sun is shining.
              </p>
            </div>
          </div>

         {/* Stack Container */}
          <div className="flex-1 w-full py-1 px-4 flex flex-col items-center gap-5">
            {analytics.map((item, i) => {
              // Alternate rotation: 3 degrees is usually the "sweet spot" for this look
              const rotation = i % 2 === 0 ? 'rotate-2' : '-rotate-2';
              
              return (
                <div 
                  key={i} 
                  className={`
                    relative w-full max-w-md p-5 rounded-2xl border-2 border-slate-200 dark:border-0 bg-white  dark:bg-linear-to-r dark:from-[#182e63] dark:to-[#127a82] shadow-lg 
                    transition-all duration-300 transform cursor-pointer
                    hover:rotate-0 hover:-translate-y-4 hover:z-50
                    ${rotation}
                    ${i !== 0 ? 'mt-2' : ''} // This removes the gap by pulling cards up
                  `}
                  style={{ 
                    zIndex: analytics.length - i, // Ensures the first card is on top visually
                  }}
                >
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        item.impact === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.impact} Impact
                      </span>
                      <h4 className="font-bold text-slate-800 dark:text-white mt-1">{item.label}</h4>
                    </div>
                    <span className="text-2xl font-mono font-bold text-slate-400 dark:text-blue-200">{item.weight}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-blue-200 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>


      
    </div>
  );
};

export default Info2;