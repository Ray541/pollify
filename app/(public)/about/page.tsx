import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Code2, Zap, ShieldCheck, ArrowRight, Users } from "lucide-react"

export const metadata = {
  title: "About",
  description:
    "Learn more about Pollify, a modern polling platform and full-stack portfolio project.",
}

const values = [
  {
    title: "Simplicity First",
    description:
      "Tools should get out of your way. Pollify is designed with a minimalist aesthetic using Tailwind CSS and Radix primitives for a frictionless experience.",
    icon: <Zap className="size-6 text-primary" />,
  },
  {
    title: "Community Driven",
    description:
      "Decisions are better when made together. I built robust, scalable backend architecture with Next.js to handle seamless group interactions.",
    icon: <Users className="size-6 text-primary" />,
  },
  {
    title: "Secure by Design",
    description:
      "Your data is protected. I implemented secure, stateless authentication using JSON Web Tokens (JWT) to ensure voting integrity.",
    icon: <ShieldCheck className="size-6 text-primary" />,
  },
  {
    title: "End-to-End Type Safety",
    description:
      "Built for reliability. I leveraged TypeScript and Zod across the entire stack to validate inputs and provide a rock-solid foundation.",
    icon: <Code2 className="size-6 text-primary" />,
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-24 text-center sm:px-6 lg:px-8">
        <div className="absolute -z-10 h-96 w-100 rounded-full bg-primary/20 blur-[95px]" />

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Tools built for{" "}
          <span className="text-primary uppercase">clarity.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Pollify is a full-stack platform born out of a simple frustration:
          gathering opinions in group chats was chaotic. I built this project to
          solve that problem while showcasing my skills in modern web
          development.
        </p>
      </section>

      {/* Story Section */}
      <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Story Behind Pollify
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            What started as a mission to democratize decision-making evolved
            into a comprehensive portfolio project. My goal was to provide a
            clean, unbiased infrastructure to get the answers you need—while
            building a production-ready application from the ground up to
            demonstrate my dedication as a full-stack developer.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Product & Engineering Values
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl border border-primary/30 bg-card p-5 transition-all duration-200 ease-out hover:-translate-y-2 hover:border-primary/70"
            >
              <div className="mb-3 flex items-center justify-start gap-3">
                <div className="inline-flex rounded-xl border border-primary/20 bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary md:text-2xl">
                  {value.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-3 rounded-3xl bg-primary/10 px-6 py-16 text-center ring-1 ring-primary/30 ring-inset sm:space-y-5 sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Experience the platform.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Feel free to create an account and test out the polling features, or
            dive into the source code to see how it was built.
          </p>
          <div className="flex items-center justify-center gap-x-6 pt-4">
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "flex items-center justify-center gap-x-2 rounded-full px-8 shadow-md",
              })}
            >
              Try the App <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
