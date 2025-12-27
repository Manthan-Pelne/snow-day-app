"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, BookCheckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { BorderBeam } from "@/components/lightswind/border-beam"; 
import { ThemeToggle } from "@/components/theme-toggle";

/* ---------------- Types ---------------- */
type NavItem = {
  href: string;
  label: string;
};

/* ---------------- Data ---------------- */
const navItems: NavItem[] = [
  { href: "/", label: "home" },
  { href: "/about-us", label: "about" },
  { href: "/contact-us", label: "contact" },
  { href: "/faq", label: "faq's" },
];

/* ---------------- Animations (Mobile only) ---------------- */
const menuVariants: Variants = {
  open: {
    clipPath: "circle(1200px at 90% 5%)",
    transition: { type: "spring", stiffness: 30 },
  },
  closed: {
    clipPath: "circle(20px at 90% 5%)",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
};

const listVariants: Variants = {
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  open: { y: 0, opacity: 1 },
  closed: { y: 30, opacity: 0 },
};

/* ---------------- Component ---------------- */
export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
      <div
        className="relative w-full max-w-7xl rounded-full border
        border-gray-100 dark:border-gray-900 backdrop-blur-xl
        flex items-center justify-between px-6 py-3"
      >
       

        {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <Image
              width={100}
              height={100}
              className="w-10"
              src="/mountains.png"
              alt="logo"
            />
            <h1 className="text-primary font-extrabold tracking-wide text-xl">
              SnowPredictor
            </h1>
          </Link>

        <div
        className="hidden md:flex relative w-max rounded-full border  items-center justify-between px-6 py-3"
      >
        <BorderBeam />
        {/* Desktop Navigation */}
        <nav className="flex gap-5 font-semibold">

          {navItems.map(({ href, label }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative text-sm capitalize transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>
        </div>

        {/* Theme toggle (desktop) */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-gray-800 dark:text-white cursor-pointer"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col items-center
              justify-center bg-background dark:bg-background-dark md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-9 right-9 cursor-pointer"
            >
              <X size={26} />
            </button>

            <motion.ul variants={listVariants} className="space-y-8">
              {navItems.map(({ href, label }) => {
                const active = pathname === href;

                return (
                  <motion.li key={href} variants={itemVariants}>
                    <Link
                      href={href}
                      className={clsx(
                        "text-4xl font-bold capitalize transition-colors",
                        active
                          ? "text-primary"
                          : "text-gray-800 dark:text-white"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
