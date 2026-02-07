"use client";

import Link from "next/link";
import { Github, Instagram, Heart, ArrowUp } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";


export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="font-headline font-bold text-white text-sm">D</span>
              </div>
              <span className="font-headline font-bold text-lg tracking-tight transition-colors group-hover:text-accent">
                Diffraction Works
              </span>
            </Link>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              &copy; {new Date().getFullYear()} Diffraction Works. Built with 
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> 
              and passion.
            </p>

            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com/Diffraction-Works" 
                target="_blank" 
                className="p-2 text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6 rounded-full hover:bg-card"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/diffraction_works/" 
                target="_blank" 
                className="p-2 text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 hover:rotate-6 rounded-full hover:bg-card"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <button
                onClick={scrollToTop}
                className="p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-rotate-6 rounded-full hover:bg-card"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
