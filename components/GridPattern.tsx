import React from 'react';
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { MapPin } from "lucide-react";

// Define the interface for props coming from Hero
interface GridPatternProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  suggestions: any[]; // Ideally replace 'any' with your GeoResult type
  isTyping: boolean;
  onSuggestionClick: (name: string) => void;
}

export default function GridPattern({
  onChange,
  onSubmit,
  suggestions,
  isTyping,
  onSuggestionClick
}: GridPatternProps) {

  const placeholders = [
    "Enter zip... 50112",
    "Enter City... Alabama",
    "Enter zip... 442001",
    "Enter City... Wardha",
  ];

  return (
    <div className="p-5 md:p-10 group/file block rounded-lg w-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <GridPatternBox />
      </div>

      <div className="flex flex-col items-center justify-center relative z-20">
        <h2 className="font-sans font-bold text-black dark:text-white text-xl md:text-3xl mb-5">
          Search Zip or City
        </h2>
        
        <div className="w-full relative">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={onChange}
            onSubmit={onSubmit}
          />

           {/* LOADING INDICATOR (Optional) */}
          {isTyping && (
            <div className="absolute top-[121%] max-w-xl m-auto left-1/2 right-0">
               <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* SUGGESTIONS DROPDOWN */}
          {suggestions.length > 0  && (
            <div className="absolute top-full max-w-xl m-auto left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-100">
              {suggestions.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSuggestionClick(loc.name)}
                  className="w-full cursor-pointer flex items-center gap-3 p-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-bold text-neutral-800 dark:text-white leading-none">
                      {loc.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {loc.admin1}, {loc.country}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export function GridPatternBox() {
  const columns = 21;
  const rows = 5;
  return (
    <div className="flex bg-gray-50 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-px scale-105">
      {Array.from({ length: rows * columns }).map((_, index) => (
        <div
          key={index}
          className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
            index % 2 === 0
              ? "bg-gray-100 dark:bg-neutral-950"
              : "bg-gray-100 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
          }`}
        />
      ))}
    </div>
  );
}