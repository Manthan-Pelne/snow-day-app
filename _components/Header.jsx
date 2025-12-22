"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(()=>{
     setMounted(true)
  },[])

  if(!mounted) return null;

  return (
    <div className="py-6 max-w-screen-2xl flex items-center justify-between text-white px-8 bg-black dark:border-b border-[#321c78] m-auto">
      <Link href="/" className="flex items-center gap-2">
        <Image
          width={100}
          height={100}
          className="w-10"
          src="/mountains.png"
          alt="logo"
        />
        <h1 className="text-white font-extrabold tracking-wide text-xl">
          SnowPredictor
        </h1>
      </Link>

      <div className="flex items-center gap-16 font-bold">
        <Link href="/about-us">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/about-us">Contact Us</Link>
        <Link href="/about-us">FAQs</Link>

       <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <div className="group peer ring-0 bg-[#dcdcdc] rounded-full outline-none duration-300 
            after:duration-300 w-22.5 h-10 shadow-md border-2 border-[#6d6d6f] 
            peer-checked:bg-[#0c0c65] after:content-['🔆'] after:rounded-full 
            after:absolute after:bg-[black] after:h-8 after:w-8 after:top-1 
            after:left-1 after:flex after:justify-center after:items-center 
            peer-checked:after:translate-x-12 peer-checked:after:content-['🌙']">
          </div>
        </label>
      </div>
    </div>
  );
};

export default Header;
