import { Button } from "@/components/ui/button";
import { Camera, Code, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements with parallax-like animation */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse-glow" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-glow">
              <Sparkles className="w-4 h-4" />
              <span>Photography & Open Source</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100} duration={800}>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Capturing <span className="text-primary italic animate-pulse-glow inline-block">Light</span>, <br />
              Crafting <span className="text-accent underline decoration-accent/30 underline-offset-8 hover:decoration-accent transition-all duration-300">Code</span>.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={200} duration={800}>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Diffraction Works is a creative studio at the intersection of photography and high-performance open-source software development.
            </p>

          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300} duration={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 rounded-full px-8 text-base h-14 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group" 
                asChild
              >
                <Link href="#projects">
                  View Projects
                  <Code className="w-5 h-5 ml-2 transition-transform group-hover:rotate-12" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-accent/20 hover:bg-accent/10 hover:border-accent/40 text-base h-14 transition-all duration-300 hover:scale-105 group" 
                asChild
              >
                <Link href="#photography">
                  Photography Feed
                  <Camera className="w-5 h-5 ml-2 transition-transform group-hover:rotate-12" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Scroll indicator */}
          <ScrollReveal animation="fade-up" delay={500} duration={800}>
            <div className="mt-16 flex flex-col items-center gap-2 text-muted-foreground/60">
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
                <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
