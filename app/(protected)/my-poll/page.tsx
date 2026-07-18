export const metadata = {
  title: "My Polls",
  description: "View your polls",
}

export default function MyPollPage() {
  return (
    <div className="w-full">
      <header className="sticky top-14 z-40 border-b border-primary/50 bg-background/80 p-3 backdrop-blur-xl md:top-0 md:p-4 lg:p-5">
        <h1 className="text-xl font-bold text-primary">My Polls</h1>
      </header>
      {/* Page Content */}
      <div className="h-[3000px] p-4">...</div>
    </div>
  )
}
