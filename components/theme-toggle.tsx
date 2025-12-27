"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative grid place-content-center"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="
          relative overflow-hidden rounded-full
          transition-colors cursor-pointer
        "
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="absolute"
            >
              <Moon className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="absolute">
              <Sun className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
