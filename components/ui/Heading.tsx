import { SparkleParticles } from "../lightswind/sparkle-particles";

export function Heading({ title }) {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <div className="md:w-[40rem] h-24 md:h-20 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-center dark:text-white relative  mb-2 font-secondary">
          {title.name}
        </h2>

        {/* WRAPPER: We apply the mask here so it affects everything inside.
          We use -webkit-mask-image for better browser compatibility.
        */}
        <div 
          className="absolute w-full h-full"
          style={{
            WebkitMaskImage: 'radial-gradient(350px_200px_at_top,transparent_20%, white)',
            maskImage: 'radial-gradient(350px 200px at top, white, transparent)',
          }}
        >
          {/* Gradients */}
          <div className="relative">
            <div className="absolute md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#007CF0] to-transparent h-[2px] w-full md:w-3/4 blur-sm" />
            <div className="absolute md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#007CF0] to-transparent h-px w-full md:w-3/4" />
            <div className="absolute md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#007CF0] to-transparent h-[5px] w-full md:w-1/4 blur-sm" />
            <div className="absolute md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#007CF0] to-transparent h-px w-full md:w-1/4" />
          </div>

          <SparkleParticles className="w-full h-full absolute" />
        </div>

        {/* Optional: Dark background overlay if needed for contrast */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] pointer-events-none"></div>
      </div>
    </div>
  );
}