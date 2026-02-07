
import { Button } from "@/components/ui/button";
import { Camera, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">

            Capturing <span className="text-primary italic">Light</span>, <br />
            Crafting <span className="text-accent underline decoration-accent/30 underline-offset-8">Code</span>.
          </h1>
          
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Diffraction Works is a creative studio at the intersection of professional photography and high-performance open-source software development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 text-base h-14" asChild>
              <Link href="#projects">
                View Projects
                <Code className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-accent/20 hover:bg-accent/10 hover:border-accent/40 text-base h-14" asChild>
              <Link href="#photography">
                Photography Feed
                <Camera className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
