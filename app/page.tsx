import Image from "next/image";
import Hero from "@/components/Hero"
import WeatherDashboard from "@/components/Hero2"
import Info2 from "@/components/Info2"

export default function Home() {
  return (
   <>
   <div className="pt-20 max-w-7xl mx-auto">
   <WeatherDashboard/>
   <div className="py-20">
   <Info2/>
   </div>
   </div>
   </>
  );
}
