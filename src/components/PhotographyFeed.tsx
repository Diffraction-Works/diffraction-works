"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Script from "next/script";

export function PhotographyFeed() {
  return (
    <section id="photography" className="py-24 bg-card">
      <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Visual Arts</h2>
          <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-6">Photography Feed</h3>
          <p className="font-body text-muted-foreground text-lg">
            Capturing the interplay of light and shadow. A curated selection of moments from our recent explorations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Instagram Embed 1 */}
          <div className="instagram-embed-container flex justify-center">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/DT4guPZkq7M/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14"
              style={{ 
                background: '#FFF', 
                border: 0, 
                borderRadius: '3px', 
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                margin: '1px', 
                maxWidth: '540px', 
                minWidth: '326px', 
                padding: 0, 
                width: '99.375%' 
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href="https://www.instagram.com/p/DT4guPZkq7M/?utm_source=ig_embed&amp;utm_campaign=loading" 
                  style={{ 
                    background: '#FFFFFF', 
                    lineHeight: 0, 
                    padding: '0 0', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    width: '100%' 
                  }} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View this post on Instagram
                </a>
              </div>
            </blockquote>
          </div>

          {/* Instagram Embed 2 */}
          <div className="instagram-embed-container flex justify-center">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/DTrbkktErTn/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14"
              style={{ 
                background: '#FFF', 
                border: 0, 
                borderRadius: '3px', 
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                margin: '1px', 
                maxWidth: '540px', 
                minWidth: '326px', 
                padding: 0, 
                width: '99.375%' 
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href="https://www.instagram.com/p/DTrbkktErTn/?utm_source=ig_embed&amp;utm_campaign=loading" 
                  style={{ 
                    background: '#FFFFFF', 
                    lineHeight: 0, 
                    padding: '0 0', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    width: '100%' 
                  }} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View this post on Instagram
                </a>
              </div>
            </blockquote>
          </div>

          {/* Instagram Embed 3 */}
          <div className="instagram-embed-container flex justify-center">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink="https://www.instagram.com/p/DTrdXPAEqRC/?utm_source=ig_embed&amp;utm_campaign=loading" 
              data-instgrm-version="14"
              style={{ 
                background: '#FFF', 
                border: 0, 
                borderRadius: '3px', 
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                margin: '1px', 
                maxWidth: '540px', 
                minWidth: '326px', 
                padding: 0, 
                width: '99.375%' 
              }}
            >
              <div style={{ padding: '16px' }}>
                <a 
                  href="https://www.instagram.com/p/DTrdXPAEqRC/?utm_source=ig_embed&amp;utm_campaign=loading" 
                  style={{ 
                    background: '#FFFFFF', 
                    lineHeight: 0, 
                    padding: '0 0', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    width: '100%' 
                  }} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View this post on Instagram
                </a>
              </div>
            </blockquote>
          </div>
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
