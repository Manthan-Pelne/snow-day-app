'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react"; // Install lucide-react if you haven't
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname()

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "FAQ's", href: "/faq" },
  ];



  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
      <div className="relative w-[90%] lg:max-w-7xl m-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center p-2 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                S
              </div>
              <span className=" hidden sm:inline">Snow Prediction</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-8 text-sm font-medium">
              
              {navLinks.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "relative group font-semibold capitalize transition-colors",
              isActive
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-800 hover:text-black dark:text-[#eceaea] dark:hover:text-white"
            )}
          >
            {item.name}

            {/* underline */}
            <span
              className={clsx(
                "absolute -bottom-1 left-0 h-0.5 bg-[#72D4FF] transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        )
      })}
            </nav>
          </div>

          {/* Right Section: Time/Date (Desktop) + Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              {/* Time */}
              <div className="text-right">
                {currentTime && (
                  <p className="text-sm font-medium">
                    {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    <span className="block text-[10px] opacity-60 uppercase">Time</span>
                  </p>
                )}
              </div>
              <div className="h-6 w-[1px] bg-white/20" />
              {/* Date */}
              <div className="text-left">
                {currentTime && (
                  <p className="text-sm font-medium">
                    {currentTime.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    <span className="block text-[10px] opacity-60 uppercase">{currentTime.getFullYear()} Date</span>
                  </p>
                )}
              </div>
            </div>

            {/* Theme Toggle Container */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-1 py-1">
              <span className="hidden xs:block text-[10px] uppercase font-bold">Mode</span>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="lg:hidden p-2 bg-white/10 rounded-lg border border-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-lg font-medium border-b border-white/5 pb-2">
                {link.name}
              </a>
            ))}
            
            {/* Mobile specific Time/Date Display */}
            <div className="md:hidden flex justify-between pt-4 opacity-70">
                <div>
                   <p className="text-xs uppercase">Local Time</p>
                   <p>{currentTime?.toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-xs uppercase">Current Date</p>
                   <p>{currentTime?.toLocaleDateString()}</p>
                </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;