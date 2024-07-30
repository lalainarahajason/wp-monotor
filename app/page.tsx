import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-sm", font.className)}>Auth</h1>
        <p className="text-white text-lg">
          Wp Monitor authentication
        </p>
        <div>
          <Button variant="secondary" size="lg">Sign In</Button>
        </div>
      </div>
    </main>
  );
}
