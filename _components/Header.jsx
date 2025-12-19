import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='py-6 max-w-screen-2xl flex items-center justify-between text-white px-8 bg-black m-auto'>
        
        <Link href="/" className='flex items-center gap-2'>
             <Image
             width={100}
             height={100}
             className='w-10'
             src="/mountains.png"
             alt="logo"
             />
             <h1 className='text-white font-extrabold tracking-wide text-xl'>SnowPredictor</h1>
        </Link>

        <div className='flex items-center gap-16 font-bold'>
            <Link href="/about-us">Home</Link>
            <Link href="/about-us">About Us</Link>
            <Link href="/about-us">Contact Us</Link>
            <Link href="/about-us">FAQs</Link>
        </div>

    </div>
  )
}

export default Header