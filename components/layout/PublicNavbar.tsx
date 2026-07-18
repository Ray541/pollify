"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export default function PublicNavbar() {
  const pathname = usePathname()

  // Array Destructuring
  const [home, about, login] = useMemo(() => ["/", "/about", "/login"], [])

  return (
    <header className="fixed top-4 left-1/2 z-50 flex h-12 -translate-x-1/2 items-center justify-center gap-10 rounded-full border border-primary/70 bg-primary/5 px-3 backdrop-blur-xl transition-all sm:gap-15">
      <Link
        href={home}
        className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl"
      >
        Pollify
      </Link>

      <nav className="flex items-center gap-5 text-sm font-medium">
        <Link
          href={home}
          className={`font-bold transition-colors hover:text-foreground ${
            pathname === home ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Home
        </Link>
        <Link
          href={about}
          className={`font-semibold transition-colors hover:text-foreground ${
            pathname === about ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          About
        </Link>
        <Link
          href={login}
          className={`rounded-full px-4 py-2 text-primary-foreground shadow-sm transition-all hover:bg-primary/70 ${
            pathname === login ? "bg-primary" : "bg-primary/80"
          }`}
        >
          Login
        </Link>
      </nav>
    </header>
  )
}
