import { Github, Instagram, Mail, ExternalLink, ArrowRight, Sparkles } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";

export function ContactSection() {
  const socialLinks = [
    { name: "GitHub", handle: "@Diffraction-Works", icon: Github, href: "https://github.com/Diffraction-Works", color: "hover:text-white" },
    { name: "Instagram", handle: "@diffraction_works", icon: Instagram, href: "https://www.instagram.com/diffraction_works/", color: "hover:text-accent" },
  ];


  return (
    <section id="contact" className="py-24 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-left">

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Let's Connect</span>
              </div>
              <h2 className="font-headline text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
              <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-8">Let's work together.</h3>
              <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
                Available for commercial photography projects and custom software development. Whether you have a specific vision or just want to chat, we'd love to hear from you.
              </p>

              
              <div className="space-y-6">
                <div 
                  className="flex items-center gap-4 group p-4 rounded-xl bg-card border border-border/50 opacity-60 cursor-not-allowed transition-all hover:border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Direct Email</p>
                    <p className="text-lg font-headline font-medium">(coming soon)</p>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-right" delay={200}>

            <div className="bg-card/50 border border-border/50 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-accent/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Github className="w-32 h-32 rotate-12" />
              </div>
              
              <h4 className="font-headline text-xl font-bold mb-8">Social Connections</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {socialLinks.map((social, index) => (
                  <Link 
                    key={social.name} 
                    href={social.href} 
                    target="_blank"
                    className={`flex items-center gap-3 text-muted-foreground transition-all duration-300 group/item ${social.color} hover:translate-x-1`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 border border-border group-hover/item:border-current rounded-lg transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-3">
                      <social.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{social.name}</p>
                      <p className="text-sm opacity-60 flex items-center gap-1">
                        {social.handle} <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-6">
                  Looking for our tech stack or development philosophy?
                </p>
                <Button variant="link" className="p-0 text-accent font-bold uppercase tracking-widest h-auto group" asChild>
                  <Link href="https://github.com/Diffraction-Works" target="_blank" className="flex items-center gap-2">
                    Check out our Github 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
