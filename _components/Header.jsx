
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {

  return (
    <div className="w-full bg-[#141452] "> 
    <div className="py-6 max-w-screen-2xl flex items-center justify-between text-white px-8 bg-[#141452] dark:border-b border-[#321c78] m-auto">
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

      <div className="flex items-center gap-16 font-bold h-12">
        
        <Link href="/about-us">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/about-us">Contact Us</Link>
        <Link href="/about-us">FAQs</Link>
  
        <ThemeToggle/>
    
      </div>
    </div>
       </div>
  );
};

export default Header;
