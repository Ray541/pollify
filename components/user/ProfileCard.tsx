"use client"

// import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ProfileCard() {
  // const { user } = useAuth()

  // Use dummy data if no user is provided, or as fallback
  // const name = user?.fullName || "Sophia Davis"
  // const username = user?.username || "sophiaDavis"
  const email = "johndoe@gmail.com"
  const fullName = "John Doe"
  const username = "john_doe"
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="overflow-hidden border border-primary/50">
      <CardContent className="flex flex-col items-center justify-center gap-5">
        <CardHeader className="w-full p-0">
          <div className="flex w-full items-center justify-center border-b border-primary/30 pb-5">
            <Avatar className="size-25 border border-primary/30">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${username}`}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <div className="px-3 text-center">
          <h3 className="text-lg font-bold tracking-tight">{fullName}</h3>
          <h3 className="text-sm font-semibold tracking-tight">{email}</h3>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>

        <CardFooter className="w-full p-0">
          <div className="flex w-full items-center justify-between px-3 text-center">
            <div className="flex flex-col items-center">
              <span className="text-lg leading-tight font-bold">10</span>
              <span className="text-[10px] font-medium text-muted-foreground">
                Polls Created
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg leading-tight font-bold">51</span>
              <span className="text-[10px] font-medium text-muted-foreground">
                Polls Voted
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg leading-tight font-bold">2</span>
              <span className="text-[10px] font-medium text-muted-foreground">
                Polls Bookmarked
              </span>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
