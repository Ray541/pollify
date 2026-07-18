import Image from "next/image"
import SignUpForm from "@/components/forms/SignUpForm"

export const metadata = {
  title: "SignUp",
  description: "SignUp to your Pollify account",
}

const authCards = [
  {
    image: "/auth-card-1.png",
    alt: "Social media poll",
    position: { top: "5%", left: "5%" },
    maxWidth: "350px",
  },
  {
    image: "/auth-card-2.png",
    alt: "Wall decor poll",
    position: { top: "30%", right: "5%" },
    maxWidth: "330px",
  },
  {
    image: "/auth-card-3.png",
    alt: "Policy poll",
    position: { bottom: "5%", left: "12%" },
    maxWidth: "350px",
  },
]

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:w-1/2 lg:flex-none xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <SignUpForm />
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 overflow-hidden bg-background lg:flex lg:flex-col">
        <div className="bg-auth-sign-up absolute inset-0" />
        <div className="bg-auth-grid absolute inset-0" />

        {/* Hero Text */}
        <div className="relative px-10 pt-10 text-end">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm sm:text-5xl">
            Join the Conversation
          </h1>
          <p className="ml-auto max-w-md text-lg text-foreground">
            Create an account to start building beautiful polls and making
            decisions together in seconds.
          </p>
        </div>

        {/* Scattered Cards */}
        <div className="relative flex-1">
          {authCards.map((card, index) => (
            <div
              key={index}
              style={{
                ...card.position,
                maxWidth: card.maxWidth,
              }}
              className="absolute w-[50%] transition-all duration-100 ease-in-out hover:-translate-y-1"
            >
              <Image
                src={card.image}
                alt={card.alt}
                width={600}
                height={400}
                className="h-auto w-full rounded-2xl object-contain shadow-lg drop-shadow-2xl"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
