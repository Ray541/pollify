"use client"

import { MoonStar, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className={className}
          />
        }
      >
        <SunMedium className="hidden dark:block" />
        <MoonStar className="block dark:hidden" />
      </TooltipTrigger>
      <TooltipContent>Toggle Theme</TooltipContent>
    </Tooltip>
  )
}
