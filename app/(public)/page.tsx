import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
  UserCircle,
  PlusCircle,
  LayoutGrid,
  Filter,
  CheckSquare,
  Bookmark,
  Lock,
  History,
  Trash2,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "Home",
  description: "Create, share, and vote on polls instantly.",
}

const features = [
  {
    title: "Secure Authentication",
    description:
      "Robust login and signup functionality using JWT to keep your data safe.",
    icon: <UserCircle className="size-6 text-primary" />,
  },
  {
    title: "Create Any Poll",
    description:
      "Easily build single-choice, yes/no, rating, or image-based polls in seconds.",
    icon: <PlusCircle className="size-6 text-primary" />,
  },
  {
    title: "Discover Polls",
    description:
      "Browse a clean, minimalistic feed of all available public polls.",
    icon: <LayoutGrid className="size-6 text-primary" />,
  },
  {
    title: "Advanced Filtering",
    description:
      "Find exactly what you're looking for by filtering polls based on their type.",
    icon: <Filter className="size-6 text-primary" />,
  },
  {
    title: "Vote & See Results",
    description:
      "Cast your vote instantly and view real-time results and analytics.",
    icon: <CheckSquare className="size-6 text-primary" />,
  },
  {
    title: "Bookmark Favorites",
    description: "Save the polls that matter to you for quick access later.",
    icon: <Bookmark className="size-6 text-primary" />,
  },
  {
    title: "Track Your Votes",
    description:
      "View a complete history of every poll you've participated in.",
    icon: <History className="size-6 text-primary" />,
  },
  {
    title: "Close Polls",
    description:
      "Admin functionality to finalize results and close finished polls.",
    icon: <Lock className="size-6 text-primary" />,
  },
  {
    title: "Manage Content",
    description:
      "Full admin controls to delete inappropriate or outdated polls.",
    icon: <Trash2 className="size-6 text-primary" />,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-5 overflow-hidden text-center sm:px-6 lg:px-8">
        <div className="absolute -z-10 h-96 w-100 rounded-full bg-primary/20 blur-[80px]" />

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:text-6xl md:text-6xl lg:text-7xl">
          Make decisions{" "}
          <span className="text-primary uppercase">together.</span> Instantly.
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          The minimalist platform to create, share, and vote on polls. Engage
          your audience and get real-time insights without the clutter.
        </p>

        <Link
          href="/sign-up"
          className={buttonVariants({
            variant: "default",
            className: "flex items-center justify-center gap-x-2",
          })}
        >
          Get Started <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A carefully curated set of features designed for a seamless polling
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl border border-primary/30 bg-card p-5 transition-all duration-200 ease-out hover:-translate-y-2 hover:border-primary/70"
            >
              <div className="mb-3 flex items-center justify-start gap-3">
                <div className="inline-flex rounded-xl border border-primary/50 p-3 transition-colors group-hover:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary md:text-2xl">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-3 rounded-3xl bg-primary/10 px-6 py-16 text-center ring-1 ring-primary/30 ring-inset sm:space-y-5 sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to start polling?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Join Pollify today and start gathering insights in minutes. It's
            fast, secure, and completely free to get started.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "default",
              })}
            >
              Create Your First Poll <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
