import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-primary/30 to-primary/10">
      <div className="text-center space-y-6 p-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Quizr
        </h1>
        <p className="text-xl text-muted-foreground">
          Fun trivia, anytime, anywhere!
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6 font-bold">
          <Link href="/quiz">Start Quiz</Link>
        </Button>
      </div>
    </div>
  );
}
