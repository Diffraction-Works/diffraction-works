
"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Plus } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function PhotographyFeed() {
  const photos = PlaceHolderImages.filter(img => img.id.startsWith("photo-"));

  return (
    <section id="photography" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Visual Arts</h2>
          <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-6">Photography Feed</h3>
          <p className="font-body text-muted-foreground text-lg">
            Capturing the interplay of light and shadow. A curated selection of moments from our recent explorations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className="relative aspect-square group overflow-hidden bg-muted rounded-lg fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.description}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                data-ai-hint={photo.imageHint}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-center p-4">
                  <Instagram className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white text-xs font-bold uppercase tracking-widest hidden sm:block">View on Instagram</p>
                </div>
              </div>
              <Link 
                href="https://www.instagram.com/diffraction_works/" 
                target="_blank" 
                className="absolute inset-0 z-10"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 border-accent/20 hover:border-accent hover:bg-accent/10" asChild>
            <Link href="https://www.instagram.com/diffraction_works/" target="_blank">
              Follow @diffraction_works
              <Instagram className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
