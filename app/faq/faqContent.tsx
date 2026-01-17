
"use client"

import dynamic from 'next/dynamic';
import Image from "next/image"
const Snowfall = dynamic(() => import('@/components/snowfall'));

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from 'framer-motion';




const faqs = [
  {
    question: "What is a Snow Day Calculator?",
    answer:
      "A Snow Day Calculator predicts the likelihood of school closures due to snow or severe winter weather using real-time forecasts, snowfall amounts, temperature, and historical data.",
  },
  {
    question: "Is the Snow Day Calculator free to use?",
    answer:
      "Yes, the Snow Day Calculator is completely free and does not require registration or login.",
  },
  {
    question: "How accurate is the Snow Day prediction?",
    answer:
      "The calculator provides an estimate based on weather data and past trends. While highly informative, final decisions always depend on school authorities.",
  },
  {
    question: "Which weather factors are used for prediction?",
    answer:
      "Predictions consider snowfall totals, overnight accumulation, temperature, wind chill, road conditions, and local weather alerts.",
  },
  {
    question: "Does it work for all locations?",
    answer:
      "The Snow Day Calculator works best in regions that experience winter snowfall and where reliable weather data is available.",
  },
  {
    question: "Can weather changes affect the result?",
    answer:
      "Yes. Snow day probabilities can change as forecasts update, especially within 24 hours of the school day.",
  },
  {
    question: "Is this an official school closure announcement?",
    answer:
      "No. This tool is for informational purposes only. Always check official school or district announcements for confirmation.",
  },
  {
    question: "Can I use this on mobile devices?",
    answer:
      "Yes, the Snow Day Calculator is fully responsive and works on mobile phones, tablets, and desktop devices.",
  },
  {
    question: "When should I check the Snow Day Calculator?",
    answer:
      "For best results, check the calculator the evening before and early morning of a potential snow day.",
  },
  {
    question: "Is my location or data stored?",
    answer:
      "No personal data is stored or shared. Any location input is used temporarily to generate predictions.",
  },
];

export default function FaqContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <>
          <div className="pt-20 max-w-4xl mx-auto px-4">
            <div className="absolute top-0 left-0"> <Snowfall /></div>
            <div className=" w-full relative overflow-hidden text-foreground mb-10">
                {/* Mobile Cloud */}
                <div className="mt-10">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="space-y-1">
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter">
                         Frequently
                        </h1>
                        <h2 className="text-4xl tracking-tight text-blue-400">
                          Asked Questions
                        </h2>
                      </div>
    
                     <p className="leading-relaxed mt-2 dark:text-[#d2d1d1]">
                      Find answers to common questions about how the Snow Day Calculator works,
                      how predictions are made, and how to use it effectively before winter
                      weather hits.
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

             {/* FAQ List */}
         <div className="space-y-4 relative z-10">
  {faqs.map((faq, index) => {
    const isOpen = openIndex === index;

    return (
      <div
        key={index}
        className="rounded-xl border border-border dark:border-none  bg-background/80 backdrop-blur shadow-sm transition-all hover:shadow-md overflow-hidden bg-linear-to-b from-white via-white to-[#eef6ff] dark:bg-linear-to-b dark:from-black dark:via-black dark:to-[#031b33]"
      >
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left "
        >
          <span className="text-sm md:text-base font-medium text-foreground">
            {faq.question}
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  })}
</div>
         </div>
    </>
  )
}
