
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Code, Github, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Photography", href: "#photography", icon: Camera },
    { name: "Contact", href: "#contact", icon: Github },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-2"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 animate-pulse-glow">
            <span className="font-headline font-bold text-white text-xl">D</span>
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:block transition-colors group-hover:text-accent">
            Diffraction Works
          </span>
        </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-headline text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 link-underline"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
          <ThemeToggle variant="ghost" size="icon" className="mr-2" />
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full px-6 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25" asChild>
            <Link href="https://github.com/Diffraction-Works" target="_blank">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Link>
          </Button>
        </div>


        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] bg-background/95 backdrop-blur-lg z-40 transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 p-6",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="font-headline text-2xl font-semibold hover:text-accent transition-all duration-300 flex items-center gap-3 hover:translate-x-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <link.icon className="w-6 h-6" />
            {link.name}
          </Link>
        ))}
        <div className="flex items-center gap-6 mt-4">
          <ThemeToggle variant="outline" size="icon" className="rounded-full" />
          <Link href="https://github.com/Diffraction-Works" target="_blank" className="p-3 bg-card border rounded-full hover:text-accent transition-all hover:scale-110 hover:rotate-6">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="https://www.instagram.com/diffraction_works/" target="_blank" className="p-3 bg-card border rounded-full hover:text-accent transition-all hover:scale-110 hover:rotate-6">
            <Instagram className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </nav>
  );
}
