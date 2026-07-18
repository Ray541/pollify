import { ReactNode } from "react"
import ProtectedSidebar from "@/components/layout/ProtectedSidebar"
import { ModeToggle } from "@/components/layout/ModeToggle"
import ProfileCard from "@/components/user/ProfileCard"

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <ProtectedSidebar />

      {/* Main Content Area */}
      <main className="flex-1 pt-14 md:py-0">
        <div className="mx-auto w-full">{children}</div>
      </main>

      {/* Right Side Content (Hidden on small screens) */}
      <aside className="hidden w-80 shrink-0 border-l border-primary/50 px-3 py-5 lg:block">
        <div className="sticky top-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold tracking-tight text-foreground">
              Profile
            </h3>
            <ModeToggle />
          </div>
          <ProfileCard />
        </div>
      </aside>
    </div>
  )
}
