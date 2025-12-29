"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <div className="relative w-full max-w-7xl  backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                  S
                </div>
                Snow Prediction
              </Link>

              <nav className="hidden md:flex gap-8 text-sm font-medium">
                <a href="/">Home</a>
                <a href="/about-us">About us</a>
                <a href="/contact-us">contact us</a>
                <a href="/faq">faq</a>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              {/* Time */}
              <div className="text-right">
                {currentTime && (
                  <p className="text-lg">
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}{" "}
                    <span className="text-xs opacity-60 uppercase">Time</span>
                  </p>
                )}
              </div>

            <div className="h-8 w-[1px] bg-white/20" />
              {/* Date */}
              <div className="text-left">
                {currentTime && (
                  <p className="text-lg ">
                    {currentTime.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    <span className="text-xs opacity-60 uppercase">
                      {currentTime.getFullYear()} Date
                    </span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5">
                <span className="text-sm">
                  Light <span className="font-bold">/Dark</span>
                </span>
                <div className="min-w-9 min-h-9">
                <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
