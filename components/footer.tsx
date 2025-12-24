import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-background to-muted/30 pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-5 px-6 md:grid-cols-5 md:gap-12 md:px-12">
        
        {/* Brand */}
        <div className="col-span-3 md:col-span-3">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            MyApp
          </Link>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A modern platform built with Next.js, shadcn UI, and Tailwind CSS.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-3 border-b pb-1.5 text-sm font-semibold text-foreground dark:border-neutral-500 md:text-lg">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-3 border-b pb-1.5 text-sm font-semibold text-foreground dark:border-neutral-500 md:text-lg">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 border-t border-muted-foreground/20 px-5 py-6">
        <div className="mx-auto md:flex max-w-7xl items-center justify-between">
          
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>

          <div className="mt-5 flex justify-center gap-4 md:mt-0">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                aria-label={`social-${i}`}
                className="rounded-full border border-border p-2 transition-all hover:border-primary hover:bg-primary/10"
              >
                <Icon className="h-4 w-4 text-foreground" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
