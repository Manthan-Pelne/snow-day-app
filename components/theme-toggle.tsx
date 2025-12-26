"use client";

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // UseEffect ensures the component is only rendered on the client
  // to avoid hydration mismatch between server and client HTML.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <div className="group peer ring-0 bg-[#dcdcdc] rounded-full outline-none duration-300 
          after:duration-300 w-20 h-10 shadow-md border-2 border-[#6d6d6f] 
          peer-checked:bg-[#0c0c65] after:content-['🔆'] after:rounded-full 
          after:absolute after:bg-[black] after:h-8 after:w-8 after:top-1 
          after:left-1 after:flex after:justify-center after:items-center 
          peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']">
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;