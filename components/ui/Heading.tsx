import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function Heading({ title }) {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <div className="md:w-[40rem] h-20 relative">
        <h2 className="text-2xl md:text-3xl text-md font-bold text-center dark:text-white relative z-10 mb-2 font-secondary">
          {title.name}
        </h2>

        {/* Gradients (Blue → Green) */}
        <div className="relative">
          {/* main thin glow */}
          <div className="absolute md:inset-x-20 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-[2px] w-full md:w-3/4 blur-sm" />
          <div className="absolute md:inset-x-20 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-px w-full md:w-3/4" />

          {/* inner bright glow */}
          <div className="absolute md:inset-x-60 top-0 bg-linear-to-r from-transparent via-[#00DFD8] to-transparent h-[5px] w-full md:w-1/4 blur-sm" />
          <div className="absolute md:inset-x-60 top-0 bg-linear-to-r from-transparent via-[#00DFD8] to-transparent h-px w-full md:w-1/4" />
        </div>

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full absolute"
          particleColor="#FFFFFF"
        />

        {/* Radial fade */}
        <div className="absolute inset-0 w-full h-full bg-transparent dark:bg-[#141516] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
