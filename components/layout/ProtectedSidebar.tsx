"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// import { useAuth } from "@/context/AuthContext"
import {
  LayoutDashboard,
  PlusCircle,
  List,
  CheckCircle2,
  Bookmark,
  LogOut,
  AlignLeft,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { ModeToggle } from "@/components/layout/ModeToggle"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Poll", href: "/create-poll", icon: PlusCircle },
  { name: "My Polls", href: "/my-poll", icon: List },
  { name: "Voted Polls", href: "/voted-poll", icon: CheckCircle2 },
  { name: "Bookmarked", href: "/bookmarked", icon: Bookmark },
]

export default function ProtectedSidebar() {
  const pathname = usePathname()
  // const { logout } = useAuth()

  return (
    <>
      {/* Mobile Top Header (< md) */}
      <header className="fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur-xl md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="text-2xl font-bold">P</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Pollify</span>
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <AlignLeft />
                </Button>
              }
            />
            <SheetContent
              side="left"
              className="flex w-70 flex-col justify-between p-5"
            >
              <div className="flex flex-col gap-8">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-2xl font-bold">P</span>
                  </div>
                  <span className="text-xl font-semibold tracking-tight">
                    Pollify
                  </span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-start rounded-xl p-3 transition-all",
                          isActive
                            ? "bg-primary/10 font-semibold text-primary"
                            : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "size-5",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="ml-3 text-base">{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
              {/* Bottom Actions (Logout) */}
              <div className="flex flex-col gap-2">
                <Link
                  href={"/login"}
                  className="group flex w-full items-center justify-start rounded-xl p-3 text-destructive transition-all hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="size-5 shrink-0" />
                  <span className="ml-3 text-base font-medium">Log out</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Tablet & Desktop Sidebar (>= md) */}
      <aside className="sticky top-0 hidden h-screen flex-col justify-between border-r border-primary/50 px-3 py-5 md:flex md:w-20 lg:w-64 lg:px-3">
        <div className="flex flex-col gap-8">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-3 lg:justify-start lg:px-4"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="text-xl font-bold">P</span>
            </div>
            <span className="hidden text-xl font-bold tracking-tight lg:block">
              Pollify
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-center rounded-xl p-3 transition-all lg:justify-start",
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={item.name}
                >
                  <item.icon
                    className={cn(
                      "size-5 transition-transform group-hover:scale-110",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="ml-3 hidden text-base lg:block">
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="hidden md:block lg:hidden">
            <ModeToggle />
          </div>
          <Link
            href={"/login"}
            className="group flex w-full items-center justify-center rounded-xl p-3 text-destructive transition-colors hover:bg-destructive/10 lg:justify-start"
            title="Log out"
          >
            <LogOut className="size-5 transition-transform group-hover:scale-110" />
            <span className="ml-3 hidden text-base font-medium lg:block">
              Log out
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}
