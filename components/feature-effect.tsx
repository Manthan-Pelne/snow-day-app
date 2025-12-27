
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeatureEffect() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 max-w-6xl mx-auto xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="❄️ 1. Accurate Snow Day Prediction"
        description="Uses real-time weather data (snowfall, temperature, wind, road conditions) to predict the probability of a snow day for schools and colleges."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="📍 2. Location-Based Forecasting"
        description="Automatically detects or lets users select their city, district, or school area to provide localized snow predictions, not generic weather info."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13]  xl:[grid-area:1/5/3/8] order-last"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="⏱️ 3. Hour-by-Hour Snow Timeline"
        description="Get a detailed hourly breakdown of snowfall intensity, temperature drops, wind speed, and accumulation levels. This helps predict overnight snow build-up, road safety in the early morning, and whether conditions will worsen before school hours. "
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
       title="📊 4. Snow Day Probability Score"
        description="Displays an easy-to-understand percentage score (e.g., 78% chance of snow day) with visual indicators for quick decisions."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="🔔 5. Alerts & Notifications"
        description="Sends instant alerts when snow conditions change or when the probability crosses a critical threshold (e.g., above 70%)."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 shadow-xl hover:shadow-2xl bg-neutral-50/5 ">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="transition-colors duration-300 relative p-4 ">
                  <div className="flex flex-col space-y-5">
                       <div className="w-fit rounded-lg border border-gray-600 p-2"> {icon}  </div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-muted-foreground">  {description}  </p>
                    </div>
                   
        </div>
   
      </div>
    </li>
  );
};
