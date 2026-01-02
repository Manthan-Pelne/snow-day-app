import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { SparkleParticles } from "../lightswind/sparkle-particles";

export function Heading({ title }) {
  return (
    <div className="w-full  flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <div className="md:w-[40rem] h-32 md:h-20 relative">
        <h2 className="text-2xl md:text-3xl text-md font-bold text-center dark:text-white relative mb-2 font-secondary">
          {title.name}
        </h2>

        {/* Gradients (Blue → Green) */}
        <div className="relative">
          {/* main thin glow */}
          <div className="absolute md:inset-x-20 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-[2px] w-full md:w-3/4 blur-sm" />
          <div className="absolute md:inset-x-20 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-px w-full md:w-3/4" />

          {/* inner bright glow */}
          <div className="absolute md:inset-x-60 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-[5px] w-full md:w-1/4 blur-sm" />
          <div className="absolute md:inset-x-60 top-0 bg-linear-to-r from-transparent via-[#007CF0] to-transparent h-px w-full md:w-1/4" />
        </div>

        <SparkleParticles       
          className="w-full h-full absolute"
        />

        {/* Radial fade */}
        <div className="absolute inset-0 w-full h-full  bg-[white] dark:bg-[#141516] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
