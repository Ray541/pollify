import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      {children}
    </div>
  )
}
