"use client";

import React from "react";
import { Meteors } from "@/components/ui/meteors";

export function MeteorsDemo() {
  return (
    <div>
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />

        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
            Meteors because they&apos;re cool
          </h1>

          <p className="relative z-50 mb-4 text-base text-slate-500">
            Decorative meteor animation using SSR-safe rendering.
          </p>

          <button className="relative z-50 rounded-lg border border-gray-500 px-4 py-1 text-gray-300">
            Explore
          </button>

          {/* Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
