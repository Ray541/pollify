import { ReactNode } from "react"
import PublicNavbar from "@/components/layout/PublicNavbar"
import { ModeToggle } from "@/components/layout/ModeToggle"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <PublicNavbar />
      {children}
      <ModeToggle className="absolute right-4 bottom-4" />
    </main>
  )
}
