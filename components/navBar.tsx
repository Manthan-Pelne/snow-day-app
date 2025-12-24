"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

type NavItem = {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: "/", label: "home" },
  { href: "/about-us", label: "about" },
  { href: "/contact-us", label: "contact" },
  { href: "/faq", label: "faq's" },
]

export default function Navbar({
  onLinkClick,
}: {
  onLinkClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "relative group font-semibold capitalize transition-colors",
              isActive
                ? "text-white"
                : "text-gray-200 hover:text-white"
            )}
          >
            {item.label}

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
    </div>
  )
}
