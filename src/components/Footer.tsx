
import Link from "next/link";
import { Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-headline font-bold text-white text-sm">D</span>
            </div>
            <span className="font-headline font-bold text-lg tracking-tight">
              Diffraction Works
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Diffraction Works. Built with precision and passion.
          </p>

          <div className="flex items-center gap-6">
            <Link href="https://github.com/Diffraction-Works" target="_blank" className="text-muted-foreground hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/diffraction_works/" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
