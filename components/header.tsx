import Link from "next/link"
import Image from "next/image"


import NavBar from "./navBar"
import  ThemeToggle  from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="border-b border-border bg-[#141452]  ">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
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

        <nav className="flex items-center gap-12">
            <NavBar/>
          <div className="min-w-16">
           <ThemeToggle /></div>
        </nav>
      </div>
    </header>
  )
}
