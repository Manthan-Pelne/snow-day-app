import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-3 gap-5 px-6 pt-10 md:grid-cols-5 md:gap-12 md:px-12">

        {/* Brand */}
        <div className="col-span-3 md:col-span-3">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Snow Day Calculator
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Predict the chances of a school snow day using real-time weather
            data, snowfall forecasts, and historical patterns. Fast, free,
            and student-friendly ❄️
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-3 border-b pb-1.5 text-sm font-semibold text-foreground dark:border-neutral-500 md:text-lg">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="transition-colors hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="transition-colors hover:text-primary">
                About Snow Day Calculator
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition-colors hover:text-primary">
                FAQs
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
              <Link href="/privacy-policy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="transition-colors hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="transition-colors hover:text-primary">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 border-t border-muted-foreground/20 px-5 py-6">
        <div className="mx-auto max-w-7xl items-center justify-between md:flex">
          
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Snow Day Calculator. Weather predictions are estimates, not guarantees.
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
