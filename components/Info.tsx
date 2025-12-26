import React from 'react';
// Ensure pattern.css has a corresponding declaration file if your linter complains
import "pattern.css"; 

const Info: React.FC = () => {

const steps = [
    { 
      name: "Live Ingest", 
      detail: "We pull real-time data from NOAA and local weather stations.",
      icon: "🛰️" 
    },
    { 
      name: "Timing Check", 
      detail: "Snow between 4:00 AM and 8:00 AM is weighted 3x more heavily.",
      icon: "⏰"
    },
    { 
      name: "Road Logic", 
      detail: "We factor in your city's snow-clearing budget and historical tolerance.",
      icon: "🚜"
    },
    { 
      name: "Final Odds", 
      detail: "Our AI compares current data against 10 years of district closure patterns.",
      icon: "❄️"
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
  
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-30">
        <div className="min-h-[75px] w-full py-[10px]  flex flex-col items-center justify-center">
          <div className="mb-[50px] mx-auto flex flex-col-reverse md:flex-row-reverse items-center justify-between max-w-[1320px] w-full gap-10 md:gap-0">
            {/* Image Section */}
            <div className="relative pattern-dots-md w-full md:w-1/2">
              <img
                className="w-full transform -translate-x-6 translate-y-6 h-auto rounded-[10px] drop-shadow-2xl"
                src="/calc.png"
                alt="Snow Day Calculator Interface"
              />
              <div
                className="bg-[#141452] p-5 rounded-[10px] flex flex-col items-start max-w-[430px] 
                  static md:absolute md:bottom-[-55px] md:left-[-12%] 
                  mt-0 md:mt-0 z-10"
              >
                <p className="text-white text-base leading-[22px] md:leading-[26px] mb-2.5">
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
            <div className="w-full md:w-[40%] flex flex-col items-start justify-start md:mr-10 py-0 pr-[15px] pl-0 mt-[100px] md:mt-0">
              <h2 className="text-[#47478a] underline underline-offset-8 text-3xl font-extrabold leading-[30px] mb-6 p-0">
                About Calculator
              </h2>
              <p className="text-[#6e6969] italic text-xl font-bold leading-7 md:leading-8 mb-2 p-0">
                Predicting the unpredictable with southern-state precision.
              </p>
              <p className="text-[#746f6f] text-base font-semibold leading-[22px] md:leading-[26px] mb-[50px] p-0">
                Using a combination of morning commute snowfall totals, freeze factors, 
                and ice warnings, our predictor is designed specifically for regions 
                where even an inch of snow changes everything.
              </p>
              <a
                href="#features"
                className="inline-block text-[#666666] rounded-lg text-base font-semibold leading-7 border-2 border-[#666666] py-2 px-10 transition-colors duration-300 hover:bg-[#141452] hover:text-white hover:border-transparent cursor-pointer"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto mt-30 text-gray-200 bg-[#0a0a39] rounded-2xl font-sans">
        <div className="max-w-6xl mx-auto px-5 py-24 ">
          <div className="text-center mb-20">
            <h1 className="text-5xl text-center mb-2 font-extrabold text-white">
              Calculator Features
            </h1>
            <p className="w-2/3 m-auto text-center font-semibold text-[#8c8989]">
              Built with Next.js and Open-Meteo API to bring you high-fidelity 
              weather insights within seconds.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-[#3d3dfe] inline-flex"></div>
            </div>
          </div>

          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {/* Feature Card Item (Repeated for each feature) */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col">
                <div className="pattern-dots-md text-gray-100">
                  <div className="bg-[#141452] transition-all rounded p-4 transform translate-x-6 -translate-y-6 hover:bg-[#141470] hover:translate-x-4 hover:-translate-y-4 duration-300">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0 p-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl title-font font-medium mb-3">
                        {item === 1 ? "Highly Accurate" : item === 2 ? "Real-time Data" : "Localized Info"}
                      </h2>
                      <p className="text-sm text-[#b3b3d7] font-semibold">
                        Our model adjusts for ground temperature and local geography to ensure 
                        the snow day chance is relevant to your specific school district.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* benefits section */}
    <section className="relative mt-30 py-24 border-2 bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      {/* Decorative Snowflakes */}
      <div className="absolute top-10 left-10 text-blue-200/50 text-6xl animate-pulse">❄</div>
      <div className="absolute bottom-10 right-10 text-blue-200/50 text-6xl animate-bounce">❄</div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Beyond the Day Off</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Empowering everyone to plan ahead for winter's unpredictability.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className={`group relative p-8 rounded-3xl border-t-10 border-blue-500/30 bg-white backdrop-blur-md  shadow-lg hover:shadow-2xl hover:border-none transition-all duration-300 hover:-translate-y-2`}>
              <div className={`absolute inset-0 bg-linear-to-tr from-blue-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-400/10 rounded-2xl shadow-inner flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{b.title}</h3>
                <p className="text-[#807070] text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


     {/* calculation algorithm steps */}
   <section className="py-20 mt-30 bg-[#0B1120] text-white px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl pb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-100">
            The Math Behind the Magic
          </h2>
          <p className="text-slate-200 text-lg mt-2">How we turn raw weather data into your morning forecast.</p>
        </div>

        <div className="relative">
          {/* Vertical Line (The Path) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-[#006eff] to-transparent transform md:-translate-x-1/2 hidden sm:block shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal w-full group ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[45%] bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl hover:border-blue-400/50 transition-all duration-300 shadow-xl group-hover:shadow-blue-900/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">Step 0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.detail}</p>
                </div>

                {/* The Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 transform -translate-x-1/2 border-4 border-slate-900 z-10 shadow-[0_0_10px_#22d3ee] group-hover:scale-150 transition-transform hidden sm:block" />

                {/* Spacer for Desktop Grid */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>


    <section className=" mt-30 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 items-center">
          
          {/* Left Side: Textual Insight */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Why 2 inches isn't <br /> 
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">always 2 inches.</span>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our algorithm uses a <strong>Multi-Factor Weighted Index</strong>. While accumulation gets the headlines, the "Timing of Onset" and "Road Surface Temperature" are the true predictors of school closures.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
              <h4 className="font-bold text-blue-900 mb-2 italic">Pro Insight: The "Refreeze"</h4>
              <p className="text-sm text-blue-800/80">
                A 40°F afternoon followed by a 20°F night creates "Black Ice." This often results in a 2-hour delay even if the sun is shining.
              </p>
            </div>
          </div>

         {/* Stack Container */}
          <div className="flex-1 w-full py-12 px-4 flex flex-col items-center">
            {analytics.map((item, i) => {
              // Alternate rotation: 3 degrees is usually the "sweet spot" for this look
              const rotation = i % 2 === 0 ? 'rotate-2' : '-rotate-2';
              
              return (
                <div 
                  key={i} 
                  className={`
                    relative w-full max-w-md p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-lg 
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
                      <h4 className="font-bold text-slate-800 mt-1">{item.label}</h4>
                    </div>
                    <span className="text-2xl font-mono font-bold text-slate-400">{item.weight}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
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

export default Info;